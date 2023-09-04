package WOOMOOL.DevSquad.blockmember.entity;

import WOOMOOL.DevSquad.member.entity.MemberProfile;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class BlockMember {

    public BlockMember(Long blockId,String reportContent,String nickname){
        this.blockId = blockId;
        this.reportContent = reportContent;
        this.blockNickname = nickname;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long blockMemberId;

    @Column(nullable = false)
    private Long blockId;

    @Column(nullable = false)
    private String reportContent;

    @Column(nullable = false)
    private String blockNickname;

    @ManyToOne
    @JoinColumn(name = "memberProfileId")
    private MemberProfile memberProfile;

}
