package WOOMOOL.DevSquad.notification.service;

import WOOMOOL.DevSquad.member.entity.MemberProfile;
import WOOMOOL.DevSquad.member.service.MemberService;
import WOOMOOL.DevSquad.notification.mapper.NotificationMapper;
import WOOMOOL.DevSquad.notification.entity.Notification;
import WOOMOOL.DevSquad.notification.entity.Notification.NotificationType;
import WOOMOOL.DevSquad.notification.dto.NotificationDto;
import WOOMOOL.DevSquad.notification.repository.EmitterRepository;
import WOOMOOL.DevSquad.notification.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationService {

    private final EmitterRepository emitterRepository;
    private final NotificationRepository notificationRepository;
    private final NotificationMapper notificationMapper;
    private final MemberService memberService;
    private final Long DEFAULT_TIMEOUT = 60L * 1000L * 60L;

    // 구독하기
    public SseEmitter subscribe(Long memberId) {

        String emitterId = makeTimeIncludeId(memberId);
        SseEmitter emitter = emitterRepository.save(emitterId, new SseEmitter(DEFAULT_TIMEOUT));
        log.info("emitterId = {} ", emitterId);

        //Sse 가 완료되거나 타임아웃 되면 해당 emitter 제거
        emitter.onCompletion(() -> emitterRepository.deleteById(emitterId));
        emitter.onTimeout(() -> emitterRepository.deleteById(emitterId));

        // 503 에러 방지 더미 이벤트 전송
        String eventId = makeTimeIncludeId(memberId);
        sendNotification(emitter, eventId, emitterId, "EventStream Created. [userId=" + memberId + "]");

        return emitter;
    }

    // 클라이언트에게 알림 보내기
    public void sendToClient(MemberProfile receiver, NotificationType notificationType, String content, String url) {
        Notification notification = createNotification(receiver, notificationType, content, url);

        String receiverId = String.valueOf(receiver.getMemberProfileId());
        String eventId = receiverId + "_" + System.currentTimeMillis();
        Map<String, SseEmitter> emitters = emitterRepository.findAllEmitterByMemberId(receiverId);

        NotificationDto.Response notificationResponseDto = notificationMapper.entityToResponse(notification);

        // 해당 이미터로 알림 전송
        emitters.forEach(
                (id, emitter) -> sendNotification(emitter, eventId, id, notificationResponseDto)
        );
    }

    // 알림 보내기
    private void sendNotification(SseEmitter emitter, String eventId, String emitterId, Object data) {
        try {
            emitter.send(SseEmitter.event()
                    .id(eventId)
                    .data(data));
        } catch (IOException e) {
            emitterRepository.deleteById(emitterId);
        }
    }

    // 이미터를 식별하기 위한 고유 아이디 만들기
    private String makeTimeIncludeId(Long memberId) {
        return memberId + "_" + System.currentTimeMillis();
    }

    private Notification createNotification(MemberProfile receiver, NotificationType notificationType, String content, String url) {
        Notification notification = notificationRepository.save(Notification.builder()
                .receiver(receiver)
                .notificationType(notificationType)
                .content(content)
                .url(url)
                .isRead(false)
                .build());
        return notification;
    }

    // 알림 페이징
    public Page<Notification> getMemberNotificationList(int page) {
        Long memberId = memberService.findMemberFromToken().getMemberId();
        return notificationRepository.findByMemberId(memberId, PageRequest.of(page, 5));
    }

    // 읽음 처리
    public void readNotification(Long notificationId) {
        Notification notification = notificationRepository.findById(notificationId).get();
        notification.setIsRead(true);

        notificationRepository.save(notification);
    }

    // 알림 개수
    public int countNotification(Long memberId) {

        return (int) notificationRepository.findByMemberId(memberId).stream().
                filter(notification -> !notification.getIsRead())
                .count();
    }

    // 알림 하나 삭제
    public void deleteNotification(Long notificationId) {

        notificationRepository.deleteById(notificationId);
    }

    // 알림 모두 삭제
    public void deleteAllNotification() {

        Long memberId = memberService.findMemberFromToken().getMemberId();
        notificationRepository.deleteAllByReceiverId(memberId);
    }
}
