package WOOMOOL.DevSquad.board.service;

import WOOMOOL.DevSquad.board.entity.Board;
import WOOMOOL.DevSquad.board.repository.BoardRepository;
import WOOMOOL.DevSquad.exception.BusinessLogicException;
import WOOMOOL.DevSquad.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.net.URISyntaxException;

@Service
@Transactional
@RequiredArgsConstructor
public class BoardService {
    private final BoardRepository boardRepository;

    @Transactional(readOnly = true)
    public void verifyBoardUri(String board, long boardId) {
        String dataType;
        if(board.equals("project"))
            dataType = "Project";
        else if(board.equals("study"))
            dataType = "Study";
        else if(board.equals("information"))
            dataType = "InfoBoard";
        else if(board.equals("question"))
            dataType = "QuestionBoard";
        else
            throw new IllegalArgumentException();

        boardRepository.findByBoardIdAndDtype(dataType, boardId).orElseThrow(()->new IllegalArgumentException());

    }
}
