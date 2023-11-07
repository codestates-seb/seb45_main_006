package WOOMOOL.DevSquad.chat.controller;

import WOOMOOL.DevSquad.chat.dto.ChatRoomDto;
import WOOMOOL.DevSquad.chat.entity.ChatRoom;
import WOOMOOL.DevSquad.chat.mapper.ChatRoomMapper;
import WOOMOOL.DevSquad.chat.service.ChatRoomService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(tags = {"채팅에 대한 API"})
@RestController
@RequestMapping("/chat")
@Slf4j
@RequiredArgsConstructor
public class ChatRoomController {

    private final ChatRoomMapper chatRoomMapper;
    private final ChatRoomService chatRoomService;

    @ApiOperation(value = "채팅방 생성", notes = "채팅방을 생성하는 API")
    @PostMapping
    public ResponseEntity postChatRoom(@RequestBody ChatRoomDto.Post postDto){

        ChatRoom chatRoom = chatRoomService.createChatRoom(postDto.getMemberId());
        ChatRoomDto.Response response = chatRoomMapper.entityToResponse(chatRoom);

        return new ResponseEntity(response,HttpStatus.OK);
    }

    // 채팅방 들어가기
    @ApiOperation(value = "채팅방 입장", notes = "채팅방을 입장하는 API, 웹소켓 연결 시작")
    @GetMapping("/{chatRoom-id}")
    public ResponseEntity getChatRoom(@PathVariable("chatRoom-id")Long chatRoomId){

        ChatRoom chatRoom = chatRoomService.getChatRoom(chatRoomId);
        ChatRoomDto.detailResponse response = chatRoomMapper.entityToDetailResponse(chatRoom);

        return new ResponseEntity(response,HttpStatus.OK);
    }

    // 나의 채팅방 보기
    @ApiOperation(value = "나의 채팅방 조회", notes = "나의 채팅방 조회 API")
    @GetMapping
    public ResponseEntity getChatMyRooms(){

        List<ChatRoom> chatRoomList = chatRoomService.getMyChatRooms();
        List<ChatRoomDto.listResponse> response = chatRoomMapper.entityToListResponse(chatRoomList);


        return new ResponseEntity(response,HttpStatus.OK);

    }
    @ApiOperation(value = "채팅방 퇴장", notes = "채팅방 퇴장 API")
    @DeleteMapping("/{chatRoom-id}")
    public ResponseEntity leaveChatRoom(@PathVariable("chatRoom-id") Long chatRoomId){

        chatRoomService.leaveChatRoom(chatRoomId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
