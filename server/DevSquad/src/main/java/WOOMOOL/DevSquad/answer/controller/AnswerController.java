package WOOMOOL.DevSquad.answer.controller;

import WOOMOOL.DevSquad.answer.dto.AnswerDto;
import WOOMOOL.DevSquad.answer.entity.Answer;
import WOOMOOL.DevSquad.answer.mapper.AnswerMapper;
import WOOMOOL.DevSquad.answer.service.AnswerService;
import WOOMOOL.DevSquad.utils.PageResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
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
@RequestMapping("/question/{board-id}/answer")
@RequiredArgsConstructor
public class AnswerController {
    private final static String ANSWER_DEFAULT_URL = "/question/{board-id}/answer";
    private final AnswerService answerService;
    private final AnswerMapper mapper;



    @PostMapping
    public ResponseEntity postAnswer(@Valid @RequestBody  AnswerDto.Post requestBody,
                                     @PathVariable("board-id") @Positive long boardId) {
        requestBody.setBoardId(boardId);
        Answer answer = mapper.answerPostDtoToAnswer(requestBody);
        Answer createdAnswer = answerService.createAnswer(answer);

        URI location = UriComponentsBuilder
                .newInstance()
                .path(ANSWER_DEFAULT_URL + "/{answer-id}")
                .buildAndExpand(boardId, createdAnswer.getAnswerId())
                .toUri();

        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{answer-id}")
    public ResponseEntity patchAnswer(@Valid @RequestBody AnswerDto.Patch requestBody,
                                      @PathVariable("answer-id") @Positive long answerId) {
        requestBody.setAnswerId(answerId);

        Answer answer = mapper.answerPatchDtoToAnswer(requestBody);

        Answer updatedAnswer = answerService.updateAnswer(answer);

        return new ResponseEntity<>(mapper.answerToAnswerResponseDto(updatedAnswer), HttpStatus.OK);
    }
    @GetMapping
    public ResponseEntity getAnswer(@PathVariable("board-id") @Positive long boarId,
                                    @RequestParam @Positive int page,
                                    @RequestParam @Positive int size) {
        Page<Answer> answerPage = answerService.selectAnswerByBoardId(boarId, page-1, size);
        List<Answer> answerList = answerPage.getContent();

        return new ResponseEntity<>(new PageResponseDto<>(mapper.answerListToAnswerResponseDtoList(answerList), answerPage),
                HttpStatus.OK);
    }

    @DeleteMapping("/{answer-id}")
    public ResponseEntity deleteAnswer(@PathVariable("answer-id") @Positive long answerId) {
        answerService.deleteAnswer(answerId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/{answer-id}/accept")
    public ResponseEntity acceptAnswer(@PathVariable("answer-id") @Positive long answerId) {
        answerService.acceptAnswer(answerId);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
