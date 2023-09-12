package WOOMOOL.DevSquad.board.repository;

import WOOMOOL.DevSquad.board.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface BoardRepository extends JpaRepository<Board, Long> {
    @Query(value = "SELECT * FROM Board WHERE DTYPE = :dataType AND board_id = :boardId ", nativeQuery = true)
    Optional<Board> findByBoardIdAndDtype(String dataType, long boardId);
}
