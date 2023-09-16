package WOOMOOL.DevSquad.block.service;

import WOOMOOL.DevSquad.block.entity.Block;
import WOOMOOL.DevSquad.block.repository.BlockRepository;
import WOOMOOL.DevSquad.exception.BusinessLogicException;
import WOOMOOL.DevSquad.member.entity.Member;
import WOOMOOL.DevSquad.member.entity.MemberProfile;
import WOOMOOL.DevSquad.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static WOOMOOL.DevSquad.exception.ExceptionCode.*;

@Service
@RequiredArgsConstructor
public class BlockService {

    private final MemberService memberService;
    private final BlockRepository blockRepository;


    public void setBlockMember(long blockMemberId, String reportContent) {

        // 현재 로그인한 회원의 프로필
        MemberProfile loginMemberProfile = findloginMemberProfile();

        // 자신을 차단할 수 는 없음
        if (loginMemberProfile.getMemberProfileId() == blockMemberId)
            throw new BusinessLogicException(CANT_SELF_BLOCKING);

        // 블랙 리스트 확인하고 중복 차단이 되지 않게
        List<Long> blockMemberIdList = loginMemberProfile.getBlockList().stream()
                .map(block -> block.getBlockMemberId())
                .collect(Collectors.toList());
        // Id로 변환한 블랙리스트에 같은 id 값 있으면 exception
        if (blockMemberIdList.contains(blockMemberId))
            throw new BusinessLogicException(DUPLICATE_BLOCKING);

        // 차단할 멤버 닉네임 값을 얻기 위해 멤버 객체 생성..
        Member findMember = memberService.findMember(blockMemberId);
        // 차단 멤버 객체 생성
        Block block = new Block(blockMemberId, reportContent, findMember.getNickname());
        // 현재 로그인한 회원 정보에 차단 멤버 객체 넣고
        loginMemberProfile.addBlockMember(block);
        // 차단 멤버 객체에도 현재 로그인 회원 정보 넣어주기
        block.setMemberProfile(loginMemberProfile);

        blockRepository.save(block);
    }

    public void deleteBlockMember(Long blockMemberId) {

        // 현재 로그인한 회원의 프로필
        MemberProfile loginMemberProfile = findloginMemberProfile();
        Long loginMemberProfileId = loginMemberProfile.getMemberProfileId();

        // 삭제할 차단 멤버 객체 찾기
        Optional<Block> optionalBlockMember = blockRepository.findByBlockMemberIdByMemberProfileId(blockMemberId,loginMemberProfileId);
        Block findBlock = optionalBlockMember.orElseThrow(() -> new BusinessLogicException(NOT_BLOCKED_MEMBER));

        loginMemberProfile.getBlockList().remove(findBlock);

        // DB 에 차단 멤버 객체 삭제
        blockRepository.delete(findBlock);

    }

    // 현재 로그인 중인 회원 프로필 찾기
    private MemberProfile findloginMemberProfile() {

        Member loginMember = memberService.findMemberFromToken();
        MemberProfile loginMemberProfile = loginMember.getMemberProfile();

        return loginMemberProfile;
    }
}
