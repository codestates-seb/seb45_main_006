package WOOMOOL.DevSquad.chat.repository;

import WOOMOOL.DevSquad.chat.entity.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ChatRoomRepository extends JpaRepository<ChatRoom,Long> {

    // 열려있는 채팅방 찾기
    @Query("SELECT cr FROM ChatRoom cr JOIN cr.memberProfileList mp " +
            "WHERE mp.memberProfileId = :memberId " +
            "AND cr.ChatRoomStatus = 'CHAT_ROOM_OPENED'")
    List<ChatRoom> findByMemberId(@Param("memberId") Long memberId);

    // 두 회원끼리 채팅중인 채팅창 찾기
    @Query("SELECT cr FROM ChatRoom cr JOIN cr.memberProfileList mp " +
            "WHERE mp.memberProfileId IN :membersId " +
            "AND cr.ChatRoomStatus = 'CHAT_ROOM_OPENED' " +
            "GROUP BY cr HAVING COUNT(DISTINCT mp) IN :memberCount")
    Optional<ChatRoom> findByMembers(@Param("membersId") List<Long> membersId, @Param("memberCount") Long memberCount);
}
