package WOOMOOL.DevSquad.comment.service;

import WOOMOOL.DevSquad.answer.entity.Answer;
import WOOMOOL.DevSquad.answer.service.AnswerService;
import WOOMOOL.DevSquad.block.entity.Block;
import WOOMOOL.DevSquad.board.entity.Board;
import WOOMOOL.DevSquad.board.repository.BoardRepository;
import WOOMOOL.DevSquad.comment.entity.Comment;
import WOOMOOL.DevSquad.comment.repository.CommentRepository;
import WOOMOOL.DevSquad.exception.BusinessLogicException;
import WOOMOOL.DevSquad.exception.ExceptionCode;
import WOOMOOL.DevSquad.infoboard.entity.InfoBoard;
import WOOMOOL.DevSquad.infoboard.repository.InfoBoardRepository;
import WOOMOOL.DevSquad.level.service.LevelService;
import WOOMOOL.DevSquad.member.entity.Member;
import WOOMOOL.DevSquad.member.entity.MemberProfile;
import WOOMOOL.DevSquad.member.service.MemberService;
import WOOMOOL.DevSquad.notification.entity.Notification;
import WOOMOOL.DevSquad.notification.service.NotificationService;
import WOOMOOL.DevSquad.projectboard.entity.Project;
import WOOMOOL.DevSquad.projectboard.repository.ProjectRepository;
import WOOMOOL.DevSquad.questionboard.entity.QuestionBoard;
import WOOMOOL.DevSquad.questionboard.repository.QuestionBoardRepository;
import WOOMOOL.DevSquad.studyboard.entity.Study;
import WOOMOOL.DevSquad.studyboard.repository.StudyRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
@RequiredArgsConstructor
@Transactional
@Slf4j
public class CommentService {
    private final CommentRepository commentRepository;
    private final BoardRepository boardRepository;
    private final AnswerService answerService;
    private final MemberService memberService;

    private final LevelService levelService;
    private final NotificationService notificationService;
    private final ProjectRepository projectRepository;
    private final StudyRepository studyRepository;
    private final InfoBoardRepository infoBoardRepository;

    public Comment createComment(long boardId, Comment comment) {

        comment.setBoard(boardRepository.findById(boardId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.BOARD_NOT_FOUND)));
        comment.setMemberProfile(memberService.findMemberFromToken().getMemberProfile());
        comment.setAnswer(null);

        MemberProfile memberProfile;
        String content;
        String url;

        if (comment.getParent().getCommentId() == null) {
            comment.setParent(null);

            // 게시판 쓴 사람 정보
            memberProfile = findBoardOwner(boardId);
            content = "게시글에 댓글이 달렸습니다.";
            url = String.valueOf(boardId);

        } else {

            Comment parentComment = commentRepository.findById(comment.getParent().getCommentId()).orElseThrow(() -> new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
            comment.setBoard(null);

            // 댓글 쓴 사람 정보
            memberProfile = parentComment.getMemberProfile();
            content = "댓글에 대댓글이 달렸습니다.";
            url = String.valueOf(comment.getParent().getCommentId());
        }
        // 자신 외의 사람이 댓글을 달았을 때만 알림 보내기
        sendCommentNotification(memberProfile,content,url);

        levelService.getExpFromActivity(memberService.findMemberFromToken().getMemberProfile());


        return commentRepository.save(comment);
    }

    public Comment createAnswerComment(Comment comment) {
        Answer answer = answerService.findVerifiedAnswer(comment.getAnswer().getAnswerId());
        comment.setAnswer(answer);
        comment.setMemberProfile(memberService.findMemberFromToken().getMemberProfile());

        MemberProfile memberProfile;
        String content;
        String url;

        if (comment.getParent().getCommentId() == null) {
            comment.setParent(null);

            // 답변 쓴 사람 정보
            memberProfile = answer.getMemberProfile();
            content = "답변에 댓글이 달렸습니다.";
            Long boardId = answer.getQuestionBoard().getBoardId();
            url = String.valueOf(boardId);

        } else {
            Comment parentComment = commentRepository.findById(comment.getParent().getCommentId()).orElseThrow(() -> new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
            comment.setAnswer(null);

            // 댓글 쓴 사람 정보
            memberProfile = parentComment.getMemberProfile();
            content = "댓글에 대댓글이 달렸습니다.";
            url = String.valueOf(comment.getCommentId());
        }

        // 자신 외의 사람이 댓글을 달았을 때만 알림 보내기
        sendCommentNotification(memberProfile,content,url);

        return commentRepository.save(comment);
    }

    public Comment updateComment(Comment comment) {
        Comment findComment = findVerifiedComment(comment.getCommentId());

        verifiedIsWriter(memberService.findMemberFromToken().getMemberId(), findComment.getMemberProfile().getMemberProfileId());

        Optional.ofNullable(comment.getContent()).ifPresent(content -> findComment.setContent(content));
        findComment.setModifiedAt(LocalDateTime.now());

        return commentRepository.save(findComment);
    }

    public void deleteComment(Long commentId) {
        Comment findComment = findVerifiedComment(commentId);

        verifiedIsWriter(memberService.findMemberFromToken().getMemberId(), findComment.getMemberProfile().getMemberProfileId());

        findComment.setCommentStatus(Comment.CommentStatus.COMMENT_DELETED);

        commentRepository.save(findComment);
    }

    public Page<Comment> selectCommentByBoardId(long boardId, int page, int size) {
        List<Comment> commentList = commentRepository.findByBoardId(boardId);
        commentList = removeBlockUserBoard(commentList);
        List<Comment> pagingList = commentList.subList(page * size, Math.min(page * size + size, commentList.size()));
        Page<Comment> result = new PageImpl<>(pagingList, PageRequest.of(page, size), commentList.size());
        return result;
    }

    public Page<Comment> selectCommentByAnswerId(long answerId, int page, int size) {
        List<Comment> commentList = commentRepository.findByAnswerId(answerId);
        commentList = removeBlockUserBoard(commentList);
        List<Comment> pagingList = commentList.subList(page * size, Math.min(page * size + size, commentList.size()));
        Page<Comment> result = new PageImpl<>(pagingList, PageRequest.of(page, size), commentList.size());
        return result;
    }

    public Comment findVerifiedComment(Long commentId) {
        Optional<Comment> comment = commentRepository.findById(commentId);
        Comment findComment = comment.orElseThrow(() -> new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));

        return findComment;
    }

    public List<Comment> removeBlockUserBoard(List<Comment> commentList) {
        if (SecurityContextHolder.getContext().getAuthentication().getName().equals("anonymousUser"))
            return commentList;
        List<Block> blockList = memberService.findMemberFromToken().getMemberProfile().getBlockList();
        List<Comment> result = commentList.stream()
                .filter(comment -> !blockList.stream()
                        .anyMatch(block -> block.getBlockMemberId() == comment.getMemberProfile().getMemberProfileId()))
                .collect(Collectors.toList());
        return result;
    }

    public void verifiedIsWriter(Long currentId, Long writerId) {
        if (currentId != writerId)
            throw new BusinessLogicException(ExceptionCode.FORBIDDEN);
    }

    public List<Comment> findCommentList() {
        return commentRepository.findAll();
    }

    private MemberProfile findBoardOwner(Long boardId) {

        Optional<Project> project = projectRepository.findById(boardId);
        Optional<Study> study = studyRepository.findById(boardId);
        Optional<InfoBoard> infoBoard = infoBoardRepository.findById(boardId);

        MemberProfile memberProfile;

        if (project.isPresent()) {
            memberProfile = project.get().getMemberProfile();
        } else if (study.isPresent()) {
            memberProfile = study.get().getMemberProfile();
        } else memberProfile = infoBoard.get().getMemberProfile();

        return memberProfile;
    }

    private void sendCommentNotification(MemberProfile memberProfile, String content, String url){

        Long memberId = memberService.findMemberFromToken().getMemberProfile().getMemberProfileId();
        if (memberProfile.getMemberProfileId() != memberId) {
            notificationService.sendToClient(memberProfile, Notification.NotificationType.Comment,content,url);
        }
    }
}
