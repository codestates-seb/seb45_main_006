package WOOMOOL.DevSquad.chat.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long messageId;

    @Column
    private Long senderId;
    @Column
    private String nickname;
    @Column
    private String content;

    @Enumerated(EnumType.STRING)
    private Type type;

    @Column
    private LocalDateTime createAt = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "chatRoomId")
    private ChatRoom chatRoom;

    public enum Type{

        BASIC,NOTICE
    }
}
