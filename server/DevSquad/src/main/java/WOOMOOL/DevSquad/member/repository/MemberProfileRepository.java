package WOOMOOL.DevSquad.member.repository;

import WOOMOOL.DevSquad.member.entity.MemberProfile;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberProfileRepository extends JpaRepository<MemberProfile, Long> {

}
