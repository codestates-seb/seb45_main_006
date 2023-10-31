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
    private int currentExp = 0;
    @Column
    private int maxExp = 0;

    @OneToOne(mappedBy = "level")
    private MemberProfile memberProfile;

}
