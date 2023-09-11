package WOOMOOL.DevSquad.answer.entity;


import WOOMOOL.DevSquad.comment.entity.Comment;
import WOOMOOL.DevSquad.member.entity.MemberProfile;
import WOOMOOL.DevSquad.questionboard.entity.QuestionBoard;
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
@NoArgsConstructor
public class Answer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long answerId;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private MemberProfile memberProfile;

    @ManyToOne
    @JoinColumn(name = "board_id")
    private QuestionBoard questionBoard;

    private String content;

    private boolean isAccepted = false;

    @OneToMany(mappedBy = "answer", fetch = FetchType.LAZY)
    List<Comment> commentList = new ArrayList<>();

    @Column(updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    private LocalDateTime modifiedAt = LocalDateTime.now();

    @Enumerated(EnumType.STRING)
    private AnswerStatus answerStatus = AnswerStatus.ANSWER_POSTED;


    public enum AnswerStatus {
        ANSWER_POSTED("질문 등록"),
        ANSWER_DELETED("질문 삭제");

        @Getter
        private String status;

        AnswerStatus(String status) {
            this.status = status;
        }
    }
}
