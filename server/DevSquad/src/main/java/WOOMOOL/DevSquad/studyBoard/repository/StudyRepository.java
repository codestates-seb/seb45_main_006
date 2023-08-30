package WOOMOOL.DevSquad.studyBoard.repository;

import WOOMOOL.DevSquad.studyBoard.entity.Study;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudyRepository extends JpaRepository<Study, Long> {
    Page<Study> findByStudyStatus(Study.StudyStatus status, Pageable pageable);

}
