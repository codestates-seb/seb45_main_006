package WOOMOOL.DevSquad.chat.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

public class ChatRoomDto {

    @Getter
    @Setter
    public static class Post{

        private Long memberId;
    }
    @Getter
    @Setter
    @AllArgsConstructor
    public static class Response{
        private Long chatRoomId;
    }
    @Getter
    @Setter
    @AllArgsConstructor
    public static class listResponse{

        private Long chatRoomId;
        private List<Long> membersId;
        private List<String> nicknames;
        private String lastMessageNickname;
        private String lastMessage;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class detailResponse{

        private Long chatRoomId;
        private List<Long> membersId;
        private List<String> nicknames;
        private List<MessageDto.Response> messageList;

    }
}
