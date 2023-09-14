package WOOMOOL.DevSquad.projectboard.service;

import WOOMOOL.DevSquad.block.entity.Block;
import WOOMOOL.DevSquad.exception.BusinessLogicException;
import WOOMOOL.DevSquad.exception.ExceptionCode;
import WOOMOOL.DevSquad.level.service.LevelService;
import WOOMOOL.DevSquad.member.entity.MemberProfile;
import WOOMOOL.DevSquad.member.service.MemberService;
import WOOMOOL.DevSquad.projectboard.entity.Project;
import WOOMOOL.DevSquad.projectboard.repository.ProjectRepository;
import WOOMOOL.DevSquad.stacktag.service.StackTagService;
import org.springframework.data.domain.*;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
@EnableScheduling
public class ProjectService {
    private final ProjectRepository projectRepository;
    private final MemberService memberService;
    private final StackTagService stackTagService;
    private final LevelService levelService;
    private final EntityManager entityManager;

    public ProjectService(ProjectRepository projectRepository, MemberService memberService, StackTagService stackTagService, LevelService levelService, EntityManager entityManager) {
        this.projectRepository = projectRepository;
        this.memberService = memberService;
        this.stackTagService = stackTagService;
        this.levelService = levelService;
        this.entityManager = entityManager;
    }

    public Project createProject(Project project, Set<String> stackTag) {
        project.setMemberProfile(memberService.findMemberFromToken().getMemberProfile());

        project.setStackTags(stackTagService.createBoardStackTag(stackTag));

        levelService.getExpFromActivity(memberService.findMemberFromToken().getMemberProfile());

        return projectRepository.save(project);
    }

    public Project getProject(Long boardId) {
        Project project = findVerifiedProject(boardId);

        project.setViewCount(project.getViewCount() + 1);

        return project;
    }

    // 프로젝트 리스트 조회 ( 스택, 타이틀, 모집 상태 필터링)
    @Transactional(readOnly = true)
    public Page<Project> getProjects(int page, int size, String title, List<String> stacks, String status) {
        StringBuilder jpql = new StringBuilder("SELECT p FROM Project p WHERE 1 = 1 ");

        if (title != null) {
            jpql.append("AND LOWER(p.title) LIKE :title ");
        }

        if (stacks != null && !stacks.isEmpty()) {
            jpql.append("AND p IN (SELECT DISTINCT p FROM Project p JOIN p.stackTags st " +
                    "WHERE st.tagName IN :tagNames " +
                    "GROUP BY p HAVING COUNT(st) = :tagCount) ");
        }

        if (status != null && status.equals("posted")) {
            jpql.append("AND p.projectStatus = 'PROJECT_POSTED' ");
        }

        jpql.append("AND p.projectStatus != 'PROJECT_DELETED' ORDER BY p.createdAt DESC");

        TypedQuery<Project> query = entityManager.createQuery(jpql.toString(), Project.class);

        if (title != null) {
            query.setParameter("title", "%" + title.toLowerCase() + "%");
        }

        if (stacks != null && !stacks.isEmpty()) {
            query.setParameter("tagNames", stacks);
            query.setParameter("tagCount", stacks.stream().count());
        }

        List<Project> projectList = query.getResultList();
        projectList = removeBlockUserBoard(projectList);

        List<Project> paging = projectList.subList(page * size, Math.min(page * size + size, projectList.size()));
        Page<Project> response = new PageImpl<>(paging, PageRequest.of(page, size), projectList.size());

        return response;
    }

    //프로젝트 페이징
    public Page<Project> getProjectBoardList(Long memberId,int page){

        Page<Project> projectPage = projectRepository.findByProjectStatusAndMemberProfile(memberId, PageRequest.of(page,4, Sort.by("createdAt")));

        return projectPage;
    }

    // 프로젝트 수정
    public Project updateProject(Project project, Set<String> stackTag) {

        // 작성자, 로그인 멤버 일치 여부 확인
        Project findProject = checkLoginMemberHasAuth(project);

        Optional.ofNullable(project.getTitle())
                .ifPresent(title -> findProject.setTitle(title));
        Optional.ofNullable(project.getContent())
                .ifPresent(content -> findProject.setContent(content));
        Optional.ofNullable(project.getStartDate())
                .ifPresent(startDate -> findProject.setStartDate(startDate));
        Optional.ofNullable(project.getDeadline())
                .ifPresent(deadline -> findProject.setDeadline(deadline));
        Optional.ofNullable(project.getRecruitNum())
                .ifPresent(recruitNum -> findProject.setRecruitNum(recruitNum));

        findProject.setStackTags(stackTagService.createBoardStackTag(stackTag));
        findProject.setModifiedAt(LocalDateTime.now());

        return findProject;
    }

    // 모집 마감 : 상태가 마감으로 바뀌고, 일정 시간 지나면 삭제( 목록에서 안 보이게 됨)
    public void closeProject(Project project) {
        Project findProject = checkLoginMemberHasAuth(project);

        findProject.setProjectStatus(Project.ProjectStatus.PROJECT_CLOSED);

        Timer timer = new Timer();
        long delayInMillis = 6 * 3600000;    // 6시간

        timer.schedule(new TimerTask() {
            @Override
            public void run() {
                findProject.setProjectStatus(Project.ProjectStatus.PROJECT_DELETED);
                projectRepository.save(findProject);
            }
        }, delayInMillis);
    }


    public void deleteProject(Long boardId) {
        Project project = findVerifiedProject(boardId);

        // 작성자, 로그인 멤버 일치 여부 확인
        checkLoginMemberHasAuth(project);

        project.setProjectStatus(Project.ProjectStatus.PROJECT_DELETED);
    }

    private Project findVerifiedProject(Long boardId) {
        Optional<Project> optionalProject = projectRepository.findById(boardId);
        if (optionalProject.isPresent() && optionalProject.get().getProjectStatus() == Project.ProjectStatus.PROJECT_POSTED)
            return optionalProject.get();
        else throw new BusinessLogicException(ExceptionCode.PROJECT_NOT_FOUND);
    }


    // 작성자, 로그인 멤버 일치 여부 확인
    public Project checkLoginMemberHasAuth(Project project) {
        Project findProject = findVerifiedProject(project.getBoardId());
        MemberProfile loginMember = memberService.findMemberFromToken().getMemberProfile();

        if (findProject.getMemberProfile() != loginMember) {
            throw new BusinessLogicException(ExceptionCode.NO_AUTHORIZATION);
        }

        return findProject;
    }

    public List<Project> removeBlockUserBoard(List<Project> projectList) {
        if(SecurityContextHolder.getContext().getAuthentication().getName().equals("anonymousUser"))
            return projectList;
        List<Block> blockList = memberService.findMemberFromToken().getMemberProfile().getBlockList();
        List<Project> result = projectList.stream()
                .filter(proejct -> !blockList.stream().anyMatch(block -> block.getBlockMemberId()== proejct.getMemberProfile().getMemberProfileId()))
                .collect(Collectors.toList());
        return result;
    }
}

