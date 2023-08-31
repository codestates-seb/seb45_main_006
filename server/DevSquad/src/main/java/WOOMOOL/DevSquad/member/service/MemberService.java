package WOOMOOL.DevSquad.member.service;

import WOOMOOL.DevSquad.auth.userdetails.MemberAuthority;
import WOOMOOL.DevSquad.member.entity.Member;
import WOOMOOL.DevSquad.member.entity.MemberProfile;
import WOOMOOL.DevSquad.member.repository.MemberProfileRepository;
import WOOMOOL.DevSquad.member.repository.MemberRepository;
import WOOMOOL.DevSquad.position.service.PositionService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static WOOMOOL.DevSquad.member.entity.MemberProfile.MemberStatus.MEMBER_ACTIVE;
import static WOOMOOL.DevSquad.member.entity.MemberProfile.MemberStatus.MEMBER_QUIT;

@Service
@Transactional
@Slf4j
public class MemberService {
    private final MemberRepository memberRepository;
    private final MemberProfileRepository memberProfileRepository;
    private final PositionService positionService;
    private final PasswordEncoder passwordEncoder;
    private final MemberAuthority memberAuthority;

    public MemberService(MemberRepository memberRepository, MemberProfileRepository memberProfileRepository, PositionService positionService, PasswordEncoder passwordEncoder, MemberAuthority memberAuthority) {
        this.memberRepository = memberRepository;
        this.memberProfileRepository = memberProfileRepository;
        this.positionService = positionService;
        this.passwordEncoder = passwordEncoder;
        this.memberAuthority = memberAuthority;
    }

    // 멤버 생성
    public Member createMember(Member member) {

        verifyExistEmail(member.getEmail());
        // 기본 값 프로필 객체 생성하고 넣기
        MemberProfile memberProfile = new MemberProfile();
        memberProfile.setNickname(member.getNickname());
        member.addProfile(memberProfile);
        // 패스워드 암호화
        String encodedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encodedPassword);
        // 권한 추가
        List<String> roles = memberAuthority.createRoles(member.getEmail());
        member.setRoles(roles);


        Member createMember = memberRepository.save(member);

        return createMember;

    }

    // 프로필 수정
    public MemberProfile updateMemberProfile(MemberProfile memberProfile, List<String> position) {

        Member findMember = findMemberFromToken();
        MemberProfile findMemberProfile = findMember.getMemberProfile();

        positionService.createPosition(position, findMemberProfile);

        Optional.ofNullable(memberProfile.getNickname()).ifPresent(nickname -> findMemberProfile.setNickname(nickname));
        Optional.ofNullable(memberProfile.getProfilePicture()).ifPresent(profilePicture -> findMemberProfile.setProfilePicture(profilePicture));
        Optional.ofNullable(memberProfile.getGithubId()).ifPresent(githubId -> findMemberProfile.setGithubId(githubId));
        Optional.ofNullable(memberProfile.getIntroduction()).ifPresent(introduction -> findMemberProfile.setIntroduction(introduction));
        Optional.ofNullable(memberProfile.isListEnroll()).ifPresent(listEnroll -> findMemberProfile.setListEnroll(listEnroll));

        return findMemberProfile;
    }

    // 프로필 조회
    @Transactional(readOnly = true)
    public MemberProfile getMemberProfile() {

        Member findMember = findMemberFromToken();
        MemberProfile findMemberProfile = findMember.getMemberProfile();

        return findMemberProfile;
    }


    // 유저 리스트 페이지
    public Page<MemberProfile> getMemberProfilePage(int page) {

        return memberProfileRepository.findAll(PageRequest.of(page, 10, Sort.by("memberProfileId")));
    }

    // 활동중, 등록 처리한 유저리스트 조회
    public List<MemberProfile> getMemberProfiles(Page<MemberProfile> memberProfilePage) {

        return memberProfilePage.getContent().stream()
                .filter(memberProfile -> memberProfile.getMemberStatus().equals(MEMBER_ACTIVE))
                .filter(memberProfile -> memberProfile.isListEnroll() == true)
                .collect(Collectors.toList());
    }

    // 회원 탈퇴 soft delete
    public void deleteMember() {

        Member findMember = findMemberFromToken();
        findMember.getMemberProfile().setMemberStatus(MEMBER_QUIT);
    }


    // 동일 이메일 가입 확인 메서드
    private void verifyExistEmail(String email) {

        Optional<Member> optionalMember = memberRepository.findByEmail(email);
        // todo: 예외처리하기
        if (optionalMember.isPresent()) throw new RuntimeException();
    }

    // 토큰으로 멤버객체 찾기
    public Member findMemberFromToken() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        log.info("username : {}" , username);
        Optional<Member> optionalMember = memberRepository.findByEmail(username);

        //todo: 예외처리
        Member findMember = optionalMember.orElseThrow(() -> new RuntimeException());
        isDeletedMember(findMember);

        return findMember;

    }

    // 중복 닉네임 확인
    public void checkNickname(String nickname) {

        Optional<Member> optionalMember = memberRepository.findByNickname(nickname);
        Member member = optionalMember.get();
        // todo: 예외처리하기
        if (optionalMember.isPresent() && member.getMemberProfile().getMemberStatus().equals(MEMBER_ACTIVE)) {
            throw new RuntimeException();
        }
    }

    // 탈퇴한 회원인지 확인 - 토큰쓰면 필요 없을 듯?
    private void isDeletedMember(Member member) {
        if (member.getMemberProfile().getMemberStatus().equals(MEMBER_QUIT)) {
            // todo: 예외처리하기
            throw new RuntimeException();
        }
    }
}

