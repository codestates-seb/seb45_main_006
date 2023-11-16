package WOOMOOL.DevSquad.notification.mapper;

import WOOMOOL.DevSquad.notification.dto.NotificationDto;
import WOOMOOL.DevSquad.notification.entity.Notification;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface NotificationMapper {

    default NotificationDto.Response entityToResponse(Notification notification) {

        return NotificationDto.Response.builder()
                .memberId(notification.getReceiver().getMemberProfileId())
                .notificationId(notification.getId())
                .content(notification.getContent())
                .url(notification.getUrl())
                .notificationType(String.valueOf(notification.getNotificationType()))
                .isRead(notification.getIsRead())
                .createAt(notification.getCreateAt())
                .build();
    }

    default List<NotificationDto.Response> entitiesToResponse(List<Notification> notificationList) {

        return notificationList.stream()
                .map(notification -> NotificationDto.Response.builder()
                        .memberId(notification.getReceiver().getMemberProfileId())
                        .notificationId(notification.getId())
                        .content(notification.getContent())
                        .url(notification.getUrl())
                        .notificationType(String.valueOf(notification.getNotificationType()))
                        .isRead(notification.getIsRead())
                        .createAt(notification.getCreateAt())
                        .build())
                .collect(Collectors.toList());
    }
}
