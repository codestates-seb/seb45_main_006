package WOOMOOL.DevSquad.questionboard.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

public class QuestionBoardDto {
    @Getter
    @Setter
    @NoArgsConstructor
    public static class Post {
        private Long memberId;

        private String title;

        private String content;
    }
    @Getter
    @Setter
    @NoArgsConstructor
    public static class Patch {
        private Long boardId;

        private Long memberId;

        private String title;

        private String content;
    }
    @Getter
    @AllArgsConstructor
    public static class Response {
        private Long boardId;
        private String title;
        private String content;
        private Long memberId;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
        private int viewCount;
        private String infoBoardStatus;
    }
}
