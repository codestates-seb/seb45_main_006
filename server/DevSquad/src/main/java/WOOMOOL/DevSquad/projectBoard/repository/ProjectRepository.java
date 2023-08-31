package WOOMOOL.DevSquad.projectBoard.repository;

import WOOMOOL.DevSquad.projectBoard.entity.Project;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    Page<Project> findByProjectStatus(Project.ProjectStatus status, Pageable pageable);
}
