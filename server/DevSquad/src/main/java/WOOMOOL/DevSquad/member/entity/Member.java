package WOOMOOL.DevSquad.member.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Member {

    // oAuth2로 생성된 회원
    public Member(String email){
        this.email = email;
        this.nickname = "";
        this.memberType = MemberType.OAUTH2;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @Column(nullable = false)
    private String email;

    @Column
    private String password;

    @Column(nullable = false)
    private String nickname;

    @Enumerated(EnumType.STRING)
    private MemberType memberType = MemberType.REGULAR;

    @ElementCollection(fetch = FetchType.EAGER)
    List<String> roles = new ArrayList<>();

    @OneToOne(mappedBy = "member",cascade = CascadeType.ALL)
    private MemberProfile memberProfile;

    public void addProfile(MemberProfile memberProfile){
        this.memberProfile = memberProfile;
        if(memberProfile.getMember() != this){
            memberProfile.setMember(this);
        }
    }
    // 일반 회원인지 oAuth2 회원인지
    public enum MemberType{
        REGULAR,
        OAUTH2;
    }

}
