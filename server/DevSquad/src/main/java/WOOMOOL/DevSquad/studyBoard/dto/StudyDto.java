package WOOMOOL.DevSquad.studyBoard.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

public class StudyDto {
    @Getter
    public static class PostDto {
        private String title;
        private String content;
        private int recruitNum;
        private int currentNum;
        private boolean recruitStatus;
    }

    @Getter @Setter
    public static class PatchDto {
//        private Long studyId;
        private Long boardId;
        private String title;
        private String content;
        private int recruitNum;
//        private boolean recruitStatus;
    }

    @Getter @Setter
    public static class previewResponseDto {
//        private Long studyId;
        private Long boardId;
        private String title;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
        private int recruitNum;
        private boolean recruitStatus;
        private int viewCount;
    }

    @Getter @Setter
    public static class AllResponseDto {
//        private Long stBoardId;
        private Long boardId;
        private String title;
        private String content;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
        private int recruitNum;
        private boolean recruitStatus;
        private int viewCount;
    }
}
