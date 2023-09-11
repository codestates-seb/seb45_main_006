package WOOMOOL.DevSquad.bookmark.repository;

import WOOMOOL.DevSquad.bookmark.entity.Bookmark;
import WOOMOOL.DevSquad.projectboard.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {

    @Query("SELECT b FROM Bookmark b WHERE b.memberProfile.memberProfileId = :memberProfileId and b.board.boardId = :boardId")
    Bookmark findByMemberProfileAndBoard(Long memberProfileId, Long boardId);

//    @Query("SELECT b FROM Bookmark b WHERE b.memberProfile.memberProfileId = :memberProfileId")
//    List<Bookmark> findByMemberProfileId(Long memberProfileId);

//    @Query(value = "SELECT * FROM PROJECT JOIN BOOKMARK ON PROJECT.BOARD_ID = BOOKMARK.BOARD_ID WHERE BOOKMARK.MEMBER_PROFILE_ID = :memberProfileId", nativeQuery = true)
//    List<Project> findProjectByBoardId(Long memberProfileId);

//    @Query("SELECT Project FROM Bookmark b JOIN Project p ON b.board.boardId = p.boardId WHERE b.memberProfile.memberProfileId = :memberProfileId" /*, nativeQuery = true*/)
//    List<Project> findProjectByBoardId(@Param("memberProfileId") Long memberProfileId);
}
