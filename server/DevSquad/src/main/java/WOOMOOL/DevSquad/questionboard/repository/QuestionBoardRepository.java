package WOOMOOL.DevSquad.questionboard.repository;

import WOOMOOL.DevSquad.infoboard.entity.InfoBoard;
import WOOMOOL.DevSquad.questionboard.entity.QuestionBoard;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;
//정보게시판은 필터가 적기때문에 필터메소드를 다 만듬
public interface QuestionBoardRepository extends JpaRepository<QuestionBoard, Long> {
    //사용자 id로 검색
    @Query("SELECT q FROM QuestionBoard q WHERE q.questionBoardStatus = 'QUESTIONBOARD_POSTED' AND q.memberProfile.memberProfileId = :memberProfileId ORDER BY q.createdAt DESC")
    List<QuestionBoard> findAllByMemberProfile(Long memberProfileId);
    // 페이지네이션
    @Query("SELECT q FROM QuestionBoard q WHERE q.questionBoardStatus = 'QUESTIONBOARD_POSTED' AND q.memberProfile.memberProfileId = :memberProfileId ORDER BY q.createdAt DESC")
    Page<QuestionBoard> findAllByMemberProfile(Long memberProfileId, Pageable pageable);
    // 특정 멤버가 좋아요 10개 넘는 질문게시글 찾기
    @Query("SELECT q FROM QuestionBoard q WHERE q.questionBoardStatus = 'QUESTIONBOARD_POSTED' AND q.memberProfile.memberProfileId = :memberProfileId AND q.likesList.size >= 10")
    List<QuestionBoard> findAllBy10MoreLikedByMemberProfile(Long memberProfileId);
    //정보게시판 전체를 최신순으로 정렬
    @Query("SELECT q FROM QuestionBoard q WHERE q.questionBoardStatus = 'QUESTIONBOARD_POSTED' ORDER BY q.createdAt DESC ")
    List<QuestionBoard> findAllPosted();
    //정보게시판 글의 제목과 내용 한곳이라도 검색어가 포함되어 있으면 최신순으로 정렬
    @Query("SELECT q FROM QuestionBoard q WHERE " +
            "(LOWER(q.title) LIKE CONCAT('%',LOWER(:search),'%') " +
            "OR LOWER(q.content) LIKE CONCAT('%',LOWER(:search),'%')) " +
            "AND q.questionBoardStatus = 'QUESTIONBOARD_POSTED' ORDER BY q.createdAt DESC ")
    List<QuestionBoard> findByKeyword(String search);
    //좋아요 갯수가 10개 이상인 정보게시판 목록
    @Query("SELECT q FROM  QuestionBoard q WHERE SIZE(q.likesList) >= 10 " +
            "AND q.questionBoardStatus = 'QUESTIONBOARD_POSTED' AND q.createdAt >= :oneWeekMinus " +
            "ORDER BY SIZE(q.likesList) DESC ")
    List<QuestionBoard> findHottestQuestionBoard(LocalDateTime oneWeekMinus);

}
