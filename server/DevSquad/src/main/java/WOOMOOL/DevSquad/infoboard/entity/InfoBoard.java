package WOOMOOL.DevSquad.infoboard.entity;

import WOOMOOL.DevSquad.board.entity.Board;
import WOOMOOL.DevSquad.bookmark.entity.Bookmark;
import WOOMOOL.DevSquad.comment.entity.Comment;
import WOOMOOL.DevSquad.likes.entity.Likes;
import WOOMOOL.DevSquad.member.entity.MemberProfile;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class InfoBoard extends Board {

    private String title;
    @Column(length = 700)
    private String content;

    private int viewCount;
    @ManyToOne
    @JoinColumn(name = "member_id")
    private MemberProfile memberProfile;

    @OneToMany(mappedBy = "board", fetch = FetchType.LAZY)
    private List<Comment> commentList = new ArrayList<>();

    @OneToMany(mappedBy = "board", fetch = FetchType.LAZY)
    private List<Likes> likesList = new ArrayList<>();

    @OneToMany(mappedBy = "board", fetch = FetchType.LAZY)
    private List<Bookmark> bookmarkList = new ArrayList<>();

    @Column(updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    private LocalDateTime modifiedAt = LocalDateTime.now();

    // 좋아요 경험치 제한
    private Integer likeExp = 1;


    @Enumerated(EnumType.STRING)
    private Category category;
    @Enumerated(EnumType.STRING)
    private InfoBoardStatus infoBoardStatus = InfoBoardStatus.INFOBOARD_POSTED;

    public enum Category {
        NEWS("뉴스레터"),
        JOB("구직자 정보"),
        TECH("기술 정보"),
        BOOTCAMP("부트캠프");

        @Getter
        private String categoryName;

        Category(String categoryName) {
            this.categoryName = categoryName;
        }
    }
    public void setCategory(String categoryName) {
        Optional<Category> result = Arrays.stream(Category.values())
                .filter(category -> category.getCategoryName().equals(categoryName))
                .findFirst();
        this.category = result.orElse(Category.NEWS);
    }
    public static Category stringToCategory(String str) {
        Optional<Category> result = Arrays.stream(Category.values())
                .filter(category -> category.name().equalsIgnoreCase(str))
                .findFirst();
        return result.orElse(null);
    }
    public void setCategoryValue(Category category) {
        this.category = category;
    }
    public enum InfoBoardStatus {
        INFOBOARD_POSTED("게시판 등록"),
        INFOBOARD_DELETED("게시판 삭제");

        @Getter
        private String status;

        InfoBoardStatus(String status) {
            this.status = status;
        }
    }


}
