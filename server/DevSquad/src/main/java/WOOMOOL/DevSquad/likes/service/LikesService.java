package WOOMOOL.DevSquad.likes.service;

import WOOMOOL.DevSquad.board.repository.BoardRepository;
import WOOMOOL.DevSquad.exception.BusinessLogicException;
import WOOMOOL.DevSquad.exception.ExceptionCode;
import WOOMOOL.DevSquad.infoboard.entity.InfoBoard;
import WOOMOOL.DevSquad.likes.entity.Likes;
import WOOMOOL.DevSquad.likes.repository.LikesRepository;
import WOOMOOL.DevSquad.member.service.MemberService;
import WOOMOOL.DevSquad.questionboard.entity.QuestionBoard;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class LikesService {
    private final LikesRepository likesRepository;
    private final MemberService memberService;
    private final BoardRepository boardRepository;

    public HttpStatus createAndDeleteLikes(Long boardId) {
        Optional<Likes> findLikes = likesRepository.findByBoard_BoardIdAndMemberProfile_MemberProfileId
                (boardId,memberService.findMemberFromToken().getMemberId());
        Likes likes = findLikes.orElse(new Likes());
        if(findLikes.isPresent()) {
            likesRepository.delete(likes);
            return HttpStatus.NO_CONTENT;
        }
        else {
            likes.setMemberProfile(memberService.findMemberFromToken().getMemberProfile());
            likes.setBoard(boardRepository.findById(boardId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.BOARD_NOT_FOUND)));
            likesRepository.save(likes);
            return HttpStatus.CREATED;
        }
    }
    public List<InfoBoard> findLikedInfoBoard(long memberId) {
        return likesRepository.findInfoBoardByLikedMemberId(memberId);
    }
    public List<QuestionBoard> findLikedQuestionBoard(long memberId) {
        return likesRepository.findQuestionBoardByLikedMemberId(memberId);
    }
}
