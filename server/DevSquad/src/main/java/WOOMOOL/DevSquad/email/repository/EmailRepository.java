package WOOMOOL.DevSquad.email.repository;

import WOOMOOL.DevSquad.email.entity.Email;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmailRepository extends JpaRepository<Email,Long> {
    Email findByEmail(String email);
}
