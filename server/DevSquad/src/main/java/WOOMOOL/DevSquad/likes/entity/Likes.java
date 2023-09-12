package WOOMOOL.DevSquad.likes.entity;

import WOOMOOL.DevSquad.board.entity.Board;
import WOOMOOL.DevSquad.member.entity.MemberProfile;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Likes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long likesId;

    @ManyToOne
    @JoinColumn(name = "board_id")
    private Board board;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private MemberProfile memberProfile;
}
