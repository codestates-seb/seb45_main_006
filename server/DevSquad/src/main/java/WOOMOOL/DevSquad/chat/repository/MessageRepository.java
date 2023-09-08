package WOOMOOL.DevSquad.chat.repository;

import WOOMOOL.DevSquad.chat.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<Message,Long> {
}
