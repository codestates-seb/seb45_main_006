package WOOMOOL.DevSquad.answer.repository;

import WOOMOOL.DevSquad.answer.entity.Answer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AnswerRepository extends JpaRepository<Answer, Long> {
    @Query("SELECT a FROM Answer a " +
            "WHERE a.questionBoard.boardId = :boardId AND a.answerStatus = 'ANSWER_POSTED' " +
            "ORDER BY a.createdAt DESC ")
    List<Answer> findByBoardId(Long boardId);

    // 특정 회원이 쓴 채택된 질문 찾기
    @Query("SELECT a FROM Answer a WHERE a.memberProfile.memberProfileId = :memberProfileId AND a.isAccepted = true")
    List<Answer> findByAcceptedByMemberProfileId(Long memberProfileId);
}
