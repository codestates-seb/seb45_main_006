package WOOMOOL.DevSquad.blockmember.repository;

import WOOMOOL.DevSquad.blockmember.entity.BlockMember;
import org.springframework.cglib.core.Block;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface BlockMemberRepository extends JpaRepository<BlockMember, Long>{

    Optional<BlockMember> findByBlockId(Long blockId);
}
