package WOOMOOL.DevSquad.studyBoard.controller;

import WOOMOOL.DevSquad.studyBoard.dto.StudyDto;
import WOOMOOL.DevSquad.studyBoard.entity.Study;
import WOOMOOL.DevSquad.studyBoard.mapper.StudyMapper;
import WOOMOOL.DevSquad.studyBoard.service.StudyService;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/study")
public class StudyController {
    private final StudyService service;
    private final StudyMapper mapper;

    public StudyController(StudyService service, StudyMapper mapper) {
        this.service = service;
        this.mapper = mapper;
    }

    @PostMapping
    public ResponseEntity postStudy(@RequestBody StudyDto.PostDto postDto) {
         Study study = service.createStudy(mapper.postDtoToEntity(postDto));

         return new ResponseEntity<>(mapper.entityToAllResponseDto(study), HttpStatus.CREATED);
    }

    // 스터디 페이지 조회
    @GetMapping("/list")
    public ResponseEntity getStudies(Pageable pageable) {
        List<Study> studies = service.getStudies(pageable);

        List<StudyDto.previewResponseDto> response = mapper.entityToPreviewResponseDto(studies);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 스터디 상세 조회
    @GetMapping("/{boardId}")
    public ResponseEntity getStudy(@PathVariable("boardId") Long boardId) {
        StudyDto.AllResponseDto study = mapper.entityToAllResponseDto(service.getStudy(boardId));

        return new ResponseEntity<>(study, HttpStatus.OK);
    }

    @PatchMapping("/{boardId}")
    public ResponseEntity updateStudy(@PathVariable("boardId") Long boardId,
                                      @RequestBody StudyDto.PatchDto patchDto) {
        patchDto.setBoardId(boardId);
        Study study = service.updateStudy(mapper.patchDtoToEntity(patchDto));

        return new ResponseEntity<>(mapper.entityToAllResponseDto(study), HttpStatus.OK);
    }

    @DeleteMapping("/{boardId}")
    public ResponseEntity deleteStudy(@PathVariable("boardId") Long boardId) {
        service.deleteStudy(boardId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
