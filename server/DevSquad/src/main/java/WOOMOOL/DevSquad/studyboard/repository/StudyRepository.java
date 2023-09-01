package WOOMOOL.DevSquad.studyboard.repository;

import WOOMOOL.DevSquad.studyboard.entity.Study;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface StudyRepository extends JpaRepository<Study, Long> {
    @Query("SELECT s FROM Study s WHERE s.studyStatus = 'STUDY_POSTED' ORDER BY s.createdAt DESC ")
    Page<Study> findByStudyStatus(Pageable pageable);

    @Query("SELECT p FROM Study p WHERE p.studyStatus = 'STUDY_POSTED' and p.memberProfile.memberProfileId = :memberProfileId ORDER BY p.createdAt DESC")
    List<Study> findByStudyStatusAndMemberProfile(@Param("memberProfileId") Long memberProfileId);
}
