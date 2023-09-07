package WOOMOOL.DevSquad.likes.controller;

import WOOMOOL.DevSquad.likes.service.LikesService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/{board}/{board-id}/likes")
@RequiredArgsConstructor
public class LikesController {
    private final LikesService likesService;

    @PostMapping
    public ResponseEntity postAndDeleteLikes(@PathVariable("board-id") @Positive long boardId) {
        HttpStatus httpStatus = likesService.createAndDeleteLikes(boardId);

        return new ResponseEntity<>(httpStatus);
    }
}
