package WOOMOOL.DevSquad.infoboard.service;

import WOOMOOL.DevSquad.exception.BusinessLogicException;
import WOOMOOL.DevSquad.exception.ExceptionCode;
import WOOMOOL.DevSquad.infoboard.entity.InfoBoard;
import WOOMOOL.DevSquad.infoboard.repository.InfoBoardRepository;
import WOOMOOL.DevSquad.member.service.MemberService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class InfoBoardService {
    private final InfoBoardRepository infoBoardRepository;
    private final MemberService memberService;

    public InfoBoardService(InfoBoardRepository infoBoardRepository,
                            MemberService memberService) {
        this.infoBoardRepository = infoBoardRepository;
        this.memberService = memberService;
    }

    public InfoBoard createInfoBoard(InfoBoard infoBoard) {
        infoBoard.setMemberProfile(memberService.findMemberFromToken().getMemberProfile());

        return infoBoardRepository.save(infoBoard);
    }

    public InfoBoard updateInfoBoard(InfoBoard infoBoard) {
        InfoBoard findInfoBoard = findVerifiedInfoBoard(infoBoard.getBoardId());

        verifiedIsWriter(memberService.findMemberFromToken().getMemberId(), findInfoBoard.getMemberProfile().getMemberProfileId());

        Optional.ofNullable(infoBoard.getCategory()).ifPresent(category -> findInfoBoard.setCategoryValue(category));
        Optional.ofNullable(infoBoard.getTitle()).ifPresent(title -> findInfoBoard.setTitle(title));
        Optional.ofNullable(infoBoard.getContent()).ifPresent(content -> findInfoBoard.setContent(content));
        findInfoBoard.setModifiedAt(LocalDateTime.now());

        return infoBoardRepository.save(findInfoBoard);
    }
    //조회할때 카테고리가 있는지 없는지 검색어가 있는지 없지에 따라 구분
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

    public void deleteInfoBoard(long boardId) {
        InfoBoard findInfoBoard = findVerifiedInfoBoard(boardId);

        verifiedIsWriter(memberService.findMemberFromToken().getMemberId(), findInfoBoard.getMemberProfile().getMemberProfileId());

        findInfoBoard.setInfoBoardStatus(InfoBoard.InfoBoardStatus.INFOBOARD_DELETED);

        infoBoardRepository.save(findInfoBoard);
    }

    public InfoBoard findVerifiedInfoBoard(long boardId) {
        Optional<InfoBoard> infoBoard = infoBoardRepository.findById(boardId);
        InfoBoard findInfoBoard = infoBoard.orElseThrow(() -> new BusinessLogicException(ExceptionCode.BOARD_NOT_FOUND));

        return findInfoBoard;
    }

    public void increaseViewCount(long boardId) {
        InfoBoard infoBoard = findVerifiedInfoBoard(boardId);
        infoBoard.setViewCount(infoBoard.getViewCount()+1);
        infoBoardRepository.save(infoBoard);
    }
    public void verifiedIsWriter(Long currentId ,Long writerId) {
        if(currentId!=writerId)
            throw new BusinessLogicException(ExceptionCode.FORBIDDEN);
    }
}
