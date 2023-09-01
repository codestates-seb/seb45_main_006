package WOOMOOL.DevSquad.comment.repository;

import WOOMOOL.DevSquad.comment.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}
