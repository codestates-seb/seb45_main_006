package WOOMOOL.DevSquad.answer.repository;

import WOOMOOL.DevSquad.answer.entity.Answer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnswerRepository extends JpaRepository<Answer, Long> {
}
