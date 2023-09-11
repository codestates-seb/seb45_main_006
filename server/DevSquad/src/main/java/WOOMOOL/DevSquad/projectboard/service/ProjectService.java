package WOOMOOL.DevSquad.projectboard.service;

import WOOMOOL.DevSquad.exception.BusinessLogicException;
import WOOMOOL.DevSquad.exception.ExceptionCode;
import WOOMOOL.DevSquad.member.entity.MemberProfile;
import WOOMOOL.DevSquad.member.service.MemberService;
import WOOMOOL.DevSquad.projectboard.entity.Project;
import WOOMOOL.DevSquad.projectboard.repository.ProjectRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Timer;
import java.util.TimerTask;

@Service
@Transactional
@EnableScheduling
public class ProjectService {
    private final ProjectRepository projectRepository;
    private final MemberService memberService;

    public ProjectService(ProjectRepository projectRepository, MemberService memberService) {
        this.projectRepository = projectRepository;
        this.memberService = memberService;
    }

    public Project createProject(Project project) {
        project.setMemberProfile(memberService.findMemberFromToken().getMemberProfile());

        return projectRepository.save(project);
    }

    public Project getProject(Long boardId) {
        Project project = findVerifiedProject(boardId);

        project.setViewCount(project.getViewCount() + 1);

        return project;
    }

    // 프로젝트 리스트 조회
    @Transactional(readOnly = true)
    public List<Project> getProjects(Pageable pageable) {
        Page<Project> projectPage = projectRepository.findByProjectStatus(pageable);
        return projectPage.getContent();
    }

    // 특정 멤버가 작성한 프로젝트 리스트 조회
    public List<Project> getProjectsForMember(Long memberProfileId) {
        List<Project> projects = projectRepository.findByProjectStatusAndMemberProfile(memberProfileId);

        return projects;
    }

    // 프로젝트 수정
    public Project updateProject(Project project) {

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

        findProject.setModifiedAt(LocalDateTime.now());

        return findProject;
    }

    // 모집 마감 : 상태가 마감으로 바뀌고, 일정 시간 지나면 삭제( 목록에서 안 보이게 됨)
    public void closeProject(Project project) {
        Project findProject = checkLoginMemberHasAuth(project);

        findProject.setProjectStatus(Project.ProjectStatus.PROJECT_CLOSED);

        Timer timer = new Timer();
        long delayInMillis = 60000;    // 일단 1분

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
}

