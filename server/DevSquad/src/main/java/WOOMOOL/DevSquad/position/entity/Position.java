package WOOMOOL.DevSquad.position.entity;

import WOOMOOL.DevSquad.member.entity.MemberProfile;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.*;

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

    @ManyToMany(mappedBy = "positions")
    private Set<MemberProfile> memberProfiles = new HashSet<>();

}
