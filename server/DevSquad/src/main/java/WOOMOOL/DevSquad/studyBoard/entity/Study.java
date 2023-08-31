package WOOMOOL.DevSquad.studyBoard.entity;

import WOOMOOL.DevSquad.member.entity.MemberProfile;
import WOOMOOL.DevSquad.projectBoard.entity.Board;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter @Setter
public class Study extends Board {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long studyId;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String content;

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
    private Study.StudyStatus studyStatus = Study.StudyStatus.STUDY_POSTED;

    @ManyToOne  // N : 1
    @JoinColumn(name = "MEMBER_PROFILE_ID")
    private MemberProfile memberProfile;

    public enum StudyStatus {
        STUDY_POSTED("게시 중"),
        STUDY_CLOSED("모집 완료"),
        STUDY_DELETED("삭제");

        private String status;

        StudyStatus(String status) {
            this.status = status;
        }
    }

//    @ManyToOne  // N : 1
//    @JoinColumn(name = "MEMBER_ID")
//    private Member member;
}
