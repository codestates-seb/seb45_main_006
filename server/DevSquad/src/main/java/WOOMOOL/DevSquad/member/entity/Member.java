package WOOMOOL.DevSquad.member.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;


    @Column(nullable = false)
    private String nickname;

    @OneToOne(mappedBy = "member",cascade = CascadeType.ALL)
    private MemberProfile memberProfile;

    public void addProfile(MemberProfile memberProfile){
        this.memberProfile = memberProfile;
        if(memberProfile.getMember() != this){
            memberProfile.setMember(this);
        }

    }



}
