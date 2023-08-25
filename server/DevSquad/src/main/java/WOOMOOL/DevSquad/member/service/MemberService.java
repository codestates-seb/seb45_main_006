package WOOMOOL.DevSquad.member.service;

import WOOMOOL.DevSquad.member.dto.MemberPostDto;
import WOOMOOL.DevSquad.member.dto.MemberProfileDto;
import WOOMOOL.DevSquad.member.entity.Member;
import WOOMOOL.DevSquad.member.entity.MemberProfile;
import WOOMOOL.DevSquad.member.repository.MemberRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class MemberService {
    private final MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }
// 멤버 생성
    public Member createMember(Member member){

        verifyExistEmail(member.getEmail());
        MemberProfile memberProfile = new MemberProfile();
        member.addProfile(memberProfile);

        Member createMember = memberRepository.save(member);


        return createMember;

    }
    public MemberProfile updateMemberProfile(MemberProfile memberProfile){

        MemberProfile findMemberProfile = verifyMember(memberProfile.getMemberProfileId());

        Optional.ofNullable(findMemberProfile.getProfilePicture()).ifPresent(findMemberProfile::setProfilePicture);
        Optional.ofNullable(findMemberProfile.getGithubId()).ifPresent(findMemberProfile::setGithubId);
        Optional.ofNullable(findMemberProfile.getIntroduction()).ifPresent(findMemberProfile::setIntroduction);
        Optional.ofNullable(findMemberProfile.getPositions()).ifPresent(findMemberProfile::setPositions);
        Optional.ofNullable(findMemberProfile.isListEnroll()).ifPresent(findMemberProfile::setListEnroll);

        return findMemberProfile;

    }


    // 동일 이메일 가입 확인 메서드
    private void verifyExistEmail(String email) {

        Optional<Member> optionalMember = memberRepository.findByEmail(email);
        // todo: 예외처리하기
        if(optionalMember.isPresent()) throw new RuntimeException();
    }
    // 유효한 회원인지 확인하고 프로필 리턴
    private MemberProfile verifyMember(Long memberProfileId){
        Optional<Member> optionalMember = memberRepository.findById(memberProfileId);
        // todo: 예외처리하기
        Member findMember = optionalMember.orElseThrow(() -> new RuntimeException());

        return findMember.getMemberProfile();
    }

}
