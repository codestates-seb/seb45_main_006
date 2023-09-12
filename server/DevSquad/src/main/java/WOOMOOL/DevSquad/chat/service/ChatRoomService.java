package WOOMOOL.DevSquad.chat.service;

import WOOMOOL.DevSquad.chat.entity.ChatRoom;
import WOOMOOL.DevSquad.chat.repository.ChatRoomRepository;
import WOOMOOL.DevSquad.exception.BusinessLogicException;
import WOOMOOL.DevSquad.exception.ExceptionCode;
import WOOMOOL.DevSquad.member.entity.Member;
import WOOMOOL.DevSquad.member.entity.MemberProfile;
import WOOMOOL.DevSquad.member.repository.MemberRepository;
import WOOMOOL.DevSquad.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static WOOMOOL.DevSquad.exception.ExceptionCode.*;

@Service
@Transactional
@RequiredArgsConstructor
public class ChatRoomService {

    private final MemberRepository memberRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final MemberService memberService;
    private final MessageService messageService;


    // 채팅방 생성
    public ChatRoom createChatRoom(Long receiverId) {

        MemberProfile sender = findLoginMemberProfile();

        Optional<Member> optionalMember = memberRepository.findById(receiverId);
        Member receiverMember = optionalMember.orElseThrow(() -> new BusinessLogicException(MEMBER_NOT_FOUND));
        MemberProfile receiver = receiverMember.getMemberProfile();

        // 이미 서로 채팅중인 채팅방이 있을 경우 예외
        List<Long> membersId = new ArrayList<>();
        membersId.add(receiverId);
        membersId.add(sender.getMemberProfileId());

        if(chatRoomRepository.findByMembers(membersId, (long) membersId.size()).isPresent()){
           throw new BusinessLogicException(DUPLICATE_CHAT_ROOM);
        } else {

            ChatRoom chatRoom = new ChatRoom();
            // 유저와 채팅방 정보 서로 저장
            chatRoom.joinChatRoom(sender, receiver);
            sender.addChatRoom(chatRoom);
            receiver.addChatRoom(chatRoom);

            return chatRoomRepository.save(chatRoom);
        }
    }

    // 내 채팅방 리스트 확인
    public List<ChatRoom> getMyChatRooms() {

        MemberProfile loginMember = findLoginMemberProfile();
        List<ChatRoom> chatRoomList = chatRoomRepository.findByMemberId(loginMember.getMemberProfileId());

        return chatRoomList;
    }
    // 채팅방 들어가기
    public ChatRoom getChatRoom(Long chatRoomId){

        return findChatRoomById(chatRoomId);
    }

    // 채팅방 나가기
    public void leaveChatRoom(Long chatRoomId) {
        // 로그인 중인 멤버 찾기
        MemberProfile loginMember= findLoginMemberProfile();
        // 채팅방 찾기
        ChatRoom findChatRoom = findChatRoomById(chatRoomId);

        // 멤버에서 채팅방 리스트에서 제거
        loginMember.getChatRoomList().remove(findChatRoom);
        // 채팅방에서 멤버 리스트에서 제거
        findChatRoom.getMemberProfileList().remove(loginMember);

        // 만약 채팅방에 멤버가 없으면 삭제
        if (findChatRoom.getMemberProfileList().size() == 0) {

            findChatRoom.setChatRoomStatus(ChatRoom.ChatRoomStatus.CHAT_ROOM_CLOSED);
        // 멤버가 남아있으면 퇴장했다는 메시지 남기기

        } else messageService.leaveMessage(findChatRoom, loginMember);
    }

    // 현재 로그인한 회원 찾기
    private MemberProfile findLoginMemberProfile() {

        return memberService.findMemberFromToken().getMemberProfile();
    }

    // 채팅방 찾기
    private ChatRoom findChatRoomById(Long chatRoomId){

        Optional<ChatRoom> optionalChatRoom = chatRoomRepository.findById(chatRoomId);
        ChatRoom findChatRoom = optionalChatRoom.orElseThrow(() -> new BusinessLogicException(CHAT_ROOM_NOT_FOUND));

        if(findChatRoom.getChatRoomStatus().equals(ChatRoom.ChatRoomStatus.CHAT_ROOM_CLOSED)) throw new BusinessLogicException(CHAT_ROOM_CLOSED);

        return findChatRoom;
    }
}
