package WOOMOOL.DevSquad.infoboard.repository;

import WOOMOOL.DevSquad.infoboard.entity.InfoBoard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
//정보게시판은 필터가 적기때문에 필터메소드를 다 만듬
public interface InfoBoardRepository extends JpaRepository<InfoBoard, Long> {
    //정보게시판 전체를 최신순으로 정렬
    @Query("SELECT i FROM InfoBoard i WHERE i.infoBoardStatus = 'INFOBOARD_POSTED' ORDER BY i.createdAt DESC ")
    List<InfoBoard> findAllPosted();
    //정보게시판 글의 제목과 내용 한곳이라도 검색어가 포함되어 있으면 최신순으로 정렬
    @Query("SELECT i FROM InfoBoard i WHERE " +
            "(LOWER(i.title) LIKE CONCAT('%',LOWER(:search),'%') " +
            "OR LOWER(i.content) LIKE CONCAT('%',LOWER(:search),'%')) " +
            "AND i.infoBoardStatus = 'INFOBOARD_POSTED' ORDER BY i.createdAt DESC ")
    List<InfoBoard> findByKeyword(String search);
    //정보게시판 카테고리에 따라 최신순으로 정렬
    @Query("SELECT i FROM InfoBoard i WHERE i.category = :category " +
            "AND i.infoBoardStatus = 'INFOBOARD_POSTED' " +
            "ORDER BY i.createdAt DESC ")
    List<InfoBoard> findByCategory(InfoBoard.Category category);
    //정보게시판 카테고리에 따라 글의 제목과 내용 한곳이라도 검색어가 포함되어 있으면 최신순으로 정렬
    @Query("SELECT i FROM InfoBoard i WHERE " +
            "(LOWER(i.title) LIKE CONCAT('%',LOWER(:search),'%') " +
            "OR LOWER(i.content) LIKE CONCAT('%',LOWER(:search),'%')) " +
            "AND i.category = :category " +
            "AND i.infoBoardStatus = 'INFOBOARD_POSTED' ORDER BY i.createdAt DESC ")
    List<InfoBoard> findByCategoryKeyword(InfoBoard.Category category, String search);

}
