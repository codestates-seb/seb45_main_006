package WOOMOOL.DevSquad.chat.controller;

import WOOMOOL.DevSquad.chat.dto.MessageDto;
import WOOMOOL.DevSquad.chat.entity.ChatRoom;
import WOOMOOL.DevSquad.chat.entity.Message;
import WOOMOOL.DevSquad.chat.mapper.ChatRoomMapper;
import WOOMOOL.DevSquad.chat.mapper.MessageMapper;
import WOOMOOL.DevSquad.chat.service.ChatRoomService;
import WOOMOOL.DevSquad.chat.service.MessageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;


@RestController
@RequiredArgsConstructor
@Slf4j
public class MessageController {

    private final MessageMapper messageMapper;
    private final MessageService messageService;

    @MessageMapping("/chat/{chatRoom-id}") // app/chat/{chatRoom-id} 로 요청이 오면 메서드 실행
    @SendTo("/topic/chat/{chatRoom-id}") // topic/chat/{chatRoom-id} 를 구독하고 있는 사람들에게 response
    public ResponseEntity sendMessage(@DestinationVariable("chatRoom-id") Long chatRoomId,
                                      @RequestBody MessageDto.Post postDto) {

        Message message = messageMapper.postDtoToEntity(postDto);

        Message saveMessage = messageService.saveMessage(message,chatRoomId,postDto.getAccessToken());

        MessageDto.Response response = messageMapper.entityToResponse(saveMessage);


        return new ResponseEntity(response, HttpStatus.OK);

    }
}
