package WOOMOOL.DevSquad.questionboard.repository;

import WOOMOOL.DevSquad.questionboard.entity.QuestionBoard;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
//정보게시판은 필터가 적기때문에 필터메소드를 다 만듬
public interface QuestionBoardRepository extends JpaRepository<QuestionBoard, Long> {
    //사용자 id로 검색
    @Query("SELECT q FROM QuestionBoard q WHERE q.questionBoardStatus = 'QUESTIONBOARD_POSTED' AND q.memberProfile.memberProfileId = :memberProfileId ORDER BY q.createdAt DESC")
    List<QuestionBoard> findAllByMemberProfile(Long memberProfileId);
    // 페이지네이션
    @Query("SELECT q FROM QuestionBoard q WHERE q.questionBoardStatus = 'QUESTIONBOARD_POSTED' AND q.memberProfile.memberProfileId = :memberProfileId ORDER BY q.createdAt DESC")
    Page<QuestionBoard> findAllByMemberProfile(Long memberProfileId, Pageable pageable);
    //정보게시판 전체를 최신순으로 정렬
    @Query("SELECT q FROM QuestionBoard q WHERE q.questionBoardStatus = 'QUESTIONBOARD_POSTED' ORDER BY q.createdAt DESC ")
    Page<QuestionBoard> findAllPosted(Pageable pageable);
    //정보게시판 글의 제목과 내용 한곳이라도 검색어가 포함되어 있으면 최신순으로 정렬
    @Query("SELECT q FROM QuestionBoard q WHERE " +
            "(LOWER(q.title) LIKE CONCAT('%',LOWER(:search),'%') " +
            "OR LOWER(q.content) LIKE CONCAT('%',LOWER(:search),'%')) " +
            "AND q.questionBoardStatus = 'QUESTIONBOARD_POSTED' ORDER BY q.createdAt DESC ")
    Page<QuestionBoard> findByKeyword(String search, Pageable pageable);

}
