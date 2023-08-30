package WOOMOOL.DevSquad.member.entity;

import WOOMOOL.DevSquad.position.entity.Position;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

import static WOOMOOL.DevSquad.member.entity.MemberProfile.MemberStatus.MEMBER_ACTIVE;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MemberProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberProfileId;

    @Column(nullable = false)
    private String nickname;

    @Column(nullable = false)
    private String profilePicture = "";

    @Column(nullable = false)
    private String githubId = "GithubId를 입력해주세요";

    @Column(nullable = false)
    private String introduction = "자기소개를 입력해주세요";

    @Column(updatable = false)
    private LocalDateTime createAt = LocalDateTime.now();

    @Column
    private LocalDateTime modifiedAt = LocalDateTime.now();

    @Column
    private boolean ListEnroll = false;

    @Column
    private boolean OAuth2User = false;

    @Enumerated(EnumType.STRING)
    private MemberStatus memberStatus = MEMBER_ACTIVE;

    ////////매핑////////
    @OneToOne
    @JoinColumn(name = "memberId")
    private Member member;

    @ManyToMany
    @JoinTable(name = "profilePosition",
            joinColumns = @JoinColumn(name = "memberProfileId"),
            inverseJoinColumns = @JoinColumn(name = "positionId")
    )
    private Set<Position> positions;
    //todo: 나머지 매핑

    public enum MemberStatus {
        MEMBER_ACTIVE("활동중"),
        MEMBER_QUIT("탈퇴함");

        @Getter
        private String status;
        MemberStatus(String status) {
            this.status = status;
        }
    }
}
