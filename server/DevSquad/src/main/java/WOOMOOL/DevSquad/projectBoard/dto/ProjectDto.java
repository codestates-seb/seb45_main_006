package WOOMOOL.DevSquad.projectBoard.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import java.time.LocalDateTime;

public class ProjectDto {

    @Getter
    public static class PostDto {
        @NotBlank(message = "제목을 작성해 주세요.")
        private String title;

        @NotBlank(message = "내용을 작성해 주세요.")
        private String content;

        private String startDate;
        private String deadline;

        @Positive(message = "모집 인원을 작성해 주세요.")
        private Integer recruitNum;

        private boolean recruitStatus;
    }

    @Getter @Setter
    public static class PatchDto {
        private Long boardId;

//        @NotBlank(message = "제목을 작성해 주세요.")
        private String title;

//        @NotBlank(message = "내용을 작성해 주세요.")
        private String content;

        private String startDate;
        private String deadline;

//        @Positive(message = "모집 인원을 작성해 주세요.")
        private Integer recruitNum;
    }

    @Getter @Setter
    public static class previewResponseDto {
        private Long boardId;
        private String title;
        private String startDate;
        private String deadline;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
        private Integer recruitNum;
        private boolean recruitStatus;
        private int viewCount;
    }

    @Getter @Setter
    public static class AllResponseDto {
        private Long boardId;
        private String title;
        private String content;
        private String startDate;
        private String deadline;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
        private Integer recruitNum;
        private boolean recruitStatus;
        private int viewCount;
    }
}
