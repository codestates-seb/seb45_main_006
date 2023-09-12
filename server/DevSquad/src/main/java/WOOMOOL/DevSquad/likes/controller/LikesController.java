package WOOMOOL.DevSquad.likes.controller;

import WOOMOOL.DevSquad.infoboard.mapper.InfoBoardMapper;
import WOOMOOL.DevSquad.likes.service.LikesService;
import WOOMOOL.DevSquad.member.service.MemberService;
import WOOMOOL.DevSquad.questionboard.mapper.QuestionBoardMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;

@RestController
@RequiredArgsConstructor
public class LikesController {
    private final LikesService likesService;

    @PostMapping("/likes/{board}/{board-id}")
    public ResponseEntity postAndDeleteLikes(@PathVariable("board-id") @Positive long boardId) {
        HttpStatus httpStatus = likesService.createAndDeleteLikes(boardId);

        return new ResponseEntity<>(httpStatus);
    }

}
