package WOOMOOL.DevSquad.position.repository;

import WOOMOOL.DevSquad.position.entity.Position;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PositionRepository extends JpaRepository<Position, Long> {

    Position findByPositionName(String positionName);

}

