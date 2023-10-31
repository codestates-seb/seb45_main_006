package WOOMOOL.DevSquad.notification.entity;

import WOOMOOL.DevSquad.member.entity.MemberProfile;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Notification{

    @Builder
    public Notification(MemberProfile receiver, NotificationType notificationType, String content, String url, Boolean isRead) {
        this.receiver = receiver;
        this.notificationType = notificationType;
        this.content = content;
        this.url = url;
        this.isRead = isRead;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "notificationId")
    private Long id;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private String url;

    @Column(nullable = false)
    private Boolean isRead;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private NotificationType notificationType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "memberProfileId")
    @OnDelete(action = OnDeleteAction.CASCADE) // One 객체 삭제시 같이 삭제
    private MemberProfile receiver;

    @Column
    private LocalDateTime createAt = LocalDateTime.now();


    public enum NotificationType {
        Board("게시글"),
        Chat("채팅"),
        Comment("댓글"),
        Answer("답변");

        @Getter
        String type;

        NotificationType(String type) {
            this.type = type;
        }
    }
}
