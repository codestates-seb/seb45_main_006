package WOOMOOL.DevSquad.studyboard.service;

import WOOMOOL.DevSquad.block.entity.Block;
import WOOMOOL.DevSquad.exception.BusinessLogicException;
import WOOMOOL.DevSquad.exception.ExceptionCode;
import WOOMOOL.DevSquad.level.service.LevelService;
import WOOMOOL.DevSquad.member.entity.MemberProfile;
import WOOMOOL.DevSquad.member.service.MemberService;
import WOOMOOL.DevSquad.projectboard.entity.Project;
import WOOMOOL.DevSquad.stacktag.service.StackTagService;
import WOOMOOL.DevSquad.studyboard.entity.Study;
import WOOMOOL.DevSquad.studyboard.repository.StudyRepository;
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
public class StudyService {
    private final StudyRepository studyRepository;
    private final MemberService memberService;
    private final StackTagService stackTagService;
    private final LevelService levelService;
    private final EntityManager entityManager;

    public StudyService(StudyRepository studyRepository, MemberService memberService, StackTagService stackTagService, LevelService levelService, EntityManager entityManager) {
        this.studyRepository = studyRepository;
        this.memberService = memberService;
        this.stackTagService = stackTagService;
        this.levelService = levelService;
        this.entityManager = entityManager;
    }

    public Study createStudy(Study study, Set<String> stackTag) {
        study.setMemberProfile(memberService.findMemberFromToken().getMemberProfile());

        study.setStackTags(stackTagService.createBoardStackTag(stackTag));

        levelService.getExpFromActivity(memberService.findMemberFromToken().getMemberProfile());

        return studyRepository.save(study);
    }

    public Study getStudy(Long boardId) {
        Study study = findVerifiedStudy(boardId);

        study.setViewCount(study.getViewCount() + 1);

        return study;
    }

    // 스터디 리스트 조회 ( 스택, 타이틀, 모집 상태 필터링)
    @Transactional(readOnly = true)
    public Page<Study> getStudies(int page, int size, String title, List<String> stacks, String status) {
        StringBuilder jpql = new StringBuilder("SELECT s FROM Study s WHERE 1 = 1 ");

        if (title != null) {
            jpql.append("AND LOWER(s.title) LIKE :title ");
        }

        if (stacks != null && !stacks.isEmpty()) {
            jpql.append("AND s IN (SELECT DISTINCT s FROM Study s JOIN s.stackTags st " +
                    "WHERE st.tagName IN :tagNames " +
                    "GROUP BY s HAVING COUNT(st) = :tagCount) ");
        }

        if (status != null && status.equals("posted")) {
            jpql.append("AND s.studyStatus = 'STUDY_POSTED' ");
        }

        jpql.append("AND s.studyStatus != 'STUDY_DELETED' ORDER BY s.createdAt DESC");

        TypedQuery<Study> query = entityManager.createQuery(jpql.toString(), Study.class);

        if (title != null) {
            query.setParameter("title", "%" + title.toLowerCase() + "%");
        }

        if (stacks != null && !stacks.isEmpty()) {
            query.setParameter("tagNames", stacks);
            query.setParameter("tagCount", stacks.stream().count());
        }

        List<Study> studyList = query.getResultList();
        studyList = removeBlockUserBoard(studyList);

        List<Study> paging = studyList.subList(page * size, Math.min(page * size + size, studyList.size()));
        Page<Study> response = new PageImpl<>(paging, PageRequest.of(page, size), studyList.size());

        return response;
    }

    //스터디 페이징
    public Page<Study> getStudyBoardList(Long memberId, int page){

        Page<Study> studyPage = studyRepository.findByStudyStatusAndMemberProfile(memberId, PageRequest.of(page,4, Sort.by("createdAt")));

        return studyPage;

    }

    // 스터디 수정
    public Study updateStudy(Study study, Set<String> stackTag) {

        // 작성자, 로그인 멤버 일치 여부 확인
        Study findStudy = checkLoginMemberHasAuth(study);

        Optional.ofNullable(study.getTitle())
                .ifPresent(title -> findStudy.setTitle(title));
        Optional.ofNullable(study.getContent())
                .ifPresent(content -> findStudy.setContent(content));
        Optional.ofNullable(study.getRecruitNum())
                .ifPresent(recruitNum -> findStudy.setRecruitNum(recruitNum));

        findStudy.setStackTags(stackTagService.createBoardStackTag(stackTag));
        findStudy.setModifiedAt(LocalDateTime.now());

        return findStudy;
    }

    // 모집 마감 : 상태가 마감으로 바뀌고, 일정 시간 지나면 삭제( 목록에서 안 보이게 됨)
    public void closeStudy(Study study) {
        Study findStudy = checkLoginMemberHasAuth(study);

        findStudy.setStudyStatus(Study.StudyStatus.STUDY_CLOSED);

        Timer timer = new Timer();
        long delayInMillis = 6 * 3600000;    // 6시간

        timer.schedule(new TimerTask() {
            @Override
            public void run() {
                findStudy.setStudyStatus(Study.StudyStatus.STUDY_DELETED);
                studyRepository.save(findStudy);
            }
        }, delayInMillis);
    }

    public void deleteStudy(Long boardId) {
        Study study = findVerifiedStudy(boardId);

        // 작성자, 로그인 멤버 일치 여부 확인
        checkLoginMemberHasAuth(study);

        study.setStudyStatus(Study.StudyStatus.STUDY_DELETED);
    }

    private Study findVerifiedStudy(Long boardId) {
        Optional<Study> optionalStudy = studyRepository.findById(boardId);
        if( optionalStudy.isPresent() && optionalStudy.get().getStudyStatus() == Study.StudyStatus.STUDY_POSTED  )
            return optionalStudy.get();
        else throw new BusinessLogicException(ExceptionCode.STUDY_NOT_FOUND);
    }

    // 작성자, 로그인 멤버 일치 여부 확인
    public Study checkLoginMemberHasAuth(Study study) {
        Study findStudy = findVerifiedStudy(study.getBoardId());
        MemberProfile loginMember = memberService.findMemberFromToken().getMemberProfile();

        if( findStudy.getMemberProfile() != loginMember ) {
            throw new BusinessLogicException(ExceptionCode.NO_AUTHORIZATION);
        }

        return findStudy;
    }

    public List<Study> removeBlockUserBoard(List<Study> studyList) {
        if(SecurityContextHolder.getContext().getAuthentication().getName().equals("anonymousUser"))
            return studyList;
        List<Block> blockList = memberService.findMemberFromToken().getMemberProfile().getBlockList();
        List<Study> result = studyList.stream()
                .filter(study -> !blockList.stream().anyMatch(block -> block.getBlockMemberId()== study.getMemberProfile().getMemberProfileId()))
                .collect(Collectors.toList());
        return result;
    }
}
