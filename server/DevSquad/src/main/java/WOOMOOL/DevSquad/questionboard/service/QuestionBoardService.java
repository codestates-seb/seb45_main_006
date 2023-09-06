package WOOMOOL.DevSquad.questionboard.service;

import WOOMOOL.DevSquad.exception.BusinessLogicException;
import WOOMOOL.DevSquad.exception.ExceptionCode;
import WOOMOOL.DevSquad.member.service.MemberService;
import WOOMOOL.DevSquad.questionboard.entity.QuestionBoard;
import WOOMOOL.DevSquad.questionboard.repository.QuestionBoardRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

        verifiedIsWriter(memberService.findMemberFromToken().getMemberId(), findQuestionBoard.getMemberProfile().getMemberProfileId());

        Optional.ofNullable(questionBoard.getTitle()).ifPresent(title -> findQuestionBoard.setTitle(title));
        Optional.ofNullable(questionBoard.getContent()).ifPresent(content -> findQuestionBoard.setContent(content));
        findQuestionBoard.setModifiedAt(LocalDateTime.now());

        return questionBoardRepository.save(findQuestionBoard);
    }
    //조회할때 카테고리가 있는지 없는지 검색어가 있는지 없지에 따라 구분
    public List<QuestionBoard> findAllQuestionBoard(String search) {
        List<QuestionBoard> result = new ArrayList<>();
        if(search==null)
            result = questionBoardRepository.findAllPosted();
        else
            result = questionBoardRepository.findByKeyword(search);


        return result;
    }

    public void deleteQuestionBoard(Long boardId) {
        QuestionBoard findQuestionBoard = findVerifiedQuestionBoard(boardId);

        verifiedIsWriter(memberService.findMemberFromToken().getMemberId(), findQuestionBoard.getMemberProfile().getMemberProfileId());

        findQuestionBoard.setQuestionBoardStatus(QuestionBoard.QuestionBoardStatus.QUESTIONBOARD_DELETED);

        questionBoardRepository.save(findQuestionBoard);
    }

    public QuestionBoard findVerifiedQuestionBoard(Long boardId) {
        Optional<QuestionBoard> QuestionBoard = questionBoardRepository.findById(boardId);
        QuestionBoard findQuestionBoard = QuestionBoard.orElseThrow(() -> new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND));

        return findQuestionBoard;
    }

    public void increaseViewCount(Long boardId) {
        QuestionBoard questionBoard = findVerifiedQuestionBoard(boardId);
        questionBoard.setViewCount(questionBoard.getViewCount()+1);
        questionBoardRepository.save(questionBoard);
    }
    public void verifiedIsWriter(Long currentId ,Long writerId) {
        if(currentId!=writerId)
            throw new BusinessLogicException(ExceptionCode.FORBIDDEN);
    }
}
