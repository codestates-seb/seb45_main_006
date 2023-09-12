package WOOMOOL.DevSquad.studyboard.service;

import WOOMOOL.DevSquad.block.entity.Block;
import WOOMOOL.DevSquad.exception.BusinessLogicException;
import WOOMOOL.DevSquad.exception.ExceptionCode;
import WOOMOOL.DevSquad.member.entity.MemberProfile;
import WOOMOOL.DevSquad.member.service.MemberService;
import WOOMOOL.DevSquad.questionboard.entity.QuestionBoard;
import WOOMOOL.DevSquad.studyboard.entity.Study;
import WOOMOOL.DevSquad.studyboard.repository.StudyRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Timer;
import java.util.TimerTask;
import java.util.stream.Collectors;

@Service
@Transactional
@EnableScheduling
public class StudyService {
    private final StudyRepository studyRepository;
    private final MemberService memberService;

    public StudyService(StudyRepository studyRepository, MemberService memberService) {
        this.studyRepository = studyRepository;
        this.memberService = memberService;
    }

    public Study createStudy(Study study) {
        study.setMemberProfile(memberService.findMemberFromToken().getMemberProfile());

        return studyRepository.save(study);
    }

    public Study getStudy(Long boardId) {
        Study study = findVerifiedStudy(boardId);

        study.setViewCount(study.getViewCount() + 1);

        return study;
    }

    // 스터디 리스트 조회
    @Transactional(readOnly = true)
    public List<Study> getStudies(Pageable pageable) {
        Page<Study> studyPage = studyRepository.findByStudyStatus(pageable);
        return studyPage.getContent();
    }

    //스터디 페이징
    public Page<Study> getStudyBoardList(Long memberId, int page){

        Page<Study> studyPage = studyRepository.findByStudyStatusAndMemberProfile(memberId, PageRequest.of(page,4, Sort.by("createdAt")));

        return studyPage;

    }

    // 스터디 수정
    public Study updateStudy(Study study) {

        // 작성자, 로그인 멤버 일치 여부 확인
        Study findStudy = checkLoginMemberHasAuth(study);

        Optional.ofNullable(study.getTitle())
                .ifPresent(title -> findStudy.setTitle(title));
        Optional.ofNullable(study.getContent())
                .ifPresent(content -> findStudy.setContent(content));
        Optional.ofNullable(study.getRecruitNum())
                .ifPresent(recruitNum -> findStudy.setRecruitNum(recruitNum));

        findStudy.setModifiedAt(LocalDateTime.now());

        return findStudy;
    }

    // 모집 마감 : 상태가 마감으로 바뀌고, 일정 시간 지나면 삭제( 목록에서 안 보이게 됨)
    public void closeStudy(Study study) {
        Study findStudy = checkLoginMemberHasAuth(study);

        findStudy.setStudyStatus(Study.StudyStatus.STUDY_CLOSED);

        Timer timer = new Timer();
        long delayInMillis = 60000;    // 일단 1분

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
