package WOOMOOL.DevSquad.projectboard.repository;

import WOOMOOL.DevSquad.projectboard.entity.Project;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    @Query("SELECT p FROM Project p WHERE p.projectStatus = 'PROJECT_POSTED' ORDER BY p.createdAt DESC ")
    Page<Project> findByProjectStatus(Pageable pageable);

    @Query("SELECT p FROM Project p WHERE p.projectStatus = 'PROJECT_POSTED' and p.memberProfile.memberProfileId = :memberProfileId")
    List<Project> findByProjectStatusAndMemberProfile(@Param("memberProfileId") Long memberProfileId);

    @Query("SELECT p FROM Project p WHERE p.projectStatus = 'PROJECT_POSTED' and p.memberProfile.memberProfileId = :memberProfileId")
    Page<Project> findByProjectStatusAndMemberProfile(@Param("memberProfileId") Long memberProfileId,Pageable pageable);

}
