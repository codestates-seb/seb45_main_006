package WOOMOOL.DevSquad.member.entity;

import WOOMOOL.DevSquad.block.entity.Block;
import WOOMOOL.DevSquad.chat.entity.ChatRoom;
import WOOMOOL.DevSquad.bookmark.entity.Bookmark;
import WOOMOOL.DevSquad.infoboard.entity.InfoBoard;
import WOOMOOL.DevSquad.level.entity.Level;
import WOOMOOL.DevSquad.likes.entity.Likes;
import WOOMOOL.DevSquad.notification.entity.Notification;
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

    public MemberProfile(String nickname) {
        this.nickname = nickname;
    }
    public MemberProfile(Long memberId){
        this.memberProfileId = memberId;
    }


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberProfileId;

    @Column(nullable = false)
    private String nickname;

    @Column(nullable = false)
    private String profilePicture = "";

    @Column(nullable = false)
    private String githubId = "";

    @Column(nullable = false)
    private String introduction = "";

    @Column(updatable = false)
    private LocalDateTime createAt = LocalDateTime.now();

    @Column
    private LocalDateTime modifiedAt;

    @Column
    private boolean listEnroll = true;


    @Enumerated(EnumType.STRING)
    private MemberStatus memberStatus = MEMBER_ACTIVE;

    ////////매핑////////
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "memberId")
    private Member member;

    @OneToOne(fetch = FetchType.LAZY,cascade = CascadeType.PERSIST)
    @JoinColumn(name = "levelId")
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

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "memberProfileChatRoom",
            joinColumns = @JoinColumn(name = "memberProfileId"),
            inverseJoinColumns = @JoinColumn(name = "chatRoomId")
    )
    private List<ChatRoom> chatRoomList;


    @OneToMany(mappedBy = "memberProfile", fetch = FetchType.LAZY)
    private List<Block> blockList;

    @OneToMany(mappedBy = "memberProfile", fetch = FetchType.LAZY)
    private List<Project> projectlist;

    @OneToMany(mappedBy = "memberProfile", fetch = FetchType.LAZY)
    private List<Study> studyList;

    @OneToMany(mappedBy = "memberProfile", fetch = FetchType.LAZY)
    private List<InfoBoard> infoBoardList;

    @OneToMany(mappedBy = "memberProfile", fetch = FetchType.LAZY)
    private List<QuestionBoard> questionBoardList;

    @OneToMany(mappedBy = "memberProfile", fetch = FetchType.LAZY)
    private List<Bookmark> bookmarkList;

    @OneToMany(mappedBy = "memberProfile", fetch = FetchType.LAZY)
    private List<Likes> likesList;

    @OneToMany(mappedBy = "receiver", fetch = FetchType.LAZY)
    private List<Notification> notificationList;

    private boolean attendanceChecked;

    // 게시글 경험치용 계수
    private int boardExp = 1;

    public enum MemberStatus {
        MEMBER_ACTIVE("활동중"),
        MEMBER_QUIT("탈퇴함");

        @Getter
        private String status;

        MemberStatus(String status) {
            this.status = status;
        }
    }
    public void addLevel(Level level) {
        this.level = level;
        level.setMemberProfile(this);
    }

    public void addBlockMember(Block block) {
        this.getBlockList().add(block);
    }

    public void addChatRoom(ChatRoom chatRoom) {
        this.chatRoomList.add(chatRoom);
    }
}
