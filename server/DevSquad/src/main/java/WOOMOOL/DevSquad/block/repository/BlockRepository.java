package WOOMOOL.DevSquad.block.repository;

import WOOMOOL.DevSquad.block.entity.Block;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BlockRepository extends JpaRepository<Block, Long>{

    Optional<Block> findByBlockMemberId(Long blockMemberId);
}
