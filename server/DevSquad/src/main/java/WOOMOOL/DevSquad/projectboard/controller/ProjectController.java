package WOOMOOL.DevSquad.projectboard.controller;

import WOOMOOL.DevSquad.bookmark.service.BookmarkService;
import WOOMOOL.DevSquad.projectboard.dto.ProjectDto;
import WOOMOOL.DevSquad.projectboard.entity.Project;
import WOOMOOL.DevSquad.projectboard.mapper.ProjectMapper;
import WOOMOOL.DevSquad.projectboard.service.ProjectService;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/project")
@Validated
public class ProjectController {
    private final ProjectService projectService;
    private final ProjectMapper mapper;

    private final BookmarkService bookmarkService;

    public ProjectController(ProjectService projectService, ProjectMapper mapper, BookmarkService bookmarkService) {
        this.projectService = projectService;
        this.mapper = mapper;
        this.bookmarkService = bookmarkService;
    }

    @PostMapping
    public ResponseEntity postProject(@Valid @RequestBody ProjectDto.PostDto postDto) {
        Project project = projectService.createProject(mapper.postDtoToEntity(postDto));

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    // 프로젝트 페이지 조회
    @GetMapping("/list")
    public ResponseEntity getProjects(Pageable pageable) {
        List<Project> projects = projectService.getProjects(pageable);

        List<ProjectDto.previewResponseDto> response = mapper.entityToPreviewResponseDto(projects);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 프로젝트 상세 조회
    @GetMapping("/{boardId}")
    public ResponseEntity getProject(@PathVariable("boardId") @Positive Long boardId) {
        Project project = projectService.getProject(boardId);

        ProjectDto.AllResponseDto responseDto = mapper.entityToAllResponseDto(project);
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }


    // 프로젝트 수정
    @PatchMapping("/{boardId}")
    public ResponseEntity updateProject(@PathVariable("boardId") @Positive Long boardId,
                                        @Valid @RequestBody ProjectDto.PatchDto patchDto) {
        patchDto.setBoardId(boardId);
        Project project = projectService.updateProject(mapper.patchDtoToEntity(patchDto));

        return new ResponseEntity<>(mapper.entityToAllResponseDto(project), HttpStatus.OK);
    }


    // 모집 마감
    @PatchMapping("/{boardId}/close")
    public ResponseEntity closeProject(@PathVariable("boardId") @Positive Long boardId) {

        Project project = projectService.getProject(boardId);

        projectService.closeProject(project);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{boardId}")
    public ResponseEntity deleteProject(@PathVariable("boardId") @Positive Long boardId) {
        projectService.deleteProject(boardId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

