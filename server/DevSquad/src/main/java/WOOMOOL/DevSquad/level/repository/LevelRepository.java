package WOOMOOL.DevSquad.level.repository;


import WOOMOOL.DevSquad.level.entity.Level;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LevelRepository extends JpaRepository<Level, Long> {

    Level findByMemberId(Long memberId);
}
