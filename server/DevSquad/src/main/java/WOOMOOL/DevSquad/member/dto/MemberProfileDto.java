package WOOMOOL.DevSquad.member.dto;


import WOOMOOL.DevSquad.projectBoard.entity.Project;
import WOOMOOL.DevSquad.studyBoard.entity.Study;
import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

public class MemberProfileDto {
    @Getter
    @Setter
    @NoArgsConstructor
    public static class Patch{
        @NotBlank(message = "닉네임을 입력해주세요")
        @Pattern(regexp = "^[A-Za-z0-9가-힣]{2,8}$",
                message = "닉네임은 2~8글자로 이루어져야 합니다.")
        private String nickname;

        private String profilePicture;

        private String githubId;

        private String introduction;

        private boolean listEnroll;

        private List<String> position;



    }

    // 유저리스트 response
    @Getter
    @AllArgsConstructor
    public static class listResponse{

        private String profilePicture;

        private String nickname;

        private String githubId;

        private Set<String> position;

        private List<String> stack;

    }

    //유저 프로필 response
    @Getter
    @AllArgsConstructor
    public static class detailResponse{

        private String profilePicture;

        private String nickname;

        private String githubId;

        private String introduction;

        private boolean listEnroll;

        private boolean OAuthUser;

        private Set<String> position;

        private List<String> stack;

        private List<Project> projectList;

        private List<Study> studyList;

        private LocalDateTime modifiedAt;

    }
    // todo:리스트를 눌렀을 때 나올 응답도 필요하면 추가해야 될 듯

}
