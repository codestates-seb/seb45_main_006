package WOOMOOL.DevSquad.studyBoard.service;

import WOOMOOL.DevSquad.exception.BusinessLogicException;
import WOOMOOL.DevSquad.exception.ExceptionCode;
import WOOMOOL.DevSquad.member.entity.MemberProfile;
import WOOMOOL.DevSquad.member.service.MemberService;
import WOOMOOL.DevSquad.projectBoard.entity.Project;
import WOOMOOL.DevSquad.studyBoard.entity.Study;
import WOOMOOL.DevSquad.studyBoard.repository.StudyRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
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

    public Study updateStudy(Study study) {

        // 작성자, 로그인 멤버 일치 여부 확인
        Study findStudy = checkLoginMemberHasAuth(study);

        Optional.ofNullable(study.getTitle())
                .ifPresent(title -> findStudy.setTitle(title));
        Optional.ofNullable(study.getContent())
                .ifPresent(content -> findStudy.setContent(content));
        Optional.ofNullable(study.getRecruitNum())
                .ifPresent(recruitNum -> findStudy.setRecruitNum(recruitNum));
        Optional.ofNullable(study.isRecruitStatus())
                .ifPresent(recruitStatus -> findStudy.setRecruitStatus(recruitStatus));

        findStudy.setModifiedAt(LocalDateTime.now());

        return findStudy;
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
}
