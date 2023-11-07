package WOOMOOL.DevSquad.member.dto;

import WOOMOOL.DevSquad.infoboard.dto.InfoBoardDto;
import WOOMOOL.DevSquad.member.entity.Member;
import WOOMOOL.DevSquad.projectboard.dto.ProjectDto;
import WOOMOOL.DevSquad.questionboard.dto.QuestionBoardDto;
import WOOMOOL.DevSquad.questionboard.entity.QuestionBoard;
import WOOMOOL.DevSquad.studyboard.dto.StudyDto;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

public class MemberProfileDto {
    @Getter
    @Setter
    @NoArgsConstructor
    public static class Patch{
        @ApiModelProperty(value = "닉네임", example = "닉네임")
        @NotBlank(message = "닉네임을 입력해주세요")
        @Pattern(regexp = "^[A-Za-z0-9가-힣]{2,8}$",
                message = "닉네임은 2~8글자로 이루어져야 합니다.")
        private String nickname;
        @ApiModelProperty(value = "프로필사진", example = "URL")
        private String profilePicture;
        @ApiModelProperty(value = "깃헙아이디", example = "ehdals0405")
        private String githubId;
        @ApiModelProperty(value = "자기소개", example = "안녕하세요")
        private String introduction;
        @ApiModelProperty(value = "회원리스트 등록여부", example = "1")
        private boolean listEnroll;
        @ApiModelProperty(value = "포지션", example = "Backend,DevOps")
        private Set<String> position;
        @ApiModelProperty(value = "기술스택", example = "Java,Ruby")
        private Set<String> stack;


    }
    // 패치 response
    @Getter
    @AllArgsConstructor
    public static class patchResponse{

        private Long memberProfileId;

        private String nickname;

        private String profilePicture;

        private String githubId;

        private String introduction;

        private boolean listEnroll;

        private Set<String> position;

        private Set<String> stack;


    }

    // 유저리스트 response
    @Getter
    @AllArgsConstructor
    public static class listResponse{

        private Long memberId;

        private String profilePicture;

        private String nickname;

        private String githubId;

        private Set<String> position;

        private Set<String> stack;

    }

    //유저 프로필 response
    @Getter
    @AllArgsConstructor
    public static class myProfileResponse {

        private Long memberId;

        private String profilePicture;

        private String nickname;

        private String githubId;

        private String introduction;

        private boolean listEnroll;

        private Member.MemberType memberType;

        private Set<String> position;

        private Set<String> stack;

        private List<Long> blockMemberList;

        private boolean attendanceChecked;

        private LocalDateTime modifiedAt;
    }
    @Getter
    @AllArgsConstructor
    public static class memberProfileResponse{

        private Long memberId;

        private String profilePicture;

        private String nickname;

        private String githubId;

        private String introduction;

        private Set<String> position;

        private Set<String> stack;

        private List<ProjectDto.previewResponseDto> projectList;

        private List<StudyDto.previewResponseDto> studyList;

        private List<InfoBoardDto.Response> infoBoardList;

        private List<QuestionBoardDto.Response> questionBoardList;

        private LocalDateTime modifiedAt;

    }

}
