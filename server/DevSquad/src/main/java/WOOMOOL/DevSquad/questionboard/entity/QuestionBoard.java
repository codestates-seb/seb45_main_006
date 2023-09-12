package WOOMOOL.DevSquad.questionboard.entity;

import WOOMOOL.DevSquad.answer.entity.Answer;
import WOOMOOL.DevSquad.board.entity.Board;
import WOOMOOL.DevSquad.bookmark.entity.Bookmark;
import WOOMOOL.DevSquad.comment.entity.Comment;
import WOOMOOL.DevSquad.likes.entity.Likes;
import WOOMOOL.DevSquad.member.entity.MemberProfile;

import WOOMOOL.DevSquad.stacktag.entity.StackTag;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class QuestionBoard extends Board {

    @ManyToOne
    @JoinColumn(name = "member_id")
    private MemberProfile memberProfile;

    private String title;
    @Column(length = 700)
    private String content;

    private int viewCount;

    private boolean isAnswered = false;

    @ManyToMany
    @JoinTable(name = "studyStackTag",
            joinColumns = @JoinColumn(name = "boardId"),
            inverseJoinColumns = @JoinColumn(name = "stackTagId")
    )
    private Set<StackTag> stackTags;

    @OneToMany(mappedBy = "questionBoard", fetch = FetchType.LAZY)
    private List<Answer> answerList = new ArrayList<>();

    @OneToMany(mappedBy = "board", fetch = FetchType.LAZY)
    private List<Likes> likesList = new ArrayList<>();

    @OneToMany(mappedBy = "board", fetch = FetchType.LAZY)
    private List<Bookmark> bookmarkList = new ArrayList<>();

    @Column(updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    private LocalDateTime modifiedAt = LocalDateTime.now();



    @Enumerated(EnumType.STRING)
    private QuestionBoardStatus questionBoardStatus = QuestionBoardStatus.QUESTIONBOARD_POSTED;


    public enum QuestionBoardStatus {
        QUESTIONBOARD_POSTED("게시판 등록"),
        QUESTIONBOARD_DELETED("게시판 삭제");

        @Getter
        private String status;

        QuestionBoardStatus(String status) {
            this.status = status;
        }
    }


}
