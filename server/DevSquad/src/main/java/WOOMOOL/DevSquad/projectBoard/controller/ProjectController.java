package WOOMOOL.DevSquad.projectBoard.controller;

import WOOMOOL.DevSquad.projectBoard.dto.ProjectDto;
import WOOMOOL.DevSquad.projectBoard.entity.Project;
import WOOMOOL.DevSquad.projectBoard.mapper.ProjectMapper;
import WOOMOOL.DevSquad.projectBoard.service.ProjectService;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/project")
public class ProjectController {
    private final ProjectService service;
    private final ProjectMapper mapper;

    public ProjectController(ProjectService service, ProjectMapper mapper) {
        this.service = service;
        this.mapper = mapper;
    }

    @PostMapping
    public ResponseEntity postProject(@RequestBody ProjectDto.PostDto postDto) {
        Project project = service.createStudy(mapper.postDtoToEntity(postDto));

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    // 프로젝트 페이지 조회
    @GetMapping("/list")
    public ResponseEntity getProjects(Pageable pageable) {
        List<Project> projects = service.getProjects(pageable);

        List<ProjectDto.previewResponseDto> response = mapper.entityToPreviewResponseDto(projects);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 프로젝트 상세 조회
    @GetMapping("/{boardId}")
    public ResponseEntity getProject(@PathVariable("boardId") Long boardId) {
        Project project = service.getProject(boardId);

        ProjectDto.AllResponseDto responseDto = mapper.entityToAllResponseDto(project);
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    @PatchMapping("/{boardId}")
    public ResponseEntity updateProject(@PathVariable("boardId") Long boardId,
                                        @RequestBody ProjectDto.PatchDto patchDto) {
        patchDto.setBoardId(boardId);
        Project project = service.updateProject(mapper.patchDtoToEntity(patchDto));

        return new ResponseEntity<>(mapper.entityToAllResponseDto(project), HttpStatus.OK);
    }

    @DeleteMapping("/{boardId}")
    public ResponseEntity deleteProject(@PathVariable("boardId") Long boardId) {
        service.deleteProject(boardId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
