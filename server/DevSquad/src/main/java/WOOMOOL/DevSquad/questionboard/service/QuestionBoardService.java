package WOOMOOL.DevSquad.questionboard.service;

import WOOMOOL.DevSquad.exception.BusinessLogicException;
import WOOMOOL.DevSquad.exception.ExceptionCode;
import WOOMOOL.DevSquad.infoboard.entity.InfoBoard;
import WOOMOOL.DevSquad.member.service.MemberService;
import WOOMOOL.DevSquad.questionboard.entity.QuestionBoard;
import WOOMOOL.DevSquad.questionboard.repository.QuestionBoardRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class QuestionBoardService {
    private final QuestionBoardRepository questionBoardRepository;
    private final MemberService memberService;

    public QuestionBoardService(QuestionBoardRepository questionBoardRepository,
                                MemberService memberService) {
        this.questionBoardRepository = questionBoardRepository;
        this.memberService = memberService;
    }

    public QuestionBoard createQuestionBoard(QuestionBoard questionBoard) {
        questionBoard.setMemberProfile(memberService.findMemberFromToken().getMemberProfile());

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
    //조회할때 카테고리가 있는지 없는지 검색어가 있는지 없지에 따라 구분
    public Page<QuestionBoard> findAllQuestionBoard(String search, int page, int size) {
        Page<QuestionBoard> result;
        if(search==null)
            result = questionBoardRepository.findAllPosted(PageRequest.of(page, size));
        else
            result = questionBoardRepository.findByKeyword(search, PageRequest.of(page, size));


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
        return questionBoardRepository.findHottestQuestionBoard(oneWeekMinus).stream().limit(10).collect(Collectors.toList());
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
}
