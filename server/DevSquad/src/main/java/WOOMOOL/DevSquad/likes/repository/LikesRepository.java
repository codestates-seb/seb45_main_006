package WOOMOOL.DevSquad.likes.repository;

import WOOMOOL.DevSquad.likes.entity.Likes;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LikesRepository extends JpaRepository<Likes, Long> {
    Optional<Likes> findByBoard_BoardIdAndMemberProfile_MemberProfileId(Long boardId, Long memberProfileId);
}
