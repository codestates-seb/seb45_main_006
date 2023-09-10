package WOOMOOL.DevSquad.studyboard.controller;

import WOOMOOL.DevSquad.studyboard.dto.StudyDto;
import WOOMOOL.DevSquad.studyboard.entity.Study;
import WOOMOOL.DevSquad.studyboard.mapper.StudyMapper;
import WOOMOOL.DevSquad.studyboard.service.StudyService;
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
         Study study = studyService.createStudy(mapper.postDtoToEntity(postDto));

         return new ResponseEntity<>(HttpStatus.CREATED);
    }

    // 스터디 페이지 조회
    @GetMapping("/list")
    public ResponseEntity getStudies(Pageable pageable) {
        List<Study> studies = studyService.getStudies(pageable);

        List<StudyDto.previewResponseDto> response = mapper.entityToPreviewResponseDto(studies);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 스터디 상세 조회
    @GetMapping("/{boardId}")
    public ResponseEntity getStudy(@PathVariable("boardId") @Positive Long boardId) {
        StudyDto.AllResponseDto study = mapper.entityToAllResponseDto(studyService.getStudy(boardId));

        return new ResponseEntity<>(study, HttpStatus.OK);
    }

    // 스터디 수정
    @PatchMapping("/{boardId}")
    public ResponseEntity updateStudy(@PathVariable("boardId") @Positive Long boardId,
                                      @Valid @RequestBody StudyDto.PatchDto patchDto) {
        patchDto.setBoardId(boardId);
        Study study = studyService.updateStudy(mapper.patchDtoToEntity(patchDto));

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
