package WOOMOOL.DevSquad.chat.controller;

import WOOMOOL.DevSquad.chat.dto.ChatRoomDto;
import WOOMOOL.DevSquad.chat.entity.ChatRoom;
import WOOMOOL.DevSquad.chat.mapper.ChatRoomMapper;
import WOOMOOL.DevSquad.chat.service.ChatRoomService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/chat")
public class ChatRoomController {

    private final ChatRoomMapper chatRoomMapper;
    private final ChatRoomService chatRoomService;

    public ChatRoomController(ChatRoomMapper chatRoomMapper, ChatRoomService chatRoomService) {
        this.chatRoomMapper = chatRoomMapper;
        this.chatRoomService = chatRoomService;
    }

    @PostMapping
    public ResponseEntity postChatRoom(@RequestBody ChatRoomDto.Post postDto){

        chatRoomService.createChatRoom(postDto.getMemberId());

        return new ResponseEntity(HttpStatus.OK);
    }

    // 채팅방 들어가기
    @GetMapping("/{chatRoom-id}")
    public ResponseEntity getChatRoom(@PathVariable("chatRoom-id")Long chatRoomId){

        ChatRoom chatRoom = chatRoomService.getChatRoom(chatRoomId);
        ChatRoomDto.detailResponse response = chatRoomMapper.entityToDetailResponse(chatRoom);

        return new ResponseEntity(response,HttpStatus.OK);
    }

    // 나의 채팅방 보기
    @GetMapping
    public ResponseEntity getChatMyRooms(){

        List<ChatRoom> chatRoomList = chatRoomService.getMyChatRooms();
        List<ChatRoomDto.listResponse> response = chatRoomMapper.entityToListResponse(chatRoomList);

        return new ResponseEntity(response,HttpStatus.OK);

    }

    // 채팅방 나가기
    @DeleteMapping ("/{chatRoom-id}")
    public ResponseEntity leaveChatRoom(@PathVariable("chatRoom-id") Long chatRoomId){

        chatRoomService.leaveChatRoom(chatRoomId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
