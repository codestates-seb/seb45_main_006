package WOOMOOL.DevSquad.bookmark.repository;

import WOOMOOL.DevSquad.bookmark.entity.Bookmark;
import WOOMOOL.DevSquad.infoboard.entity.InfoBoard;
import WOOMOOL.DevSquad.projectboard.entity.Project;
import WOOMOOL.DevSquad.questionboard.entity.QuestionBoard;
import WOOMOOL.DevSquad.studyboard.entity.Study;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {

    @Query("SELECT b FROM Bookmark b " +
            "WHERE b.memberProfile.memberProfileId = :memberProfileId " +
            "and b.board.boardId = :boardId")
    Bookmark findByMemberProfileAndBoard(Long memberProfileId, Long boardId);

    // 멤버 아이디로 북마크한 프로젝트 조회
    @Query("SELECT p FROM Project p JOIN Bookmark b ON p.boardId = b.board.boardId " +
            "WHERE b.memberProfile.memberProfileId = :memberProfileId " +
            "And p.projectStatus != 'PROJECT_DELETED' ")
    Page<Project> findProjectByBookmarkedMemberId(Long memberProfileId, Pageable pageable);

    // 멤버 아이디로 북마크한 스터디 조회
    @Query("SELECT s FROM Study s JOIN Bookmark b ON s.boardId = b.board.boardId " +
            "WHERE b.memberProfile.memberProfileId = :memberProfileId " +
            "And s.studyStatus != 'STUDY_DELETED' ")
    Page<Study> findStudyByBookmarkedMemberId(Long memberProfileId, Pageable pageable);

    // 멤버 아이디로 북마크한 정보 게시판 조회
    @Query("SELECT i FROM InfoBoard i JOIN Bookmark b ON i.boardId = b.board.boardId " +
            "WHERE b.memberProfile.memberProfileId = :memberProfileId " +
            "And i.infoBoardStatus = 'INFOBOARD_POSTED' ")
    Page<InfoBoard> findInfoByBookmarkedMemberId(Long memberProfileId, Pageable pageable);

    // 멤버 아이디로 북마크한 질문 게시판 조회
    @Query("SELECT q FROM QuestionBoard q JOIN Bookmark b ON q.boardId = b.board.boardId " +
            "WHERE b.memberProfile.memberProfileId = :memberProfileId " +
            "And q.questionBoardStatus = 'QUESTIONBOARD_POSTED' ")
    Page<QuestionBoard> findQuestionByBookmarkedMemberId(Long memberProfileId, Pageable pageable);
}
