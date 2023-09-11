package WOOMOOL.DevSquad.chat.service;

import WOOMOOL.DevSquad.chat.entity.ChatRoom;
import WOOMOOL.DevSquad.chat.entity.Message;
import WOOMOOL.DevSquad.chat.repository.ChatRoomRepository;
import WOOMOOL.DevSquad.chat.repository.MessageRepository;
import WOOMOOL.DevSquad.exception.BusinessLogicException;
import WOOMOOL.DevSquad.member.entity.Member;
import WOOMOOL.DevSquad.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

import static WOOMOOL.DevSquad.exception.ExceptionCode.CHAT_ROOM_CLOSED;
import static WOOMOOL.DevSquad.exception.ExceptionCode.CHAT_ROOM_NOT_FOUND;

@Service
@Transactional
@RequiredArgsConstructor
public class MessageService {

    private final MessageRepository messageRepository;
    private final ChatRoomRepository chatRoomRepository;

    private final MemberService memberService;

    // 메세지 보내기
    public Message saveMessage(Message message, Long chatRoomId){
        // 메세지 보낼 회원
        Member member = memberService.findMemberFromToken();
        // 채팅방 찾기
        ChatRoom findChatRoom = findChatRoomById(chatRoomId);
        // 메시지 DB에 저장, 채팅방에 저장
        Message saveMessage = Message.builder()
                .content(message.getContent())
                .nickname(member.getNickname())
                .createAt(LocalDateTime.now())
                .chatRoom(findChatRoom)
                .build();

       return messageRepository.save(saveMessage);
    }
    // 채팅방 나갈때 남기는 메시지
    public void leaveMessage(ChatRoom chatRoom){

        Member member = memberService.findMemberFromToken();
        String nickname = member.getNickname();

        Message message = Message.builder()
                .content( nickname + "님께서 채팅방에서 나갔습니다.")
                .nickname(nickname)
                .createAt(LocalDateTime.now())
                .chatRoom(chatRoom)
                .build();

        messageRepository.save(message);
    }

    private ChatRoom findChatRoomById(Long chatRoomId){

        Optional<ChatRoom> optionalChatRoom = chatRoomRepository.findById(chatRoomId);
        ChatRoom findChatRoom = optionalChatRoom.orElseThrow(() -> new BusinessLogicException(CHAT_ROOM_NOT_FOUND));

        if(findChatRoom.getChatRoomStatus().equals(ChatRoom.ChatRoomStatus.CHAT_ROOM_CLOSED)) throw new BusinessLogicException(CHAT_ROOM_CLOSED);

        return findChatRoom;
    }
}
