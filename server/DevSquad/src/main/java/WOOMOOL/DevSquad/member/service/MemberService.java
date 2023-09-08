package WOOMOOL.DevSquad.member.service;

import WOOMOOL.DevSquad.auth.userdetails.MemberAuthority;
import WOOMOOL.DevSquad.exception.BusinessLogicException;
import WOOMOOL.DevSquad.exception.ExceptionCode;
import WOOMOOL.DevSquad.infoboard.entity.InfoBoard;
import WOOMOOL.DevSquad.infoboard.repository.InfoBoardRepository;
import WOOMOOL.DevSquad.level.entity.Level;
import WOOMOOL.DevSquad.member.entity.Member;
import WOOMOOL.DevSquad.member.entity.MemberProfile;
import WOOMOOL.DevSquad.member.repository.MemberProfileRepository;
import WOOMOOL.DevSquad.member.repository.MemberRepository;
import WOOMOOL.DevSquad.position.service.PositionService;
import WOOMOOL.DevSquad.projectboard.entity.Project;
import WOOMOOL.DevSquad.projectboard.repository.ProjectRepository;
import WOOMOOL.DevSquad.projectboard.service.ProjectService;
import WOOMOOL.DevSquad.stacktag.service.StackTagService;
import WOOMOOL.DevSquad.studyboard.entity.Study;
import WOOMOOL.DevSquad.studyboard.repository.StudyRepository;
import WOOMOOL.DevSquad.studyboard.service.StudyService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import static WOOMOOL.DevSquad.exception.ExceptionCode.*;
import static WOOMOOL.DevSquad.member.entity.MemberProfile.MemberStatus.MEMBER_ACTIVE;
import static WOOMOOL.DevSquad.member.entity.MemberProfile.MemberStatus.MEMBER_QUIT;

@Service
@Transactional
@Slf4j
@AllArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final MemberProfileRepository memberProfileRepository;
    private final PositionService positionService;
    private final PasswordEncoder passwordEncoder;
    private final MemberAuthority memberAuthority;
    private final StackTagService stackTagService;
    private final ProjectRepository projectRepository;
    private final StudyRepository studyRepository;
    private final InfoBoardRepository infoBoardRepository;

    // 멤버 생성
    public Member createMember(Member member) {

        // 나중에 메일 인증 기능 생기면 삭제해도 될듯
        verifyExistEmail(member.getEmail());

        // 패스워드 암호화
        String encodedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encodedPassword);

        // 기본 값 프로필 객체 생성하고 넣기
        MemberProfile memberProfile = new MemberProfile();
        memberProfile.setNickname(member.getNickname());
        member.addProfile(memberProfile);

        // 레벨 시스템 추가
        Level level = new Level();
        memberProfile.addLevel(level);

        // 권한 추가
        List<String> roles = memberAuthority.createRoles(member.getEmail());
        member.setRoles(roles);

        Member createMember = memberRepository.save(member);

        return createMember;

    }

    // 프로필 수정
    public MemberProfile updateMemberProfile(MemberProfile memberProfile, Set<String> position, Set<String> stackTag) {

        Member findMember = findMemberFromToken();
        MemberProfile findMemberProfile = findMember.getMemberProfile();

        // 스택과 포지션 수정
        positionService.createPosition(position, findMemberProfile);
        stackTagService.createStackTag(stackTag, findMemberProfile);

        // 기타 정보 수정
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

        // 프로젝트 리스트 정보
        List<Project> projectList = getMemberProjectList(findMember.getMemberId());
        findMemberProfile.setProjectlist(projectList);
        // 스터디 리스트 정보
        List<Study> studyList = getMemberStudyList(findMember.getMemberId());
        findMemberProfile.setStudyList(studyList);
        // 정보 게시판 리스트 정보
        List<InfoBoard> infoBoardList = getMemberInfoBoardList(findMember.getMemberId());
        findMemberProfile.setInfoBoardList(infoBoardList);
        // 북마크 정보

        return findMemberProfile;
    }

    //    필터없는 유저 리스트 페이지
    public Page<MemberProfile> getMemberProfilePage(int page) {
        // 정렬기준 뭐로할지?
        return memberProfileRepository.findAll(PageRequest.of(page, 8));
    }
    // 포지션 별로 필터링
    public Page<MemberProfile> getMemberProfilesByPosition(int page, List<String> positions) {

        List<MemberProfile> memberProfileList = memberProfileRepository.findAllByPositions(positions,positions.stream().count());
        Page<MemberProfile> memberProfilePage = new PageImpl<>(memberProfileList, PageRequest.of(page, 8), memberProfileList.size());

        return memberProfilePage;
    }

    // 스택 별로 필터링
    public Page<MemberProfile> getMemberProfilesByStack(int page, List<String> stacks) {

        List<MemberProfile> memberProfileList = memberProfileRepository.findAllByStackTags(stacks,stacks.stream().count());
        Page<MemberProfile> memberProfilePage = new PageImpl<>(memberProfileList, PageRequest.of(page, 8), memberProfileList.size());

        return memberProfilePage;
    }

    // 활동중, 등록 허가한 회원, 블랙리스트에 없는 유저리스트 조회
    public List<MemberProfile> getMemberProfiles(Page<MemberProfile> memberProfilePage) {

        // 블랙리스트 멤버에 있는 memberId를 List로 추출
        List<Long> blockMemberList = getBlockMemberId();

        // list에 등록되어 있고 활동중인 회원, 추출한 차단 memberId와 memberProfile 의 id가 같으면 필터링
        return memberProfilePage.getContent().stream()
                .filter(memberProfile -> !blockMemberList.contains(memberProfile.getMemberProfileId()))
                .collect(Collectors.toList());
    }


    // 회원 탈퇴 soft delete
    public void deleteMember() {

        Member findMember = findMemberFromToken();
        findMember.getMemberProfile().setMemberStatus(MEMBER_QUIT);
    }


    // 동일 이메일 가입 확인 메서드
    public void verifyExistEmail(String email) {

        Optional<Member> optionalMember = memberRepository.findByEmail(email);

        if (optionalMember.isPresent()) throw new BusinessLogicException(EXIST_EMAIL);
    }

    // 토큰으로 멤버객체 찾기
    public Member findMemberFromToken() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<Member> optionalMember = memberRepository.findByEmail(username);

        // 토큰으로 멤버를 못찾으면 토큰이 잘못된거니까 NO AUTH가 좀 더 어울릴 듯?
        Member findMember = optionalMember.orElseThrow(() -> new BusinessLogicException(NO_AUTHORIZATION));
        isDeletedMember(findMember);

        return findMember;

    }
    // 멤버객체 찾기
    public Member findMember(long memberId) {
        Optional<Member> optionalMember = memberRepository.findById(memberId);
        Member findMember = optionalMember.orElseThrow(() -> new BusinessLogicException(MEMBER_NOT_FOUND));

        return findMember;
    }

    // 중복 닉네임 확인
    public void checkNickname(String nickname) {

        Optional<Member> optionalMember = memberRepository.findByNickname(nickname);

        optionalMember.ifPresent(member -> {
                    if (member.getMemberProfile().getMemberStatus().equals(MEMBER_ACTIVE)) {

                        throw new BusinessLogicException(DUPLICATE_NICKNAME);
                    }
                }
        );
    }

    // 비밀번호 변경 메서드
    public void changePassword(String rawPassword, String changePassword) {

        checkPassword(rawPassword);
        String newEncodedPassword = passwordEncoder.encode(changePassword);

        Member updateMember = findMemberFromToken();
        updateMember.setPassword(newEncodedPassword);

    }

    // 비밀변호 변경 전 확인 메서드
    public void checkPassword(String rawPassword) {

        Member findMember = findMemberFromToken();
        String encodedPassword = findMember.getPassword();

        if (!passwordEncoder.matches(rawPassword, encodedPassword)) {

            throw new BusinessLogicException(UNMATCHED_PASSWORD);
        }
    }

    private List<Long> getBlockMemberId() {
        // 블랙리스트 멤버에 있는 memberId를 List로 추출
        List<Long> blockMemberList = findMemberFromToken().getMemberProfile().getBlockMemberList().stream()
                .map(blockMember -> blockMember.getBlockMemberId())
                .collect(Collectors.toList());

        return blockMemberList;
    }


    // 탈퇴한 회원인지 확인 - 토큰쓰면 필요 없을 듯?
    private void isDeletedMember(Member member) {
        if (member.getMemberProfile().getMemberStatus().equals(MEMBER_QUIT)) {

            throw new BusinessLogicException(QUITED_MEMBER);
        }
    }

    // 특정 멤버가 가지고 있는 프로젝트 리스트
    private List<Project> getMemberProjectList(Long memberProfileId) {

        List<Project> projectList = projectRepository.findByProjectStatusAndMemberProfile(memberProfileId);

        return projectList;
    }

    // 특정 멤버가 가지고 있는 스터디 리스트
    private List<Study> getMemberStudyList(Long memberProfileId) {

        List<Study> studyList = studyRepository.findByStudyStatusAndMemberProfile(memberProfileId);

        return studyList;
    }

    // 특정 멤버가 가지고 있는 정보게시판 리스트
    private List<InfoBoard> getMemberInfoBoardList(Long memberProfileId) {

        List<InfoBoard> infoBoardList = infoBoardRepository.findAllByMemberProfile(memberProfileId);

        return infoBoardList;
    }

    // 북마크한 게시판들
}



