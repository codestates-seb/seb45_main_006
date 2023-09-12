package WOOMOOL.DevSquad.comment.repository;

import WOOMOOL.DevSquad.comment.entity.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    @Query("SELECT c FROM Comment c WHERE c.board.boardId = :boardId ORDER BY c.createdAt DESC ")
    Page<Comment> findByBoardId(Long boardId, Pageable pageable);

    @Query("SELECT c FROM Comment c WHERE c.answer.answerId = :answerId ORDER BY c.createdAt DESC ")
    Page<Comment> findByAnswerId(Long answerId, Pageable pageable);

    @Query("SELECT c FROM Comment c WHERE c.memberProfile.memberProfileId = :memberProfileId")
    List<Comment> findByMemberId(Long memberProfileId);

}