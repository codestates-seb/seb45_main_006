package WOOMOOL.DevSquad.projectBoard.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

public class ProjectDto {

    @Getter
    public static class PostDto {
        private String title;
        private String content;
        private String startDate;
        private String deadline;
        private int recruitNum;
        private boolean recruitStatus;
    }

    @Getter @Setter
    public static class PatchDto {
//        private Long pjBoardId;
        private Long boardId;
        private String title;
        private String content;
        private String startDate;
        private String deadline;
        private int recruitNum;
    }

    @Getter @Setter
    public static class previewResponseDto {
//        private Long pjBoardId;
        private Long boardId;
        private String title;
        private String startDate;
        private String deadline;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
        private int recruitNum;
        private boolean recruitStatus;
        private int viewCount;
    }

    @Getter @Setter
    public static class AllResponseDto {
//        private Long pjBoardId;
        private Long boardId;
        private String title;
        private String content;
        private String startDate;
        private String deadline;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
        private int recruitNum;
        private boolean recruitStatus;
        private int viewCount;
    }
}
