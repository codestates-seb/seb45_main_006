package WOOMOOL.DevSquad.level.entity;

import WOOMOOL.DevSquad.member.entity.MemberProfile;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Level {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long levelId;

    @Column
    private String grade = "개구리알";
    @Column
    private int currentExp;
    @Column
    private int maxExp;
    @Column
    private String levelExplain = "좋아요 3번과 댓글 1회 작성 시 다음 단계로 올라갈 수 있어요!";

    @OneToOne()
    @JoinColumn(name = "memberProfileId")
    private MemberProfile memberProfile;
}
