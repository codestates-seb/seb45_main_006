package WOOMOOL.DevSquad.member.repository;

import WOOMOOL.DevSquad.member.entity.Member;
import WOOMOOL.DevSquad.member.entity.MemberProfile;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface MemberProfileRepository extends JpaRepository<MemberProfile, Long> {

    Page<MemberProfile> findAll(Pageable pageable);


}
