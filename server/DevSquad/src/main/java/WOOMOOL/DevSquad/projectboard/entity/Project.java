package WOOMOOL.DevSquad.projectboard.entity;

import WOOMOOL.DevSquad.board.entity.Board;
import WOOMOOL.DevSquad.member.entity.MemberProfile;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter @Setter
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
    private boolean recruitStatus = false;

    @Column(nullable = false)
    private int viewCount = 0;

    // Soft Delete
    @Enumerated(value = EnumType.STRING)
    @Column(nullable = false)
    private ProjectStatus projectStatus = ProjectStatus.PROJECT_POSTED;

    @ManyToOne  // N : 1
    @JoinColumn(name = "MEMBER_PROFILE_ID")
    private MemberProfile memberProfile;

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
