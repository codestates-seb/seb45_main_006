package WOOMOOL.DevSquad.questionboard.service;

import WOOMOOL.DevSquad.block.entity.Block;
import WOOMOOL.DevSquad.exception.BusinessLogicException;
import WOOMOOL.DevSquad.exception.ExceptionCode;
import WOOMOOL.DevSquad.level.service.LevelService;
import WOOMOOL.DevSquad.member.service.MemberService;
import WOOMOOL.DevSquad.questionboard.entity.QuestionBoard;
import WOOMOOL.DevSquad.questionboard.repository.QuestionBoardRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class QuestionBoardService {
    private final QuestionBoardRepository questionBoardRepository;
    private final MemberService memberService;
    private final LevelService levelService;

    public QuestionBoardService(QuestionBoardRepository questionBoardRepository, MemberService memberService, LevelService levelService) {
        this.questionBoardRepository = questionBoardRepository;
        this.memberService = memberService;
        this.levelService = levelService;
    }

    public QuestionBoard createQuestionBoard(QuestionBoard questionBoard) {
        questionBoard.setMemberProfile(memberService.findMemberFromToken().getMemberProfile());

        levelService.getExpFromActivity(memberService.findMemberFromToken().getMemberProfile());

        return questionBoardRepository.save(questionBoard);
    }

    public QuestionBoard updateQuestionBoard(QuestionBoard questionBoard) {
        QuestionBoard findQuestionBoard = findVerifiedQuestionBoard(questionBoard.getBoardId());

        verifiedIsWriter(findQuestionBoard);

        Optional.ofNullable(questionBoard.getTitle()).ifPresent(title -> findQuestionBoard.setTitle(title));
        Optional.ofNullable(questionBoard.getContent()).ifPresent(content -> findQuestionBoard.setContent(content));
        findQuestionBoard.setModifiedAt(LocalDateTime.now());

        return questionBoardRepository.save(findQuestionBoard);
    }

    //질문게시판 페이징
    public Page<QuestionBoard> getQuestionBoardList(Long memberId, int page){

        Page<QuestionBoard> questionBoardPage = questionBoardRepository
                .findAllByMemberProfile(memberId,PageRequest.of(page,4, Sort.by("createdAt")));

        return questionBoardPage;
    }


    //조회할때 검색어가 있는지 없는지 검색어가 있는지 없지에 따라 구분
    public Page<QuestionBoard> findAllQuestionBoard(String search, int page, int size) {
        List<QuestionBoard> questionBoardList;
        if(search==null)
            questionBoardList = questionBoardRepository.findAllPosted();
        else
            questionBoardList = questionBoardRepository.findByKeyword(search);
        questionBoardList = removeBlockUserBoard(questionBoardList);
        List<QuestionBoard> pagingList = questionBoardList.subList(page * size, Math.min(page * size + size, questionBoardList.size()));
        Page<QuestionBoard> result = new PageImpl<>(pagingList, PageRequest.of(page, size), questionBoardList.size());

        return result;
    }

    public void deleteQuestionBoard(Long boardId) {
        QuestionBoard findQuestionBoard = findVerifiedQuestionBoard(boardId);

        verifiedIsWriter(findQuestionBoard);

        findQuestionBoard.setQuestionBoardStatus(QuestionBoard.QuestionBoardStatus.QUESTIONBOARD_DELETED);

        questionBoardRepository.save(findQuestionBoard);
    }

    public QuestionBoard findVerifiedQuestionBoard(Long boardId) {
        Optional<QuestionBoard> QuestionBoard = questionBoardRepository.findById(boardId);
        QuestionBoard findQuestionBoard = QuestionBoard.orElseThrow(() -> new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND));

        return findQuestionBoard;
    }
    public List<QuestionBoard> findHottestQuestionBoard() {
        LocalDateTime oneWeekMinus = LocalDateTime.now().minusWeeks(1);
        List<QuestionBoard> result = questionBoardRepository.findHottestQuestionBoard(oneWeekMinus);
        result = removeBlockUserBoard(result);
        return result.stream().limit(10).collect(Collectors.toList());
    }

    public void increaseViewCount(Long boardId) {
        QuestionBoard questionBoard = findVerifiedQuestionBoard(boardId);
        questionBoard.setViewCount(questionBoard.getViewCount()+1);
        questionBoardRepository.save(questionBoard);
    }
    public void verifiedIsWriter(QuestionBoard questionBoard) {
        long currentId = memberService.findMemberFromToken().getMemberId();
        long writerId = questionBoard.getMemberProfile().getMemberProfileId();
        if(currentId!=writerId)
            throw new BusinessLogicException(ExceptionCode.FORBIDDEN);
    }
    public List<QuestionBoard> removeBlockUserBoard(List<QuestionBoard> questionBoardList) {
        if(SecurityContextHolder.getContext().getAuthentication().getName().equals("anonymousUser"))
            return questionBoardList;
        List<Block> blockList = memberService.findMemberFromToken().getMemberProfile().getBlockList();
        List<QuestionBoard> result = questionBoardList.stream()
                .filter(questionBoard -> !blockList.stream()
                        .anyMatch(block -> block.getBlockMemberId()== questionBoard.getMemberProfile().getMemberProfileId()))
                .collect(Collectors.toList());
        return result;
    }
}
