package WOOMOOL.DevSquad.studyBoard.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import java.time.LocalDateTime;

public class StudyDto {
    @Getter
    public static class PostDto {
        @NotBlank(message = "제목을 작성해 주세요.")
        private String title;

        @NotBlank(message = "내용을 작성해 주세요.")
        private String content;

        @Positive(message = "모집 인원을 작성해 주세요.")
        private int recruitNum;

        private boolean recruitStatus;
    }

    @Getter @Setter
    public static class PatchDto {
        private Long boardId;

//        @NotBlank(message = "제목을 작성해 주세요.")
        private String title;

//        @NotBlank(message = "내용을 작성해 주세요.")
        private String content;

//        @Positive(message = "모집 인원을 작성해 주세요.")
        private int recruitNum;

        private boolean recruitStatus;
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
