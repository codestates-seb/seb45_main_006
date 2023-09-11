package WOOMOOL.DevSquad.likes.repository;

import WOOMOOL.DevSquad.infoboard.entity.InfoBoard;
import WOOMOOL.DevSquad.likes.entity.Likes;
import WOOMOOL.DevSquad.questionboard.entity.QuestionBoard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface LikesRepository extends JpaRepository<Likes, Long> {
    Optional<Likes> findByBoard_BoardIdAndMemberProfile_MemberProfileId(Long boardId, Long memberProfileId);
    @Query("SELECT q FROM QuestionBoard q JOIN Likes l ON q.boardId = l.board.boardId " +
            "WHERE l.memberProfile.memberProfileId = :memberProfileId " +
            "AND q.questionBoardStatus = 'QUESTIONBOARD_POSTED' " +
            "ORDER BY q.createdAt DESC ")
    List<QuestionBoard> findQuestionBoardByLikedMemberId(Long memberProfileId);
    @Query("SELECT i FROM InfoBoard i JOIN Likes l ON i.boardId = l.board.boardId " +
            "WHERE l.memberProfile.memberProfileId = :memberProfileId " +
            "AND i.infoBoardStatus = 'INFOBOARD_POSTED' " +
            "ORDER BY  i.createdAt DESC ")
    List<InfoBoard> findInfoBoardByLikedMemberId(Long memberProfileId);
}
