package WOOMOOL.DevSquad.comment.service;

import WOOMOOL.DevSquad.board.repository.BoardRepository;
import WOOMOOL.DevSquad.comment.entity.Comment;
import WOOMOOL.DevSquad.comment.repository.CommentRepository;
import WOOMOOL.DevSquad.member.service.MemberService;
import org.springframework.stereotype.Service;

@Service
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

        return comment;
    }


}
