package WOOMOOL.DevSquad.chat.entity;

import WOOMOOL.DevSquad.member.entity.MemberProfile;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

import static WOOMOOL.DevSquad.chat.entity.ChatRoom.ChatRoomStatus.CHAT_ROOM_OPENED;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ChatRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long chatRoomId;

    @OneToMany(mappedBy = "chatRoom")
    private List<Message> messageList = new ArrayList<>();

    @ManyToMany(mappedBy = "chatRoomList")
    private List<MemberProfile> memberProfileList = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    private ChatRoomStatus ChatRoomStatus = CHAT_ROOM_OPENED;

    public void joinChatRoom(MemberProfile sender, MemberProfile receiver) {
        this.memberProfileList.add(sender);
        this.memberProfileList.add(receiver);
    }

    public enum ChatRoomStatus {
        CHAT_ROOM_OPENED("채팅창 열림"),
        CHAT_ROOM_CLOSED("채팅창 닫힘");

        @Getter
        private String status;

        ChatRoomStatus(String status) {
            this.status = status;
        }
    }
}
