package WOOMOOL.DevSquad.comment.service;

import WOOMOOL.DevSquad.board.repository.BoardRepository;
import WOOMOOL.DevSquad.comment.entity.Comment;
import WOOMOOL.DevSquad.comment.repository.CommentRepository;
import WOOMOOL.DevSquad.exception.BusinessLogicException;
import WOOMOOL.DevSquad.exception.ExceptionCode;
import WOOMOOL.DevSquad.member.service.MemberService;
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
    private final MemberService memberService;

    public CommentService(CommentRepository commentRepository,
                          BoardRepository boardRepository,
                          MemberService memberService) {
        this.commentRepository = commentRepository;
        this.boardRepository = boardRepository;
        this.memberService = memberService;
    }

    public Comment createComment(Long boardId, Comment comment) {
        comment.setBoard(boardRepository.findById(boardId).get());
        comment.setMemberProfile(memberService.findMemberFromToken().getMemberProfile());
        if(comment.getParent().getCommentId()==null)
            comment.setParent(null);
        else
            commentRepository.findById(comment.getParent().getCommentId()).orElseThrow(()-> new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));


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
