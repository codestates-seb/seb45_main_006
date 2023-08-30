package WOOMOOL.DevSquad.infoboard.service;

import WOOMOOL.DevSquad.exception.BusinessLogicException;
import WOOMOOL.DevSquad.exception.ExceptionCode;
import WOOMOOL.DevSquad.infoboard.entity.InfoBoard;
import WOOMOOL.DevSquad.infoboard.repository.InfoBoardRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class InfoBoardService {
    private final InfoBoardRepository infoBoardRepository;

    public InfoBoardService(InfoBoardRepository infoBoardRepository) {
        this.infoBoardRepository = infoBoardRepository;
    }

    public InfoBoard createInfoBoard(InfoBoard infoBoard) {

        return infoBoardRepository.save(infoBoard);
    }

    public InfoBoard updateInfoBoard(InfoBoard infoBoard) {
        InfoBoard findInfoBoard = findVerifiedInfoBoard(infoBoard.getBoardId());
        //member 검증 로직 추가할것
        Optional.ofNullable(infoBoard.getCategory()).ifPresent(category -> findInfoBoard.setCategoryValue(category));
        Optional.ofNullable(infoBoard.getTitle()).ifPresent(title -> findInfoBoard.setTitle(title));
        Optional.ofNullable(infoBoard.getContent()).ifPresent(content -> findInfoBoard.setContent(content));
        findInfoBoard.setModifiedAt(LocalDateTime.now());

        return infoBoardRepository.save(findInfoBoard);
    }

    public List<InfoBoard> findAllInfoBoard(String categoryName, String search) {
        List<InfoBoard> result = new ArrayList<>();
        InfoBoard.Category category = InfoBoard.stringToCategory(categoryName);
        if(category==null && search==null)
            result = infoBoardRepository.findAllPosted();
        else if(category==null)
            result = infoBoardRepository.findByKeyword(search);
        else if(search==null)
            result = infoBoardRepository.findByCategory(category);
        else
            result = infoBoardRepository.findByCategoryKeyword(category, search);

        return result;
    }

    public void deleteInfoBoard(Long boardId) {
        InfoBoard findInfoBoard = findVerifiedInfoBoard(boardId);
        //member 검증 로직 추가할것
        findInfoBoard.setInfoBoardStatus(InfoBoard.InfoBoardStatus.INFOBOARD_DELETED);

        infoBoardRepository.save(findInfoBoard);
    }

    public InfoBoard findVerifiedInfoBoard(Long boardId) {
        Optional<InfoBoard> findInfoBoard = infoBoardRepository.findById(boardId);
        InfoBoard infoBoard = findInfoBoard.orElseThrow(() -> new BusinessLogicException(ExceptionCode.INFOBOARD_NOT_FOUND));
        return infoBoard;
    }

    public void increaseViewCount(Long boardId) {
        InfoBoard infoBoard = findVerifiedInfoBoard(boardId);
        infoBoard.setViewCount(infoBoard.getViewCount()+1);
        infoBoardRepository.save(infoBoard);
    }
}
