package WOOMOOL.DevSquad.notification.repository;

import WOOMOOL.DevSquad.notification.entity.Notification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {

    @Query("SELECT n FROM Notification n WHERE n.receiver.memberProfileId = :memberId")
    List<Notification> findByMemberId(Long memberId);
    @Query("SELECT n FROM Notification n WHERE n.receiver.memberProfileId = :memberId")
    Page<Notification> findByMemberId(Long memberId, Pageable pageable);

    @Modifying
    @Transactional
    @Query("DELETE FROM Notification n WHERE n.receiver.memberProfileId = :memberId")
    void deleteAllByReceiverId(Long memberId);

}
