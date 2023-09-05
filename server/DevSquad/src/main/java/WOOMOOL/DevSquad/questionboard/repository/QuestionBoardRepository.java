package WOOMOOL.DevSquad.questionboard.repository;

import WOOMOOL.DevSquad.questionboard.entity.QuestionBoard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
//정보게시판은 필터가 적기때문에 필터메소드를 다 만듬
public interface QuestionBoardRepository extends JpaRepository<QuestionBoard, Long> {
    //사용자 id로 검색
    @Query("SELECT i FROM QuestionBoard i WHERE i.questionBoardStatus = 'QUESTIONBOARD_POSTED' AND i.memberProfile.memberProfileId = :memberProfileId ORDER BY i.createdAt DESC")
    List<QuestionBoard> findAllByMemberProfile(Long memberProfileId);
    //정보게시판 전체를 최신순으로 정렬
    @Query("SELECT i FROM QuestionBoard i WHERE i.questionBoardStatus = 'QUESTIONBOARD_POSTED' ORDER BY i.createdAt DESC ")
    List<QuestionBoard> findAllPosted();
    //정보게시판 글의 제목과 내용 한곳이라도 검색어가 포함되어 있으면 최신순으로 정렬
    @Query("SELECT i FROM QuestionBoard i WHERE " +
            "(LOWER(i.title) LIKE CONCAT('%',LOWER(:search),'%') " +
            "OR LOWER(i.content) LIKE CONCAT('%',LOWER(:search),'%')) " +
            "AND i.questionBoardStatus = 'QUESTIONBOARD_POSTED' ORDER BY i.createdAt DESC ")
    List<QuestionBoard> findByKeyword(String search);
}
