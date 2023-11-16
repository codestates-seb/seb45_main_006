package WOOMOOL.DevSquad.answer.service;

import WOOMOOL.DevSquad.answer.entity.Answer;
import WOOMOOL.DevSquad.answer.repository.AnswerRepository;
import WOOMOOL.DevSquad.block.entity.Block;
import WOOMOOL.DevSquad.exception.BusinessLogicException;
import WOOMOOL.DevSquad.exception.ExceptionCode;
import WOOMOOL.DevSquad.level.service.LevelService;
import WOOMOOL.DevSquad.member.entity.MemberProfile;
import WOOMOOL.DevSquad.member.service.MemberService;
import WOOMOOL.DevSquad.notification.entity.Notification;
import WOOMOOL.DevSquad.notification.service.NotificationService;
import WOOMOOL.DevSquad.questionboard.entity.QuestionBoard;
import WOOMOOL.DevSquad.questionboard.repository.QuestionBoardRepository;
import WOOMOOL.DevSquad.questionboard.service.QuestionBoardService;
import lombok.RequiredArgsConstructor;
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
@RequiredArgsConstructor
public class AnswerService {
    private final AnswerRepository answerRepository;
    private final MemberService memberService;
    private final QuestionBoardService questionBoardService;
    private final LevelService levelService;
    private final NotificationService notificationService;
    private final QuestionBoardRepository questionBoardRepository;

    public Answer createAnswer(Answer answer) {
        answer.setMemberProfile(memberService.findMemberFromToken().getMemberProfile());
        QuestionBoard questionBoard = questionBoardService.findVerifiedQuestionBoard(answer.getQuestionBoard().getBoardId());
        verifiedIsNotWriter(questionBoard);
        answer.setQuestionBoard(questionBoard);

        levelService.getExpFromActivity(memberService.findMemberFromToken().getMemberProfile());

        // 게시판 쓴 사람 정보
        Long boardId = questionBoard.getBoardId();
        MemberProfile memberProfile = questionBoardRepository.findById(boardId).get().getMemberProfile();

        // 알림 보내기
        sendAnswerNotification(memberProfile, "게시글에 답변이 달렸습니다.", String.valueOf(boardId));

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
        List<Answer> pagingList = answerList.subList(page * size, Math.min(page * size + size, answerList.size()));
        Page<Answer> result = new PageImpl<>(pagingList, PageRequest.of(page, size), answerList.size());
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

        levelService.getExpFromAcceptedAnswer(findAnswer);
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
    public void verifiedIsNotWriter(QuestionBoard questionBoard) {
        long currentId = memberService.findMemberFromToken().getMemberId();
        long writerId = questionBoard.getMemberProfile().getMemberProfileId();
        if(currentId==writerId)
            throw new BusinessLogicException(ExceptionCode.FORBIDDEN);
    }

    private void sendAnswerNotification(MemberProfile memberProfile, String content, String url) {

        Long memberId = memberService.findMemberFromToken().getMemberProfile().getMemberProfileId();
        if (memberProfile.getMemberProfileId() != memberId) {
            notificationService.sendToClient(memberProfile, Notification.NotificationType.Answer, content, url);
        }
    }
}
