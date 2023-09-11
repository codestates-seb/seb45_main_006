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
    private final MemberService memberService;
    private final InfoBoardMapper infoBoardMapper;
    private final QuestionBoardMapper questionBoardMapper;

    @PostMapping("/{board}/{board-id}/likes")
    public ResponseEntity postAndDeleteLikes(@PathVariable("board-id") @Positive long boardId) {
        HttpStatus httpStatus = likesService.createAndDeleteLikes(boardId);

        return new ResponseEntity<>(httpStatus);
    }
    //매핑주소 아직 안정함
    @GetMapping("/test1")
    public ResponseEntity getLikedInfoBoard() {
        long memberId = memberService.findMemberFromToken().getMemberId();
        return new ResponseEntity<>(infoBoardMapper.InfoBoardListToInfoBoardResponseDtoList(likesService.findLikedInfoBoard(memberId)),HttpStatus.OK);
    }
    //매핑주소 아직 안정함
    @GetMapping("/test2")
    public ResponseEntity getLikedQuestionBoard() {
        long memberId = memberService.findMemberFromToken().getMemberId();
        return new ResponseEntity<>(questionBoardMapper.QuestionBoardListToQuestionBoardResponseDtoList(likesService.findLikedQuestionBoard(memberId)),HttpStatus.OK);
    }
}
