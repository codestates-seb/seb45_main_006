package WOOMOOL.DevSquad.comment.controller;

import WOOMOOL.DevSquad.board.entity.Board;
import WOOMOOL.DevSquad.comment.dto.CommentDto;
import WOOMOOL.DevSquad.comment.entity.Comment;
import WOOMOOL.DevSquad.comment.mapper.CommentMapper;
import WOOMOOL.DevSquad.comment.service.CommentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;

@RestController
@Validated
@RequestMapping("/comment")
public class CommentController {
    private final static String COMMENT_DEFAULT_URL = "/comment";
    private final CommentService commentService;
    private final CommentMapper mapper;

    public CommentController(CommentService commentService,
                             CommentMapper mapper) {
        this.commentService = commentService;
        this.mapper = mapper;
    }
    @PostMapping
    public ResponseEntity postComment(@Valid @RequestBody CommentDto.Post requestBody) {
        Comment comment = mapper.commentPostDtoToComment(requestBody);
        Comment createdComment = commentService.createComment(requestBody.getBoardId(), comment);

        URI location = UriComponentsBuilder
                .newInstance()
                .path(COMMENT_DEFAULT_URL + "/{comment-id}")
                .buildAndExpand(createdComment.getCommentId())
                .toUri();

        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{comment-id}")
    public ResponseEntity patchComment(@Valid@RequestBody CommentDto.Patch requestBody,
                                       @PathVariable("comment-id") @Positive long commentId) {
        requestBody.setCommentId(commentId);

        Comment comment = mapper.commentPatchDtoToComment(requestBody);

        Comment updatedComment = commentService.updateComment(comment);

        return new ResponseEntity<>(mapper.commentToCommentResponseDto(updatedComment), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getAllComment() {
        return new ResponseEntity(mapper.commentListToCommentResponseDtoList(commentService.findCommentList()), HttpStatus.OK);
    }
    @GetMapping("/{comment-id}")
    public ResponseEntity getComment(@PathVariable("comment-id") @Positive long commentId) {
        return new ResponseEntity<>(mapper.commentToCommentResponseDto(commentService.findVerifiedComment(commentId)), HttpStatus.OK);
    }
}
