package WOOMOOL.DevSquad.chat.controller;

import WOOMOOL.DevSquad.chat.dto.MessageDto;
import WOOMOOL.DevSquad.chat.entity.ChatRoom;
import WOOMOOL.DevSquad.chat.entity.Message;
import WOOMOOL.DevSquad.chat.mapper.MessageMapper;
import WOOMOOL.DevSquad.chat.service.ChatRoomService;
import WOOMOOL.DevSquad.chat.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;


@RestController
@RequiredArgsConstructor
@RequestMapping("/message")
public class MessageController {

    private final MessageMapper messageMapper;
    private final MessageService messageService;

//    @MessageMapping("/chat/{chatRoom-id}")
//    @SendTo("/topic/chat/{chatRoom-id}")
    @PostMapping("/{chatRoom-id}")
    public ResponseEntity sendMessage(@PathVariable("chatRoom-id") Long chatRoomId,
                                      @RequestBody MessageDto.Post postDto) {

        Message message = messageMapper.postDtoToEntity(postDto);

        Message saveMessage = messageService.saveMessage(message, chatRoomId);

        MessageDto.Response response = messageMapper.entityToResponse(saveMessage);


        return new ResponseEntity(response, HttpStatus.OK);

    }
}
