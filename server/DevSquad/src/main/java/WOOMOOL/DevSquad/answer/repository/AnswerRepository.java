package WOOMOOL.DevSquad.answer.repository;

import WOOMOOL.DevSquad.answer.entity.Answer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface AnswerRepository extends JpaRepository<Answer, Long> {
    @Query("SELECT a FROM Answer a " +
            "WHERE a.questionBoard.boardId = :boardId AND a.answerStatus = 'ANSWER_POSTED' " +
            "ORDER BY a.createdAt DESC ")
    Page<Answer> findByBoardId(Long boardId, Pageable pageable);
}
