package WOOMOOL.DevSquad.projectboard.entity;

import WOOMOOL.DevSquad.board.entity.Board;
import WOOMOOL.DevSquad.bookmark.entity.Bookmark;
import WOOMOOL.DevSquad.comment.entity.Comment;
import WOOMOOL.DevSquad.level.entity.Level;
import WOOMOOL.DevSquad.member.entity.MemberProfile;
import WOOMOOL.DevSquad.stacktag.entity.StackTag;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
//@DiscriminatorValue("PROJECT")
public class Project extends Board {

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String content;

    // 미정 / 날짜 형식
    @Column(nullable = false)
    private String startDate;

    // 미정 / 날짜 형식
    @Column(nullable = false)
    private String deadline;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(nullable = true)
    private LocalDateTime modifiedAt;

    @Column(nullable = false)
    private Integer recruitNum;

    @Column(nullable = false)
    private int viewCount = 0;

    // Soft Delete
    @Enumerated(value = EnumType.STRING)
    @Column(nullable = false)
    private ProjectStatus projectStatus = ProjectStatus.PROJECT_POSTED;

    @ManyToOne  // N : 1
    @JoinColumn(name = "MEMBER_PROFILE_ID")
    private MemberProfile memberProfile;

    @OneToMany(mappedBy = "board")
    private List<Bookmark> bookmarkList = new ArrayList<>();

    @OneToMany(mappedBy = "board")
    private List<Comment> commentList = new ArrayList<>();

    @ManyToMany
    @JoinTable(name = "projectStackTag",
            joinColumns = @JoinColumn(name = "boardId"),
            inverseJoinColumns = @JoinColumn(name = "stackTagId")
    )
    private Set<StackTag> stackTags;

    public enum ProjectStatus {
        PROJECT_POSTED("게시 중"),
        PROJECT_CLOSED("모집 완료"),
        PROJECT_DELETED("삭제");

        private String status;

        ProjectStatus(String status) {
            this.status = status;
        }
    }
}
