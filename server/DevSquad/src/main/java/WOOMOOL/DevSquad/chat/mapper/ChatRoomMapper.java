package WOOMOOL.DevSquad.chat.mapper;

import WOOMOOL.DevSquad.chat.dto.ChatRoomDto;
import WOOMOOL.DevSquad.chat.dto.MessageDto;
import WOOMOOL.DevSquad.chat.entity.ChatRoom;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "Spring")
public interface ChatRoomMapper {

    ChatRoom postDtoToEntity(ChatRoomDto.Post chatRoomDto);

    // 채팅방 들어갔을 때 닉네임, 메시지들 정보 반환 매핑
    default ChatRoomDto.detailResponse entityToDetailResponse(ChatRoom chatRoom) {

        return new ChatRoomDto.detailResponse(
                chatRoom.getCharRoomId(),
                chatRoom.getMemberProfileList().stream()

                        .map(memberProfile -> memberProfile.getMemberProfileId()).collect(Collectors.toList()),
                chatRoom.getMessageList().stream().map(message ->
                        new MessageDto.Response(
                                message.getSenderId(),
                                message.getContent(),
                                message.getCreateAt())
                ).collect(Collectors.toList())
        );
    }

    // 채팅방 리스트 정보 반환 매핑
    default List<ChatRoomDto.listResponse> entityToListResponse(List<ChatRoom> chatRoomList) {

        return chatRoomList.stream()
                .map(chatRoom -> new ChatRoomDto.listResponse(
                        chatRoom.getCharRoomId(),
                        chatRoom.getMemberProfileList().stream()
                                .map(memberProfile -> memberProfile.getMemberProfileId())
                                .collect(Collectors.toList())
                )).collect(Collectors.toList());
    }
}
