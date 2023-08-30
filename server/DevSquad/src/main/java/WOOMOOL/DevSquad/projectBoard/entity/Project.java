package WOOMOOL.DevSquad.projectBoard.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter @Setter
public class Project extends Board {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long pjBoardId;

//    private Long pjBoardId = getBoardId();

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
    private int recruitNum;

    @Column(nullable = false)
    private boolean recruitStatus = false;

    @Column(nullable = false)
    private int viewCount = 0;

    // Soft Delete
    @Enumerated(value = EnumType.STRING)
    @Column(nullable = false)
    private ProjectStatus projectStatus = ProjectStatus.PROJECT_POSTED;

    public enum ProjectStatus {
        PROJECT_POSTED("게시 중"),
        PROJECT_CLOSED("모집 완료"),
        PROJECT_DELETED("삭제");

        private String status;

        ProjectStatus(String status) {
            this.status = status;
        }
    }

//    @ManyToOne  // N : 1
//    @JoinColumn(name = "MEMBER_ID")
//    private Member member;
}
