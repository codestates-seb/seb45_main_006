package WOOMOOL.DevSquad.projectBoard.service;

import WOOMOOL.DevSquad.projectBoard.entity.Project;
import WOOMOOL.DevSquad.projectBoard.repository.ProjectRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {
    private final ProjectRepository repo;

    public ProjectService(ProjectRepository repo) {
        this.repo = repo;
    }

    public Project createStudy(Project project) {
        return repo.save(project);
    }

    public Project getProject(Long boardId) {
        Project project = findVerifiedProject(boardId);

        if( project.getProjectStatus() == Project.ProjectStatus.PROJECT_POSTED ) {
            project.setViewCount(project.getViewCount() + 1);
            repo.save(project);
            return project;
        } else throw new RuntimeException();
                        // todo : 예외처리
    }

    public List<Project> getProjects(Pageable pageable) {
        Page<Project> projectPage = repo.findByProjectStatus(Project.ProjectStatus.PROJECT_POSTED, pageable);
        return  projectPage.getContent();
    }

    public Project updateProject(Project project) {
        Project findProject = findVerifiedProject(project.getBoardId());

        // todo : 작성자만 수정할 수 있게

        Optional.ofNullable(project.getTitle())
                .ifPresent(title -> findProject.setTitle(title));
        Optional.ofNullable(project.getContent())
                .ifPresent(content -> findProject.setContent(content));
        Optional.ofNullable(project.getStartDate())
                .ifPresent(startDate -> findProject.setStartDate(startDate));
        Optional.ofNullable(project.getDeadline())
                .ifPresent(deadline -> findProject.setDeadline(deadline));
        Optional.ofNullable(project.getRecruitNum())
                .ifPresent(recruitNum -> findProject.setRecruitNum(recruitNum));

        findProject.setModifiedAt(LocalDateTime.now());

        repo.save(findProject);
        return findProject;
    }

    public void deleteProject(Long boardId) {
        Project project = findVerifiedProject(boardId);

        project.setProjectStatus(Project.ProjectStatus.PROJECT_DELETED);

        repo.save(project);
    }

    private Project findVerifiedProject(Long boardId) {
        Optional<Project> optionalProject = repo.findById(boardId);
        if( optionalProject.isPresent() )
            return optionalProject.get();
        else throw new RuntimeException();
                 // todo : 예외처리
    }
}
