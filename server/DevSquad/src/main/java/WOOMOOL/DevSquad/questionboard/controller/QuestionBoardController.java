package WOOMOOL.DevSquad.questionboard.controller;

import WOOMOOL.DevSquad.questionboard.dto.QuestionBoardDto;
import WOOMOOL.DevSquad.questionboard.entity.QuestionBoard;
import WOOMOOL.DevSquad.questionboard.mapper.QuestionBoardMapper;
import WOOMOOL.DevSquad.questionboard.service.QuestionBoardService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;


import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController
@Validated
@RequestMapping("/question")
public class QuestionBoardController {
    private final static String INFOBOARD_DEFAULT_URL = "/question";
    private final QuestionBoardService questionBoardService;
    private final QuestionBoardMapper mapper;

    public QuestionBoardController(QuestionBoardService questionBoardService,
                                   QuestionBoardMapper mapper) {
        this.questionBoardService = questionBoardService;
        this.mapper = mapper;
    }
    @PostMapping
    public ResponseEntity postQuestionBoard(@Valid @RequestBody QuestionBoardDto.Post requestBody) {
        QuestionBoard questionBoard = mapper.QuestionBoardPostDtoToQuestionBoard(requestBody);
        QuestionBoard createdQuestionBoard = questionBoardService.createQuestionBoard(questionBoard);

        URI location = UriComponentsBuilder
                .newInstance()
                .path(INFOBOARD_DEFAULT_URL + "/{board-id}")
                .buildAndExpand(createdQuestionBoard.getBoardId())
                .toUri();

        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{board-id}")
    public ResponseEntity patchQuestionBoard(@Valid @RequestBody QuestionBoardDto.Patch requestBody,
                                         @PathVariable("board-id") @Positive long boardId) {
        requestBody.setBoardId(boardId);

        QuestionBoard questionBoard = mapper.QuestionBoardPatchDtoToQuestionBoard(requestBody);

        QuestionBoard updatedQuestionBoard = questionBoardService.updateQuestionBoard(questionBoard);

        return new ResponseEntity<>(mapper.QuestionBoardToQuestionBoardResponseDto(updatedQuestionBoard), HttpStatus.OK);
    }
    //정보게시판 전체 검색
    @GetMapping
    public ResponseEntity getAllQuestionBoard(@RequestParam(name = "search", required = false) String search) {
        List<QuestionBoard> questionBoardList = questionBoardService.findAllQuestionBoard(search);

        return new ResponseEntity<>(mapper.QuestionBoardListToQuestionBoardResponseDtoList(questionBoardList), HttpStatus.OK);
    }
    //뷰카운트 올리기 (정보게시판을 펼쳐서 보기때문에 상세페이지가 따로 없어서 펼치기를 누르면 조회수가 올라감
    @PostMapping("/{board-id}")
    public ResponseEntity increaseViewCount(@PathVariable("board-id") @Positive long boardId) {
        questionBoardService.increaseViewCount(boardId);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{board-id}")
    public ResponseEntity deleteQuestionBoard(@PathVariable("board-id") @Positive long boardId) {
        questionBoardService.deleteQuestionBoard(boardId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
