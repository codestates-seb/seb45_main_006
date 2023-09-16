package WOOMOOL.DevSquad.block.repository;

import WOOMOOL.DevSquad.block.entity.Block;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface BlockRepository extends JpaRepository<Block, Long>{

    // 차단 회원 ID와 이 회원을 차단한 유저의 memberId로 Block 객체 찾기
    @Query("SELECT b FROM Block b WHERE b.blockMemberId = :blockMemberId AND b.memberProfile.memberProfileId = :memberProfileId")
    Optional<Block> findByBlockMemberIdByMemberProfileId(Long blockMemberId,Long memberProfileId);
}
