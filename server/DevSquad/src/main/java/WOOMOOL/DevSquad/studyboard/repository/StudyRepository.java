package WOOMOOL.DevSquad.studyboard.repository;

import WOOMOOL.DevSquad.projectboard.entity.Project;
import WOOMOOL.DevSquad.studyboard.entity.Study;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface StudyRepository extends JpaRepository<Study, Long> {
    @Query("SELECT s FROM Study s WHERE s.studyStatus != 'STUDY_DELETED' ORDER BY s.createdAt DESC ")
    List<Study> findByStudyStatus();
  
    @Query("SELECT s FROM Study s WHERE s.studyStatus = 'STUDY_POSTED' and s.memberProfile.memberProfileId = :memberProfileId")
    List<Study> findByStudyStatusAndMemberProfile(@Param("memberProfileId") Long memberProfileId);

    @Query("SELECT s FROM Study s WHERE s.studyStatus = 'STUDY_POSTED' and s.memberProfile.memberProfileId = :memberProfileId")
    Page<Study> findByStudyStatusAndMemberProfile(@Param("memberProfileId") Long memberProfileId,Pageable pageable);

    // 스택 필터링
    @Query("SELECT DISTINCT s FROM Study s JOIN s.stackTags st " +
            "WHERE st.tagName IN :tagNames " +
            "AND s.studyStatus != 'STUDY_DELETED' " +
            "GROUP BY s HAVING COUNT(st) IN :tagCount " +
            "ORDER BY s.createdAt DESC")
    List<Study> findAllByStackTags(List<String> tagNames, Long tagCount);

    // 타이틀 필터링
    @Query("SELECT s FROM Study s " +
            "WHERE s.title LIKE CONCAT('%',LOWER(:title) ,'%') " +
            "AND s.studyStatus != 'STUDY_DELETED' " +
            "ORDER BY s.createdAt DESC")
    List<Study> findAllByTitle(String title);


    // 스택 + 타이틀 필터링
    @Query("SELECT s FROM Study s JOIN s.stackTags st " +
            "WHERE st.tagName IN :tagNames " +
            "AND s.title LIKE CONCAT('%',LOWER(:title) ,'%')" +
            "AND s.studyStatus != 'STUDY_DELETED' " +
            "GROUP BY s HAVING COUNT(st) IN :tagCount " +
            "ORDER BY s.createdAt DESC")
    List<Study> findAllByStackTagsAndTitle(List<String> tagNames, Long tagCount, String title);
}
