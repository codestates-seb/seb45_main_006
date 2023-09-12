package WOOMOOL.DevSquad.answer.service;

import WOOMOOL.DevSquad.answer.entity.Answer;
import WOOMOOL.DevSquad.answer.repository.AnswerRepository;
import WOOMOOL.DevSquad.block.entity.Block;
import WOOMOOL.DevSquad.exception.BusinessLogicException;
import WOOMOOL.DevSquad.exception.ExceptionCode;
import WOOMOOL.DevSquad.member.service.MemberService;
import WOOMOOL.DevSquad.questionboard.entity.QuestionBoard;
import WOOMOOL.DevSquad.questionboard.service.QuestionBoardService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class AnswerService {
    private final AnswerRepository answerRepository;
    private final MemberService memberService;
    private final QuestionBoardService questionBoardService;

    public AnswerService(AnswerRepository answerRepository,
                         MemberService memberService,
                         QuestionBoardService questionBoardService) {
        this.answerRepository = answerRepository;
        this.memberService = memberService;
        this.questionBoardService = questionBoardService;
    }

    public Answer createAnswer(Answer answer) {
        answer.setMemberProfile(memberService.findMemberFromToken().getMemberProfile());
        QuestionBoard questionBoard = questionBoardService.findVerifiedQuestionBoard(answer.getQuestionBoard().getBoardId());
        answer.setQuestionBoard(questionBoard);

        return answerRepository.save(answer);
    }

    public Answer updateAnswer(Answer answer) {
        Answer findAnswer = findVerifiedAnswer(answer.getAnswerId());

        verifiedIsWriter(findAnswer);

        Optional.ofNullable(answer.getContent()).ifPresent(content -> findAnswer.setContent(content));
        findAnswer.setModifiedAt(LocalDateTime.now());

        return answerRepository.save(findAnswer);
    }
    public void deleteAnswer(long answerId) {
        Answer findAnswer = findVerifiedAnswer(answerId);

        verifiedIsWriter(findAnswer);

        findAnswer.setAnswerStatus(Answer.AnswerStatus.ANSWER_DELETED);

        answerRepository.save(findAnswer);
    }

    public Page<Answer> selectAnswerByBoardId(Long boardId, int page, int size) {
        List<Answer> answerList = answerRepository.findByBoardId(boardId);
        answerList = removeBlockUserBoard(answerList);
        Page<Answer> result = new PageImpl<>(answerList, PageRequest.of(page, size), answerList.size());
        return result;
    }

    public void acceptAnswer(long answerId) {
        Answer findAnswer = findVerifiedAnswer(answerId);

        questionBoardService.verifiedIsWriter(findAnswer.getQuestionBoard());

        if(findAnswer.getQuestionBoard().isAnswered())
            throw new BusinessLogicException(ExceptionCode.ACCEPT_ALREADY_EXISTS);

        findAnswer.setAccepted(true);
        findAnswer.getQuestionBoard().setAnswered(true);

        answerRepository.save(findAnswer);
    }

    public Answer findVerifiedAnswer(long answerId) {
        Optional<Answer> answer = answerRepository.findById(answerId);
        Answer findAnswer = answer.orElseThrow(() -> new BusinessLogicException(ExceptionCode.ANSWER_NOT_FOUND));

        return findAnswer;
    }

    public void verifiedIsWriter(Answer answer) {
        long currentId = memberService.findMemberFromToken().getMemberId();
        long writerId = answer.getMemberProfile().getMemberProfileId();
        if(currentId!=writerId)
            throw new BusinessLogicException(ExceptionCode.FORBIDDEN);
    }

    public List<Answer> removeBlockUserBoard(List<Answer> answerList) {
        if(SecurityContextHolder.getContext().getAuthentication().getName().equals("anonymousUser"))
            return answerList;
        List<Block> blockList = memberService.findMemberFromToken().getMemberProfile().getBlockList();
        List<Answer> result = answerList.stream()
                .filter(answer -> !blockList.stream()
                        .anyMatch(block -> block.getBlockMemberId()== answer.getMemberProfile().getMemberProfileId()))
                .collect(Collectors.toList());
        return result;
    }

}
