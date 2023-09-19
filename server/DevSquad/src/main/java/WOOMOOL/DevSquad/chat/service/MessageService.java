package WOOMOOL.DevSquad.chat.service;

import WOOMOOL.DevSquad.auth.jwt.JwtTokenizer;
import WOOMOOL.DevSquad.chat.entity.ChatRoom;
import WOOMOOL.DevSquad.chat.entity.Message;
import WOOMOOL.DevSquad.chat.repository.ChatRoomRepository;
import WOOMOOL.DevSquad.chat.repository.MessageRepository;
import WOOMOOL.DevSquad.exception.BusinessLogicException;
import WOOMOOL.DevSquad.member.entity.Member;
import WOOMOOL.DevSquad.member.entity.MemberProfile;
import WOOMOOL.DevSquad.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;

import static WOOMOOL.DevSquad.exception.ExceptionCode.*;

@Service
@Transactional
@RequiredArgsConstructor
public class MessageService {

    private final MessageRepository messageRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final MemberRepository memberRepository;
    private final JwtTokenizer jwtTokenizer;

    // 메세지 보내기
    public Message saveMessage(Message message, Long chatRoomId, String accessToken) {
        // 메세지 보낼 회원
        Member member = findMember(accessToken);

        // 채팅방 찾기
        ChatRoom findChatRoom = findChatRoomById(chatRoomId);
        // 메시지 DB에 저장, 채팅방에 저장
        Message saveMessage = Message.builder()
                .senderId(member.getMemberId())
                .nickname(member.getNickname())
                .content(message.getContent())
                .createAt(LocalDateTime.now())
                .chatRoom(findChatRoom)
                .type(Message.Type.BASIC)
                .build();

        findChatRoom.getMessageList().add(saveMessage);

        return messageRepository.save(saveMessage);
    }

    public void startMessage(ChatRoom chatRoom) {

        Message startMessage = Message.builder()
                .nickname("공지")
                .content("대화가 시작되었습니다.")
                .chatRoom(chatRoom)
                .createAt(LocalDateTime.now())
                .type(Message.Type.NOTICE)
                .build();

        messageRepository.save(startMessage);
        chatRoom.getMessageList().add(startMessage);

    }

    // 채팅방 나갈때 남기는 메시지
    public void leaveMessage(ChatRoom chatRoom, MemberProfile memberProfile) {

        String nickname = memberProfile.getNickname();

        Message leaveMessage = Message.builder()
                .senderId(memberProfile.getMemberProfileId())
                .nickname(memberProfile.getNickname())
                .content(nickname + "님께서 채팅방에서 나갔습니다.")
                .createAt(LocalDateTime.now())
                .chatRoom(chatRoom)
                .type(Message.Type.NOTICE)
                .build();

        messageRepository.save(leaveMessage);
        chatRoom.getMessageList().add(leaveMessage);
    }

    private ChatRoom findChatRoomById(Long chatRoomId) {

        Optional<ChatRoom> optionalChatRoom = chatRoomRepository.findById(chatRoomId);
        ChatRoom findChatRoom = optionalChatRoom.orElseThrow(() -> new BusinessLogicException(CHAT_ROOM_NOT_FOUND));

        if (findChatRoom.getChatRoomStatus().equals(ChatRoom.ChatRoomStatus.CHAT_ROOM_CLOSED))
            throw new BusinessLogicException(CHAT_ROOM_CLOSED);

        return findChatRoom;
    }

    // 요청으로 받은 accessToken 을 이용하여 회원 객체 찾기
    public Member findMember(String accessToken) {

        String jws = accessToken.replace("Bearer ", "");
        Map<String, Object> claims = jwtTokenizer.getClaims(jws, jwtTokenizer.encodedBase64SecretKey(jwtTokenizer.getSecretKey())).getBody();
        String username = (String) claims.get("username");

        Optional<Member> optionalMember = memberRepository.findByEmail(username);
        Member member = optionalMember.orElseThrow(() -> new BusinessLogicException(MEMBER_NOT_FOUND));

        return member;
    }
}
