package WOOMOOL.DevSquad.notification.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;


public class NotificationDto {

    @Getter
    @AllArgsConstructor
    @Builder
    public static class Response {
        private Long memberId;
        private Long notificationId;
        private String content;
        private String url;
        private String notificationType;
        private LocalDateTime createAt;
    }
}
