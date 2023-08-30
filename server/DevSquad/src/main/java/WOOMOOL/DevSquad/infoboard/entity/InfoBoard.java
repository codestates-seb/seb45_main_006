package WOOMOOL.DevSquad.infoboard.entity;

import WOOMOOL.DevSquad.board.Board;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Optional;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class InfoBoard extends Board {

    private String title;

    private String content;
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "member_id")
//    private Member member;
    private Long memberId;

    @Column(updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    private LocalDateTime modifiedAt = LocalDateTime.now();

    private int viewCount;

    @Enumerated(EnumType.STRING)
    private Category category = Category.ETC;
    @Enumerated(EnumType.STRING)
    private InfoBoardStatus infoBoardStatus = InfoBoardStatus.INFOBOARD_POSTED;

    public enum Category {
        NEWS("뉴스레터"),
        QUESTION("질문"),
        JOB("구직자 정보"),
        TECH("기술 정보"),
        BOOTCAMP("부트캠프"),
        ETC("기타");

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
        this.category = result.orElse(Category.ETC);
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
