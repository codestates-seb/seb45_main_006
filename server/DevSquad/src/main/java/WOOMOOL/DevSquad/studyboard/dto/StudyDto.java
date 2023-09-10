package WOOMOOL.DevSquad.studyboard.dto;

import WOOMOOL.DevSquad.comment.dto.CommentDto;
import WOOMOOL.DevSquad.member.dto.MemberProfileDto;
import WOOMOOL.DevSquad.studyboard.entity.Study;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import java.time.LocalDateTime;
import java.util.List;

public class StudyDto {
    @Getter
    public static class PostDto {
        @NotBlank(message = "제목을 작성해 주세요.")
        private String title;

        @NotBlank(message = "내용을 작성해 주세요.")
        private String content;

        @Positive(message = "모집 인원을 작성해 주세요.")
        private Integer recruitNum;

    }

    @Getter @Setter
    public static class PatchDto {
        private Long boardId;

//        @NotBlank(message = "제목을 작성해 주세요.")
        private String title;

//        @NotBlank(message = "내용을 작성해 주세요.")
        private String content;

//        @Positive(message = "모집 인원을 작성해 주세요.")
        private Integer recruitNum;

        private Study.StudyStatus studyStatus;
    }

    @Getter @Setter
    public static class previewResponseDto {
        private Long boardId;
        private String title;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
        private Integer recruitNum;
        private Study.StudyStatus studyStatus;
        private int viewCount;
        private MemberProfileDto.listResponse memberProfile;
    }

    @Getter @Setter
    public static class AllResponseDto {
        private Long boardId;
        private String title;
        private String content;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
        private Integer recruitNum;
        private Study.StudyStatus studyStatus;
        private boolean bookmarked;
        private int viewCount;
        private List<CommentDto.Response> commentList;
        private MemberProfileDto.listResponse memberProfile;
    }
}
