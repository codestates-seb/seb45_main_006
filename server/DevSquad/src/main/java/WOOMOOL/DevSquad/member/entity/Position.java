package WOOMOOL.DevSquad.member.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Position {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long positionId;

    @Column(nullable = false)
    private String positionName;

    @ManyToOne
    @JoinColumn(name = "memberProfileId")
    private MemberProfile memberProfile;
}
