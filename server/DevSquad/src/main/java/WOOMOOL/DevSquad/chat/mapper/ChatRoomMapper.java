package WOOMOOL.DevSquad.chat.mapper;

import WOOMOOL.DevSquad.chat.dto.ChatRoomDto;
import WOOMOOL.DevSquad.chat.dto.MessageDto;
import WOOMOOL.DevSquad.chat.entity.ChatRoom;
import WOOMOOL.DevSquad.chat.entity.Message;
import org.mapstruct.Mapper;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Mapper(componentModel = "Spring")
public interface ChatRoomMapper {

    ChatRoom postDtoToEntity(ChatRoomDto.Post chatRoomDto);

    default ChatRoomDto.Response entityToResponse(ChatRoom chatRoom){
        return new ChatRoomDto.Response(chatRoom.getChatRoomId());
    }

    // 채팅방 들어갔을 때 닉네임, 메시지들 정보 반환 매핑
    default ChatRoomDto.detailResponse entityToDetailResponse(ChatRoom chatRoom) {

        return new ChatRoomDto.detailResponse(
                chatRoom.getChatRoomId(),
                chatRoom.getMemberProfileList().stream()
                        .map(memberProfile -> memberProfile.getMemberProfileId()).collect(Collectors.toList()),
                chatRoom.getMemberProfileList().stream()
                        .map(memberProfile -> memberProfile.getNickname()).collect(Collectors.toList()),
                chatRoom.getMessageList().stream().map(message ->
                        new MessageDto.Response(
                                message.getSenderId(),
                                message.getNickname(),
                                message.getContent(),
                                message.getCreateAt(),
                                message.getType()
                        )
                ).collect(Collectors.toList())
        );
    }

    // 채팅방 리스트 정보 반환 매핑
    default List<ChatRoomDto.listResponse> entityToListResponse(List<ChatRoom> chatRoomList) {

        return chatRoomList.stream()
                .map(chatRoom -> new ChatRoomDto.listResponse(
                        chatRoom.getChatRoomId(),
                        chatRoom.getMemberProfileList().stream()
                                .map(memberProfile -> memberProfile.getMemberProfileId())
                                .collect(Collectors.toList()),
                        chatRoom.getMemberProfileList().stream()
                                .map(memberProfile -> memberProfile.getNickname()).collect(Collectors.toList()),
                        lastMessage(chatRoom.getMessageList()).getNickname(),
                        lastMessage(chatRoom.getMessageList()).getContent()
                )).collect(Collectors.toList());
    }

    // 메시지 리스트에서 가장 최근 메시지 찾기
    private Message lastMessage(List<Message> messageList){


        Optional<Message> optionalMessage = messageList.stream()
                .max(Comparator.comparingLong(Message::getMessageId));

        Message lastMessage = optionalMessage.orElseThrow();

        return lastMessage;
    }
}
