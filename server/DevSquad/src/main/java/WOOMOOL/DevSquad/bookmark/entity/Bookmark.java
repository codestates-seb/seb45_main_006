package WOOMOOL.DevSquad.bookmark.entity;

import WOOMOOL.DevSquad.board.entity.Board;
import WOOMOOL.DevSquad.member.entity.MemberProfile;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Bookmark {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookmarkId;

    @ManyToOne
    @JoinColumn(name = "MEMBER_PROFILE_ID")
//    @OnDelete(action = OnDeleteAction.CASCADE)  // 멤버 프로필 삭제 -> 같이 삭제
    private MemberProfile memberProfile;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "BOARD_ID")
//    @OnDelete(action = OnDeleteAction.CASCADE)
    private Board board;
}
