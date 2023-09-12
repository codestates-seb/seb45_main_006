package WOOMOOL.DevSquad.member.repository;

import WOOMOOL.DevSquad.member.entity.MemberProfile;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;

import java.util.List;

public interface MemberProfileRepository extends JpaRepository<MemberProfile, Long> {

    // list에 등록하고 활동 중인 회원만
    @Query("SELECT mp FROM MemberProfile mp WHERE mp.memberStatus = 'MEMBER_ACTIVE' AND mp.listEnroll = true")
    List<MemberProfile> findAll();


    // 포지션에 따라서 핕터링 하기
    @Query("SELECT mp FROM MemberProfile mp JOIN mp.positions p " +
            "WHERE p.positionName IN :positionNames " +
            "AND mp.memberStatus = 'MEMBER_ACTIVE' AND mp.listEnroll = true " +
            "GROUP BY mp HAVING COUNT(p) IN :positionCount")
    List<MemberProfile> findAllByPositions(List<String> positionNames,Long positionCount );

    // 스택에 따라서 필터링하기
    @Query("SELECT mp FROM MemberProfile mp JOIN mp.stackTags st " +
            "WHERE st.tagName IN :tagNames " +
            "AND mp.memberStatus = 'MEMBER_ACTIVE' AND mp.listEnroll = true " +
            "GROUP BY mp HAVING COUNT(st) IN :tagCount")
    List<MemberProfile> findAllByStackTags(List<String> tagNames,Long tagCount);

    // 이름으로 필터링

    @Query("SELECT mp FROM MemberProfile mp " +
            "WHERE LOWER(mp.nickname) LIKE CONCAT('%',LOWER(:nickname) ,'%') " +
            "AND mp.memberStatus = 'MEMBER_ACTIVE' " +
            "AND mp.listEnroll = true")
    List<MemberProfile> findAllByNickname(String nickname);

}
