package WOOMOOL.DevSquad.comment.controller;

import WOOMOOL.DevSquad.board.entity.Board;
import WOOMOOL.DevSquad.comment.dto.CommentDto;
import WOOMOOL.DevSquad.comment.entity.Comment;
import WOOMOOL.DevSquad.comment.mapper.CommentMapper;
import WOOMOOL.DevSquad.comment.service.CommentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Validated
@RequestMapping("/comment")
public class CommentController {
    private final CommentService commentService;
    private final CommentMapper mapper;

    public CommentController(CommentService commentService,
                             CommentMapper mapper) {
        this.commentService = commentService;
        this.mapper = mapper;
    }
    @PostMapping
    public ResponseEntity postComment(@RequestBody CommentDto.Post requestBody) {
        Comment comment = mapper.commentPostDtoToComment(requestBody);
        return new ResponseEntity(HttpStatus.CREATED);
    }


}
