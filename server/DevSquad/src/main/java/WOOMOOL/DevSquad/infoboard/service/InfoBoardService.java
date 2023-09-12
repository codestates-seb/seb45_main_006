package WOOMOOL.DevSquad.infoboard.service;

import WOOMOOL.DevSquad.block.entity.Block;
import WOOMOOL.DevSquad.exception.BusinessLogicException;
import WOOMOOL.DevSquad.exception.ExceptionCode;
import WOOMOOL.DevSquad.infoboard.entity.InfoBoard;
import WOOMOOL.DevSquad.infoboard.repository.InfoBoardRepository;
import WOOMOOL.DevSquad.member.service.MemberService;
import WOOMOOL.DevSquad.questionboard.entity.QuestionBoard;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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

    //정보게시판 페이징
    public Page<InfoBoard> getInfoBoardList(Long memberId, int page){

        Page<InfoBoard> infoBoardPage = infoBoardRepository.findAllByMemberProfile(memberId,PageRequest.of(page,4, Sort.by("createdAt")));

        return infoBoardPage;
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
    public Page<InfoBoard> findAllInfoBoard(String categoryName, String search, int page, int size) {
        List<InfoBoard> infoBoardList;
        InfoBoard.Category category = InfoBoard.stringToCategory(categoryName);
        if(category==null && search==null)
            infoBoardList = infoBoardRepository.findAllPosted();
        else if(category==null)
            infoBoardList = infoBoardRepository.findByKeyword(search);
        else if(search==null)
            infoBoardList = infoBoardRepository.findByCategory(category);
        else
            infoBoardList = infoBoardRepository.findByCategoryKeyword(category, search);
        infoBoardList = removeBlockUserBoard(infoBoardList);
        Page<InfoBoard> result = new PageImpl<>(infoBoardList, PageRequest.of(page, size), infoBoardList.size());

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

    public List<InfoBoard> findHottestInfoBoard() {
        LocalDateTime oneWeekMinus = LocalDateTime.now().minusWeeks(1);
        List<InfoBoard> result = infoBoardRepository.findHottestInfoBoard(oneWeekMinus);
        result = removeBlockUserBoard(result);
        return result.stream().limit(10).collect(Collectors.toList());
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
    public List<InfoBoard> removeBlockUserBoard(List<InfoBoard> infoBoardList) {
        if(SecurityContextHolder.getContext().getAuthentication().getName().equals("anonymousUser")) {
            return infoBoardList;
        }
            List<Block> blockList = memberService.findMemberFromToken().getMemberProfile().getBlockList();
            List<InfoBoard> result = infoBoardList.stream()
                    .filter(infoBoard -> !blockList.stream().anyMatch(block -> block.getBlockMemberId() == infoBoard.getMemberProfile().getMemberProfileId()))
                    .collect(Collectors.toList());
        return result;
    }
}
