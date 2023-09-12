package WOOMOOL.DevSquad.block.entity;

import WOOMOOL.DevSquad.member.entity.MemberProfile;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Block {

    public Block(Long blockMemberId, String reportContent, String nickname){
        this.blockMemberId = blockMemberId;
        this.reportContent = reportContent;
        this.blockNickname = nickname;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long blockId;

    @Column(nullable = false)
    private Long blockMemberId;

    @Column(nullable = false)
    private String reportContent;

    @Column(nullable = false)
    private String blockNickname;

    @ManyToOne
    @JoinColumn(name = "memberProfileId")
    private MemberProfile memberProfile;

}
