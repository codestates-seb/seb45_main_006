package WOOMOOL.DevSquad.member.repository;

import WOOMOOL.DevSquad.member.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member,Long> {

    @Query("SELECT m FROM Member m WHERE m.email = :email AND m.memberProfile.memberStatus = 'MEMBER_ACTIVE'")
    Optional<Member> findByEmail(String email);
    Optional<Member> findByNickname(String nickname);




}
