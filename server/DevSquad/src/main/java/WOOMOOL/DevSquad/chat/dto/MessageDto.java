package WOOMOOL.DevSquad.chat.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class MessageDto {

    @Getter
    @Setter
    public static class Post {
        private String accessToken;
        private String refreshToken;
        private String content;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class Response{

        private Long memberId;
        private String content;
        private LocalDateTime createAt;
    }
}
