package WOOMOOL.DevSquad.comment.entity;

import WOOMOOL.DevSquad.answer.entity.Answer;
import WOOMOOL.DevSquad.board.entity.Board;
import WOOMOOL.DevSquad.member.entity.MemberProfile;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Setter
@Getter
@NoArgsConstructor
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private MemberProfile memberProfile;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id")
    private Board board;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private Comment parent;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "answer_id")
    private Answer answer;

    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL)
    private List<Comment> commentList = new ArrayList<>();


    private String content;

    private LocalDateTime createdAt = LocalDateTime.now();

    private LocalDateTime modifiedAt = LocalDateTime.now();

    @Enumerated(EnumType.STRING)
    private CommentStatus commentStatus = CommentStatus.COMMENT_POSTED;

    public enum CommentStatus {
        COMMENT_POSTED("댓글 등록"),
        COMMENT_DELETED("댓글 삭제");

        @Getter
        private String status;

        CommentStatus(String status) {
            this.status = status;
        }
    }
}


