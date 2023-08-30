package WOOMOOL.DevSquad.infoboard.repository;

import WOOMOOL.DevSquad.infoboard.entity.InfoBoard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface InfoBoardRepository extends JpaRepository<InfoBoard, Long> {
    @Query("SELECT i FROM InfoBoard i WHERE i.infoBoardStatus = 'INFOBOARD_POSTED' ORDER BY i.createdAt DESC ")
    List<InfoBoard> findAllPosted();
    @Query("SELECT i FROM InfoBoard i WHERE " +
            "(LOWER(i.title) LIKE CONCAT('%',LOWER(:search),'%') " +
            "OR LOWER(i.content) LIKE CONCAT('%',LOWER(:search),'%')) " +
            "AND i.infoBoardStatus = 'INFOBOARD_POSTED' ORDER BY i.createdAt DESC ")
    List<InfoBoard> findByKeyword(String search);
    @Query("SELECT i FROM InfoBoard i WHERE i.category = :category AND i.infoBoardStatus = 'INFOBOARD_POSTED' ORDER BY i.createdAt DESC ")
    List<InfoBoard> findByCategory(InfoBoard.Category category);
    @Query("SELECT i FROM InfoBoard i WHERE " +
            "(LOWER(i.title) LIKE CONCAT('%',LOWER(:search),'%') " +
            "OR LOWER(i.content) LIKE CONCAT('%',LOWER(:search),'%')) " +
            "AND i.category = :category " +
            "AND i.infoBoardStatus = 'INFOBOARD_POSTED' ORDER BY i.createdAt DESC ")
    List<InfoBoard> findByCategoryKeyword(InfoBoard.Category category, String search);

}
