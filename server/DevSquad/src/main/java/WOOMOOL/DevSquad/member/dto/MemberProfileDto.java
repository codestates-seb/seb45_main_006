package WOOMOOL.DevSquad.member.dto;


import WOOMOOL.DevSquad.position.entity.Position;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

public class MemberProfileDto {
    @Getter
    @Setter
    @NoArgsConstructor
    public static class Patch{
        private String nickname;
        private String profilePicture;
        private String githubId;
        private String introduction;
        private boolean listEnroll;
        private List<String> position;
        private List<String> stack;


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
        private LocalDateTime modifiedAt;

    }
    // todo:리스트를 눌렀을 때 나올 응답도 필요하면 추가해야 될 듯

}
