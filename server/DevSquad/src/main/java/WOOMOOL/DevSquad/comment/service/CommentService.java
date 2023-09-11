package WOOMOOL.DevSquad.comment.service;

import WOOMOOL.DevSquad.answer.repository.AnswerRepository;
import WOOMOOL.DevSquad.answer.service.AnswerService;
import WOOMOOL.DevSquad.board.repository.BoardRepository;
import WOOMOOL.DevSquad.comment.entity.Comment;
import WOOMOOL.DevSquad.comment.repository.CommentRepository;
import WOOMOOL.DevSquad.exception.BusinessLogicException;
import WOOMOOL.DevSquad.exception.ExceptionCode;
import WOOMOOL.DevSquad.member.service.MemberService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CommentService {
    private final CommentRepository commentRepository;
    private final BoardRepository boardRepository;
    private final AnswerService answerService;
    private final MemberService memberService;

    public CommentService(CommentRepository commentRepository,
                          BoardRepository boardRepository,
                          AnswerService answerService,
                          MemberService memberService) {
        this.commentRepository = commentRepository;
        this.boardRepository = boardRepository;
        this.answerService = answerService;
        this.memberService = memberService;
    }

    public Comment createComment(long boardId, Comment comment) {
        comment.setBoard(boardRepository.findById(boardId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.BOARD_NOT_FOUND)));
        comment.setMemberProfile(memberService.findMemberFromToken().getMemberProfile());
        comment.setAnswer(null);
        if(comment.getParent().getCommentId()==null)
            comment.setParent(null);
        else {
            commentRepository.findById(comment.getParent().getCommentId()).orElseThrow(() -> new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
            comment.setBoard(null);
        }


        return commentRepository.save(comment);
    }
    public Comment createAnswerComment(Comment comment) {
        comment.setAnswer(answerService.findVerifiedAnswer(comment.getAnswer().getAnswerId()));
        comment.setMemberProfile(memberService.findMemberFromToken().getMemberProfile());
        if(comment.getParent().getCommentId()==null)
            comment.setParent(null);
        else {
            commentRepository.findById(comment.getParent().getCommentId()).orElseThrow(() -> new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
            comment.setAnswer(null);
        }

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
        return commentRepository.findByBoardId(boardId, PageRequest.of(page, size));
    }
    public Page<Comment> selectCommentByAnswerId(long answerId, int page, int size) {
        return commentRepository.findByAnswerId(answerId, PageRequest.of(page, size));
    }

    public Comment findVerifiedComment(Long commentId) {
        Optional<Comment> comment = commentRepository.findById(commentId);
        Comment findComment = comment.orElseThrow(()-> new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));

        return findComment;
    }

    public void verifiedIsWriter(Long currentId ,Long writerId) {
        if(currentId!=writerId)
            throw new BusinessLogicException(ExceptionCode.FORBIDDEN);
    }

    public List<Comment> findCommentList() {
        return commentRepository.findAll();
    }
}
