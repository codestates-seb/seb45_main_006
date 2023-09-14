package WOOMOOL.DevSquad.projectboard.controller;

import WOOMOOL.DevSquad.bookmark.service.BookmarkService;
import WOOMOOL.DevSquad.projectboard.dto.ProjectDto;
import WOOMOOL.DevSquad.projectboard.entity.Project;
import WOOMOOL.DevSquad.projectboard.mapper.ProjectMapper;
import WOOMOOL.DevSquad.projectboard.service.ProjectService;
import WOOMOOL.DevSquad.utils.PageResponseDto;
import org.springframework.data.domain.Page;
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

    public ProjectController(ProjectService projectService, ProjectMapper mapper) {
        this.projectService = projectService;
        this.mapper = mapper;
    }

    @PostMapping
    public ResponseEntity postProject(@Valid @RequestBody ProjectDto.PostDto postDto) {
        Project project = projectService.createProject(mapper.postDtoToEntity(postDto), postDto.getStack());

        ProjectDto.AllResponseDto responseDto = mapper.entityToAllResponseDto(project);
        return new ResponseEntity<>(responseDto, HttpStatus.CREATED);
    }

    // 전체 프로젝트 리스트 조회 ( 스택 + 타이틀 필터링)
    @GetMapping("/list")
    public ResponseEntity getProjectList(@RequestParam int page,
                                         @RequestParam int size,
                                         @RequestParam(required = false) List<String> stacks,
                                         @RequestParam(required = false) String title) {

        Page<Project> projectPage = projectService.getProjects(page - 1, size, title, stacks, null);
        List<Project> projectList = projectPage.getContent();

        List<ProjectDto.previewResponseDto> response = mapper.entityToPreviewResponseDto(projectList);
        return new ResponseEntity(new PageResponseDto<>(response, projectPage), HttpStatus.OK);
    }

    // 모집 중인 프로젝트 리스트 조회 ( 스택 + 타이틀 필터링)
    @GetMapping("/list/posted")
    public ResponseEntity getPostedProjectList(@RequestParam int page,
                                         @RequestParam int size,
                                         @RequestParam(required = false) List<String> stacks,
                                         @RequestParam(required = false) String title) {

        Page<Project> projectPage = projectService.getProjects(page - 1, size, title, stacks, "posted");
        List<Project> projectList = projectPage.getContent();

        List<ProjectDto.previewResponseDto> response = mapper.entityToPreviewResponseDto(projectList);
        return new ResponseEntity(new PageResponseDto<>(response, projectPage), HttpStatus.OK);
    }



    // 프로젝트 상세 조회
    @GetMapping("/{boardId}")
    public ResponseEntity getProject(@PathVariable("boardId") @Positive Long boardId) {
        Project project = projectService.getProject(boardId);

        ProjectDto.AllResponseDto responseDto = mapper.entityToAllResponseDto(project);
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    // 회원이 쓴 프로젝트 게시판 조회
    @GetMapping("/member/{member-id}")
    public ResponseEntity getMemberProjectBoard(@PathVariable("member-id") Long memberId,
                                                @RequestParam int page){

        Page<Project> projectListPage = projectService.getProjectBoardList(memberId,page-1);
        List<Project> projectList = projectListPage.getContent();
        List<ProjectDto.previewResponseDto> response = mapper.entityToPreviewResponseDto(projectList);

        return new ResponseEntity(new PageResponseDto(response,projectListPage),HttpStatus.OK);

    }


    // 프로젝트 수정
    @PatchMapping("/{boardId}")
    public ResponseEntity updateProject(@PathVariable("boardId") @Positive Long boardId,
                                        @Valid @RequestBody ProjectDto.PatchDto patchDto) {
        patchDto.setBoardId(boardId);
        Project project = projectService.updateProject(mapper.patchDtoToEntity(patchDto), patchDto.getStack());

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

