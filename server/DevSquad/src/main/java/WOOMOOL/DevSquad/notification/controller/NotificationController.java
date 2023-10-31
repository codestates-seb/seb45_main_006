package WOOMOOL.DevSquad.notification.controller;

import WOOMOOL.DevSquad.member.service.MemberService;
import WOOMOOL.DevSquad.notification.dto.NotificationDto;
import WOOMOOL.DevSquad.notification.entity.Notification;
import WOOMOOL.DevSquad.notification.mapper.NotificationMapper;
import WOOMOOL.DevSquad.notification.service.NotificationService;
import WOOMOOL.DevSquad.utils.PageResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/notifications")
@Slf4j
public class NotificationController {

    private final NotificationService notificationService;
    private final MemberService memberService;
    private final NotificationMapper notificationMapper;

    //produces -> SSE 형식의 데이터로 응답 생성
    @GetMapping(value = "/subscribe", produces = "text/event-stream")
    public SseEmitter subscribe() {

        // 헤더에 토큰을 보내서 회원 아이디 찾기
        Long memberId = memberService.findMemberFromToken().getMemberId();
        return notificationService.subscribe(memberId);
    }

    // 알림 가져오기
    @GetMapping
    private ResponseEntity getNotifications(int page) {

        Page<Notification> notificationPage = notificationService.getMemberNotificationList(page - 1);
        List<Notification> notificationList = notificationPage.getContent();
        List<NotificationDto.Response> responses = notificationMapper.entitiesToResponse(notificationList);

        return new ResponseEntity(new PageResponseDto<>(responses, notificationPage), HttpStatus.OK);

    }

    // 알림 삭제하기
    @DeleteMapping("/{notificationId}")
    private ResponseEntity deleteNotification(@PathVariable Long notificationId) {

        notificationService.deleteNotification(notificationId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);

    }

    // 알림 모두 삭제
    @DeleteMapping
    private ResponseEntity deleteNotifications() {


        notificationService.deleteAllNotification();

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
