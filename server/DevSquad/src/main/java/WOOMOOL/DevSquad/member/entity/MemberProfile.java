package WOOMOOL.DevSquad.member.entity;

import WOOMOOL.DevSquad.block.entity.Block;
import WOOMOOL.DevSquad.chat.entity.ChatRoom;
import WOOMOOL.DevSquad.bookmark.entity.Bookmark;
import WOOMOOL.DevSquad.infoboard.entity.InfoBoard;
import WOOMOOL.DevSquad.level.entity.Level;
import WOOMOOL.DevSquad.likes.entity.Likes;
import WOOMOOL.DevSquad.position.entity.Position;
import WOOMOOL.DevSquad.projectboard.entity.Project;
import WOOMOOL.DevSquad.questionboard.entity.QuestionBoard;
import WOOMOOL.DevSquad.studyboard.entity.Study;
import WOOMOOL.DevSquad.stacktag.entity.StackTag;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

import static WOOMOOL.DevSquad.member.entity.MemberProfile.MemberStatus.MEMBER_ACTIVE;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
public class MemberProfile {

    public MemberProfile(String nickname){
        this.nickname = nickname;
    }


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
    private boolean listEnroll = true;


    @Enumerated(EnumType.STRING)
    private MemberStatus memberStatus = MEMBER_ACTIVE;

    ////////매핑////////
    @OneToOne
    @JoinColumn(name = "memberId")
    private Member member;

    @OneToOne(mappedBy = "memberProfile", cascade = CascadeType.PERSIST)
    private Level level;

    @ManyToMany
    @JoinTable(name = "profilePosition",
            joinColumns = @JoinColumn(name = "memberProfileId"),
            inverseJoinColumns = @JoinColumn(name = "positionId")
    )
    private Set<Position> positions;

    @ManyToMany
    @JoinTable(name = "profileStackTag",
            joinColumns = @JoinColumn(name = "memberProfileId"),
            inverseJoinColumns = @JoinColumn(name = "stackTagId")
    )
    private Set<StackTag> stackTags;

    @ManyToMany
    @JoinTable(name = "memberProfileChatRoom",
            joinColumns = @JoinColumn(name = "memberProfileId"),
            inverseJoinColumns = @JoinColumn(name = "chatRoomId")
    )
    private List<ChatRoom> chatRoomList;


    @OneToMany(mappedBy = "memberProfile")
    private List<Block> blockList;

    @OneToMany(mappedBy = "memberProfile")
    private List<Project> projectlist;

    @OneToMany(mappedBy = "memberProfile")
    private List<Study> studyList;

    @OneToMany(mappedBy = "memberProfile")
    private List<InfoBoard> infoBoardList;

    @OneToMany(mappedBy = "memberProfile")
    private List<QuestionBoard> questionBoardList;

    @OneToMany(mappedBy = "memberProfile")
    private List<Bookmark> bookmarkList;

    @OneToMany(mappedBy = "memberProfile")
    private List<Likes> likesList;

    private boolean attendanceChecked;

    public enum MemberStatus {
        MEMBER_ACTIVE("활동중"),
        MEMBER_QUIT("탈퇴함");

        @Getter
        private String status;

        MemberStatus(String status) {
            this.status = status;
        }
    }

    public void addBlockMember(Block block) {
        this.getBlockList().add(block);
    }

    public void addLevel(Level level) {
        this.level = level;
        if (level.getMemberProfile() != this) {
            level.setMemberProfile(this);
        }
    }
    public void addChatRoom(ChatRoom chatRoom){
        this.chatRoomList.add(chatRoom);
    }
}
