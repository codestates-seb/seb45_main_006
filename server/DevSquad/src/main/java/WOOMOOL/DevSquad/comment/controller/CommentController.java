package WOOMOOL.DevSquad.comment.controller;

import WOOMOOL.DevSquad.board.entity.Board;
import WOOMOOL.DevSquad.comment.dto.CommentDto;
import WOOMOOL.DevSquad.comment.entity.Comment;
import WOOMOOL.DevSquad.comment.mapper.CommentMapper;
import WOOMOOL.DevSquad.comment.service.CommentService;
import WOOMOOL.DevSquad.utils.PageResponseDto;
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
@RequestMapping("/{board}/{board-id}")
public class CommentController {
    private final static String COMMENT_DEFAULT_URL = "/{board}/{board-id}";
    private final CommentService commentService;
    private final CommentMapper mapper;

    public CommentController(CommentService commentService,
                             CommentMapper mapper) {
        this.commentService = commentService;
        this.mapper = mapper;
    }
    @PostMapping("/comment")
    public ResponseEntity postComment(@Valid @RequestBody CommentDto.Post requestBody,
                                      @PathVariable("board") String board,
                                      @PathVariable("board-id") @Positive long boardId) {
        Comment comment = mapper.commentPostDtoToComment(requestBody);
        Comment createdComment = commentService.createComment(boardId, comment);

        URI location = UriComponentsBuilder
                .newInstance()
                .path(COMMENT_DEFAULT_URL + "/{comment-id}")
                .buildAndExpand(board, boardId, createdComment.getCommentId())
                .toUri();

        return ResponseEntity.created(location).build();
    }
    @PostMapping("/comment/{comment-id}")
    public ResponseEntity postCoComment(@Valid @RequestBody CommentDto.Post requestBody,
                                        @PathVariable("board") String board,
                                        @PathVariable("board-id") @Positive long boardId,
                                        @PathVariable("comment-id") @Positive Long commentId) {
        requestBody.setParentId(commentId);
        Comment comment = mapper.commentPostDtoToComment(requestBody);
        Comment createdComment = commentService.createComment(boardId, comment);

        URI location = UriComponentsBuilder
                .newInstance()
                .path(COMMENT_DEFAULT_URL + "/{comment-id}")
                .buildAndExpand(board, boardId, createdComment.getCommentId())
                .toUri();

        return ResponseEntity.created(location).build();
    }
    @PostMapping("/answer/{answer-id}/comment")
    public ResponseEntity postAnswerComment(@Valid @RequestBody CommentDto.Post requestBody,
                                            @PathVariable("board") String board,
                                            @PathVariable("board-id") @Positive long boardId,
                                            @PathVariable("answer-id") @Positive long answerId) {
        requestBody.setAnswerId(answerId);
        Comment comment = mapper.commentPostDtoToComment(requestBody);
        Comment createdComment = commentService.createAnswerComment(comment);

        URI location = UriComponentsBuilder
                .newInstance()
                .path(COMMENT_DEFAULT_URL + "/answer/{answer-id}/comment/{comment-id}")
                .buildAndExpand(board, boardId, answerId, createdComment.getCommentId())
                .toUri();

        return ResponseEntity.created(location).build();
    }
    @PostMapping("/answer/{answer-id}/comment/{comment-id}")
    public ResponseEntity postAnswerCoComment(@Valid @RequestBody CommentDto.Post requestBody,
                                              @PathVariable("board") String board,
                                              @PathVariable("board-id") @Positive long boardId,
                                              @PathVariable("answer-id") @Positive long answerId,
                                              @PathVariable("comment-id") @Positive Long commentId) {
        requestBody.setAnswerId(answerId);
        requestBody.setParentId(commentId);
        Comment comment = mapper.commentPostDtoToComment(requestBody);
        Comment createdComment = commentService.createAnswerComment(comment);

        URI location = UriComponentsBuilder
                .newInstance()
                .path(COMMENT_DEFAULT_URL + "/answer/{answer-id}/comment/{comment-id}")
                .buildAndExpand(board, boardId, answerId, createdComment.getCommentId())
                .toUri();

        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/comment/{comment-id}")
    public ResponseEntity patchComment(@Valid @RequestBody CommentDto.Patch requestBody,
                                       @PathVariable("comment-id") @Positive long commentId) {
        requestBody.setCommentId(commentId);

        Comment comment = mapper.commentPatchDtoToComment(requestBody);

        Comment updatedComment = commentService.updateComment(comment);

        return new ResponseEntity<>(mapper.commentToCommentResponseDto(updatedComment), HttpStatus.OK);
    }
    @PatchMapping("/answer/{answer-id}/comment/{comment-id}")
    public ResponseEntity patchAnswerComment(@Valid @RequestBody CommentDto.Patch requestBody,
                                       @PathVariable("comment-id") @Positive long commentId) {
        requestBody.setCommentId(commentId);

        Comment comment = mapper.commentPatchDtoToComment(requestBody);

        Comment updatedComment = commentService.updateComment(comment);

        return new ResponseEntity<>(mapper.commentToCommentResponseDto(updatedComment), HttpStatus.OK);
    }
    @DeleteMapping("/comment/{comment-id}")
    public ResponseEntity deleteComment(@PathVariable("comment-id") @Positive long commentId) {
        commentService.deleteComment(commentId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @DeleteMapping("/answer/{answer-id}/comment/{comment-id}")
    public ResponseEntity deleteAnswerComment(@PathVariable("comment-id") @Positive long commentId) {
        commentService.deleteComment(commentId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/comment")
    public ResponseEntity getAllComment(@PathVariable("board-id") @Positive long boardId,
                                        @RequestParam @Positive int page,
                                        @RequestParam @Positive int size) {
        Page<Comment> commentPage = commentService.selectCommentByBoardId(boardId, page, size);
        List<Comment> commentList = commentPage.getContent();
        return new ResponseEntity(new PageResponseDto<>(mapper.commentListToCommentResponseDtoList(commentList), commentPage), HttpStatus.OK);
    }
    @GetMapping("/answer/{answer-id}/comment")
    public ResponseEntity getAnswerAllComment(@PathVariable("answer-id") @Positive long answerId,
                                              @RequestParam @Positive int page,
                                              @RequestParam @Positive int size) {
        Page<Comment> commentPage = commentService.selectCommentByAnswerId(answerId, page, size);
        List<Comment> commentList = commentPage.getContent();
        return new ResponseEntity<>(new PageResponseDto<>(mapper.commentListToCommentResponseDtoList(commentList), commentPage), HttpStatus.OK);
    }
//    @GetMapping("/comment/{comment-id}")
//    public ResponseEntity getComment(@PathVariable("comment-id") @Positive long commentId) {
//        return new ResponseEntity<>(mapper.commentToCommentResponseDto(commentService.findVerifiedComment(commentId)), HttpStatus.OK);
//    }

}
