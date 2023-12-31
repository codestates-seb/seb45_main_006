package WOOMOOL.DevSquad.projectboard.dto;

import WOOMOOL.DevSquad.comment.dto.CommentDto;
import WOOMOOL.DevSquad.member.dto.MemberProfileDto;
import WOOMOOL.DevSquad.member.entity.MemberProfile;
import WOOMOOL.DevSquad.projectboard.entity.Project;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

public class ProjectDto {

    @Getter
    @Setter
    @AllArgsConstructor
    public static class PostDto {
        @NotBlank(message = "제목을 작성해 주세요.")
        private String title;

        @NotBlank(message = "내용을 작성해 주세요.")
        private String content;

//        @NotNull
        private Set<String> stack;

        private String startDate;
        private String deadline;

        @Positive(message = "모집 인원을 작성해 주세요.")
        private Integer recruitNum;

    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class PatchDto {
        private Long boardId;

        //        @NotBlank(message = "제목을 작성해 주세요.")
        private String title;

        //        @NotBlank(message = "내용을 작성해 주세요.")
        private String content;

        //        @NotNull
        private Set<String> stack;

        private String startDate;
        private String deadline;

        //        @Positive(message = "모집 인원을 작성해 주세요.")
        private Integer recruitNum;

        private Project.ProjectStatus projectStatus;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class previewResponseDto {
        private Long boardId;
        private String title;
        private Set<String> stack;
        private String startDate;
        private String deadline;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
        private Integer recruitNum;
        private Project.ProjectStatus projectStatus;
        private boolean bookmarked;
        private int viewCount;
        private MemberProfileDto.listResponse memberProfile;

    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class AllResponseDto {
        private Long boardId;
        private String title;
        private String content;
        private Set<String> stack;
        private String startDate;
        private String deadline;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
        private Integer recruitNum;
        private Project.ProjectStatus projectStatus;
        private boolean bookmarked;
        private int viewCount;
        private MemberProfileDto.listResponse memberProfile;
    }
}
