package WOOMOOL.DevSquad.member.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

public class MemberProfileDto {
    @Getter
    @Setter
    @NoArgsConstructor
    public static class Patch{
        private String nickname;
        private String profilePicture;
        private String githubId;
        private String introduction;
        private boolean enroll;

    }
    @Getter
    @AllArgsConstructor
    public static class Response{

        private String nickname;
        private String githubId;
        private String introduction;
        private boolean ListEnroll;
        private boolean OAuthUser;
        private LocalDateTime modifiedAt;

    }

}
