package WOOMOOL.DevSquad.projectboard.repository;

import WOOMOOL.DevSquad.member.entity.MemberProfile;
import WOOMOOL.DevSquad.projectboard.entity.Project;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    @Query("SELECT p FROM Project p WHERE p.projectStatus != 'PROJECT_DELETED' ORDER BY p.createdAt DESC ")
    List<Project> findByProjectStatus();

    @Query("SELECT p FROM Project p WHERE p.projectStatus = 'PROJECT_POSTED' and p.memberProfile.memberProfileId = :memberProfileId")
    List<Project> findByProjectStatusAndMemberProfile(@Param("memberProfileId") Long memberProfileId);

    @Query("SELECT p FROM Project p WHERE p.projectStatus = 'PROJECT_POSTED' and p.memberProfile.memberProfileId = :memberProfileId")
    Page<Project> findByProjectStatusAndMemberProfile(@Param("memberProfileId") Long memberProfileId,Pageable pageable);

    // 스택 필터링
    @Query("SELECT DISTINCT p FROM Project p JOIN p.stackTags st " +
            "WHERE st.tagName IN :tagNames " +
            "AND p.projectStatus != 'PROJECT_DELETED' " +
            "GROUP BY p HAVING COUNT(st) IN :tagCount " +
            "ORDER BY p.createdAt DESC")
    List<Project> findAllByStackTags(List<String> tagNames, Long tagCount);


    // 타이틀 필터링
    @Query("SELECT p FROM Project p " +
            "WHERE p.title LIKE CONCAT('%',LOWER(:title) ,'%') " +
            "AND p.projectStatus != 'PROJECT_DELETED' " +
            "ORDER BY p.createdAt DESC")
    List<Project> findAllByTitle(String title);

    // 스택 + 타이틀 필터링
    @Query("SELECT p FROM Project p JOIN p.stackTags st " +
            "WHERE st.tagName IN :tagNames " +
            "AND p.title LIKE CONCAT('%',LOWER(:title) ,'%')" +
            "AND p.projectStatus != 'PROJECT_DELETED' " +
            "GROUP BY p HAVING COUNT(st) IN :tagCount " +
            "ORDER BY p.createdAt DESC")
    List<Project> findAllByStackTagsAndTitle(List<String> tagNames, Long tagCount, String title);
}
