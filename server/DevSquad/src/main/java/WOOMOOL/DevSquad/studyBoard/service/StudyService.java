package WOOMOOL.DevSquad.studyBoard.service;

import WOOMOOL.DevSquad.studyBoard.entity.Study;
import WOOMOOL.DevSquad.studyBoard.repository.StudyRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class StudyService {
    private final StudyRepository studyRepository;

    public StudyService(StudyRepository studyRepository) {
        this.studyRepository = studyRepository;
    }

    public Study createStudy(Study study) {
        return studyRepository.save(study);
    }

    public Study getStudy(Long boardId) {
        Study study = findVerifiedStudy(boardId);

        if( study.getStudyStatus() == Study.StudyStatus.STUDY_POSTED ) {
            study.setViewCount(study.getViewCount() + 1);
            studyRepository.save(study);
            return study;
        } else throw new RuntimeException();
                        // todo : 예외처리
    }

    public List<Study> getStudies(Pageable pageable) {
        Page<Study> studyPage = studyRepository.findByStudyStatus(Study.StudyStatus.STUDY_POSTED, pageable);
        return studyPage.getContent();
    }

    public Study updateStudy(Study study) {
        Study findStudy = findVerifiedStudy(study.getBoardId());

        // todo : 작성자만 수정할 수 있게

        Optional.ofNullable(study.getTitle())
                .ifPresent(title -> findStudy.setTitle(title));
        Optional.ofNullable(study.getContent())
                .ifPresent(content -> findStudy.setContent(content));
        Optional.ofNullable(study.getRecruitNum())
                .ifPresent(recruitNum -> findStudy.setRecruitNum(recruitNum));
        Optional.ofNullable(study.isRecruitStatus())
                .ifPresent(recruitStatus -> findStudy.setRecruitStatus(recruitStatus));

        findStudy.setModifiedAt(LocalDateTime.now());

        studyRepository.save(findStudy);
        return findStudy;
    }

    public void deleteStudy(Long boardId) {
        Study study = findVerifiedStudy(boardId);

        study.setStudyStatus(Study.StudyStatus.STUDY_DELETED);

        studyRepository.save(study);
    }

    private Study findVerifiedStudy(Long boardId) {
        Optional<Study> optionalStudy = studyRepository.findById(boardId);
        if( optionalStudy.isPresent() )
            return optionalStudy.get();
        else throw new RuntimeException();
                  // todo : 예외처리
    }
}
