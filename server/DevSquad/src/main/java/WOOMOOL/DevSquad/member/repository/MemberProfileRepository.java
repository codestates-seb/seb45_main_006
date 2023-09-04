package WOOMOOL.DevSquad.member.repository;

import WOOMOOL.DevSquad.member.entity.Member;
import WOOMOOL.DevSquad.member.entity.MemberProfile;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface MemberProfileRepository extends JpaRepository<MemberProfile, Long> {

    // list에 등록하고 활동 중인 회원만
    @Query("SELECT mp from MemberProfile mp WHERE mp.listEnroll = true and mp.memberStatus = 'ACTIVE'")
    Page<MemberProfile> findAll(Pageable pageable);

}
