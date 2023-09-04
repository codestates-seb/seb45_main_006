package WOOMOOL.DevSquad.board.repository;

import WOOMOOL.DevSquad.board.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardRepository extends JpaRepository<Board, Long> {
}
