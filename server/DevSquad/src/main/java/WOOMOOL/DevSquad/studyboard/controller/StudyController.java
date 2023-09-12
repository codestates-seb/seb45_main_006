package WOOMOOL.DevSquad.studyboard.controller;

import WOOMOOL.DevSquad.projectboard.dto.ProjectDto;
import WOOMOOL.DevSquad.projectboard.entity.Project;
import WOOMOOL.DevSquad.studyboard.dto.StudyDto;
import WOOMOOL.DevSquad.studyboard.entity.Study;
import WOOMOOL.DevSquad.studyboard.mapper.StudyMapper;
import WOOMOOL.DevSquad.studyboard.service.StudyService;
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
@RequestMapping("/study")
@Validated
public class StudyController {
    private final StudyService studyService;
    private final StudyMapper mapper;

    public StudyController(StudyService studyService, StudyMapper mapper) {
        this.studyService = studyService;
        this.mapper = mapper;
    }

    @PostMapping
    public ResponseEntity postStudy(@Valid @RequestBody StudyDto.PostDto postDto) {
         Study study = studyService.createStudy(mapper.postDtoToEntity(postDto), postDto.getStack());

         StudyDto.AllResponseDto responseDto = mapper.entityToAllResponseDto(study);
         return new ResponseEntity<>(responseDto, HttpStatus.CREATED);
    }

    // 스터디 페이지 조회
    @GetMapping("/list")
    public ResponseEntity getStuies(@RequestParam int page,
                                      @RequestParam(required = false) List<String> stacks) {
        // 스택 필터링
        if (stacks != null) {

            Page<Study> studies = studyService.getStudiesByStack(page - 1, stacks);
            List<StudyDto.previewResponseDto> response = mapper.entityToPreviewResponseDto(studies.getContent());

            return new ResponseEntity(response, HttpStatus.OK);

        } else {

            List<Study> studies = studyService.getStudies(page - 1);
            studies = studyService.removeBlockUserBoard(studies);

            List<StudyDto.previewResponseDto> response = mapper.entityToPreviewResponseDto(studies);
            return new ResponseEntity<>(response, HttpStatus.OK);

        }

    }

    // 스터디 상세 조회
    @GetMapping("/{boardId}")
    public ResponseEntity getStudy(@PathVariable("boardId") @Positive Long boardId) {
        Study study = studyService.getStudy(boardId);

        StudyDto.AllResponseDto responseDto = mapper.entityToAllResponseDto(study);
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    // 회원이 쓴 스터디 게시판 조회
    @GetMapping("/member/{member-id}")
    public ResponseEntity getMemberStudyBoard(@PathVariable("member-id") Long memberId,
                                              @RequestParam int page){

        Page<Study> studyListPage = studyService.getStudyBoardList(memberId,page-1);
        List<Study> studytList = studyListPage.getContent();
        List<StudyDto.previewResponseDto> response = mapper.entityToPreviewResponseDto(studytList);

        return new ResponseEntity(new PageResponseDto(response,studyListPage),HttpStatus.OK);

    }

    // 스터디 수정
    @PatchMapping("/{boardId}")
    public ResponseEntity updateStudy(@PathVariable("boardId") @Positive Long boardId,
                                      @Valid @RequestBody StudyDto.PatchDto patchDto) {
        patchDto.setBoardId(boardId);
        Study study = studyService.updateStudy(mapper.patchDtoToEntity(patchDto), patchDto.getStack());

        return new ResponseEntity<>(mapper.entityToAllResponseDto(study), HttpStatus.OK);
    }

    // 모집 마감
    @PatchMapping("/{boardId}/close")
    public ResponseEntity closeProject(@PathVariable("boardId") @Positive Long boardId) {

        Study study = studyService.getStudy(boardId);

        studyService.closeStudy(study);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{boardId}")
    public ResponseEntity deleteStudy(@PathVariable("boardId") @Positive Long boardId) {
        studyService.deleteStudy(boardId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
