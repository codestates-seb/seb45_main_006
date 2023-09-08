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
    public static class listResponse{

        private Long chatRoomId;
        private List<String> nickname;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class detailResponse{

        private Long chatRoomId;
        private List<String> nickname;
        private List<MessageDto.Response> messageList;

    }
}
