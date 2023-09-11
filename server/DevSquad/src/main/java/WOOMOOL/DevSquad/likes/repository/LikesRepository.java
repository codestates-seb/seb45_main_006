package WOOMOOL.DevSquad.likes.repository;

import WOOMOOL.DevSquad.infoboard.entity.InfoBoard;
import WOOMOOL.DevSquad.likes.entity.Likes;
import WOOMOOL.DevSquad.questionboard.entity.QuestionBoard;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface LikesRepository extends JpaRepository<Likes, Long> {
    Optional<Likes> findByBoard_BoardIdAndMemberProfile_MemberProfileId(Long boardId, Long memberProfileId);
    @Query("SELECT q FROM QuestionBoard q JOIN Likes l ON q.boardId = l.board.boardId " +
            "WHERE l.memberProfile.memberProfileId = :memberProfileId " +
            "AND q.questionBoardStatus = 'QUESTIONBOARD_POSTED' ")
    Page<QuestionBoard> findQuestionBoardByLikedMemberId(Long memberProfileId, Pageable pageable);
    @Query("SELECT i FROM InfoBoard i JOIN Likes l ON i.boardId = l.board.boardId " +
            "WHERE l.memberProfile.memberProfileId = :memberProfileId " +
            "AND i.infoBoardStatus = 'INFOBOARD_POSTED' ")
    Page<InfoBoard> findInfoBoardByLikedMemberId(Long memberProfileId, Pageable pageable);
}
