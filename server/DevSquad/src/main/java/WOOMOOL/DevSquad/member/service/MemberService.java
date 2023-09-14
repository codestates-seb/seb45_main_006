package WOOMOOL.DevSquad.member.service;

import WOOMOOL.DevSquad.answer.entity.Answer;
import WOOMOOL.DevSquad.answer.repository.AnswerRepository;
import WOOMOOL.DevSquad.auth.userdetails.MemberAuthority;
import WOOMOOL.DevSquad.block.entity.Block;
import WOOMOOL.DevSquad.bookmark.repository.BookmarkRepository;
import WOOMOOL.DevSquad.exception.BusinessLogicException;
import WOOMOOL.DevSquad.infoboard.entity.InfoBoard;
import WOOMOOL.DevSquad.infoboard.repository.InfoBoardRepository;
import WOOMOOL.DevSquad.level.entity.Level;
import WOOMOOL.DevSquad.likes.repository.LikesRepository;
import WOOMOOL.DevSquad.member.entity.Member;
import WOOMOOL.DevSquad.member.entity.MemberProfile;
import WOOMOOL.DevSquad.member.repository.MemberProfileRepository;
import WOOMOOL.DevSquad.member.repository.MemberRepository;
import WOOMOOL.DevSquad.position.service.PositionService;
import WOOMOOL.DevSquad.projectboard.entity.Project;
import WOOMOOL.DevSquad.projectboard.repository.ProjectRepository;
import WOOMOOL.DevSquad.questionboard.entity.QuestionBoard;
import WOOMOOL.DevSquad.questionboard.repository.QuestionBoardRepository;
import WOOMOOL.DevSquad.stacktag.service.StackTagService;
import WOOMOOL.DevSquad.studyboard.entity.Study;
import WOOMOOL.DevSquad.studyboard.repository.StudyRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.*;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
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
    private final QuestionBoardRepository questionBoardRepository;
    private final LikesRepository likesRepository;
    private final BookmarkRepository bookmarkRepository;
    private final EntityManager entityManager;

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
        Optional.ofNullable(memberProfile.getNickname()).ifPresent(nickname -> findMemberProfile.getMember().setNickname(nickname));
        Optional.ofNullable(memberProfile.getProfilePicture()).ifPresent(profilePicture -> findMemberProfile.setProfilePicture(profilePicture));
        Optional.ofNullable(memberProfile.getGithubId()).ifPresent(githubId -> findMemberProfile.setGithubId(githubId));
        Optional.ofNullable(memberProfile.getIntroduction()).ifPresent(introduction -> findMemberProfile.setIntroduction(introduction));
        Optional.ofNullable(memberProfile.isListEnroll()).ifPresent(listEnroll -> findMemberProfile.setListEnroll(listEnroll));

        return findMemberProfile;
    }

    // 프로필 조회
    @Transactional(readOnly = true)
    public MemberProfile getMyProfile() {

        Member findMember = findMemberFromToken();
        MemberProfile findMemberProfile = findMember.getMemberProfile();

        return findMemberProfile;
    }

    // 유저 리스트 유저 정보
    @Transactional(readOnly = true)
    public MemberProfile getMemberProfile(Long memberId) {

        Member findMember = findMember(memberId);
        MemberProfile findMemberProfile = findMember.getMemberProfile();

        // 멤버가 가지고 있는 게시판 정보 넣어주기
        setBoardList(findMemberProfile, findMember.getMemberId());

        return findMemberProfile;
    }

    //필터없는 활동중이고 리스트 등록되어있는 유저 리스트 페이지
    @Transactional(readOnly = true)
    public Page<MemberProfile> getMemberProfilePage(int page) {
        // 최근 활동으로 정렬
        List<MemberProfile> memberProfileList = memberProfileRepository.findAll();
        Page<MemberProfile> memberProfilePage = getMemberProfilePage(page, memberProfileList);

        return memberProfilePage;

    }

    // 유저 리스트 필터링
    @Transactional(readOnly = true)
    public Page<MemberProfile> getFilteredMemberProfile(int page,String nickname,List<String> positions,List<String> stacks){

        List<MemberProfile> memberProfileList = getFilteredMemberProfileList(nickname, positions,stacks);
        Page<MemberProfile> memberProfilePage = getMemberProfilePage(page,memberProfileList);

        return memberProfilePage;
    }

    // 비로그인 회원은 모든 유저 리스트 , 로그인한 유저는 리스트에서 차단한 멤버 정보 삭제
    public List<MemberProfile> removeBloackMemberProfileList(List<MemberProfile> memberProfileList) {


        // 비로그인은 바로 리스트 반환
        if (SecurityContextHolder.getContext().getAuthentication().getName().equals("anonymousUser"))

            return memberProfileList;

        else {
            // 로그인한 유저면 필터링

            // 차단 유저 아이디 정보 조회
            List<Long> blockMemberList = getBlockMemberId();

            return memberProfileList.stream()
                    .filter(memberProfile -> !blockMemberList.contains(memberProfile.getMemberProfileId()))
                    .collect(Collectors.toList());
        }
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

        // 토큰에서 걸러져서 굳이 필요 없을 듯..?
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
        List<Long> blockMemberList = findMemberFromToken().getMemberProfile().getBlockList().stream()
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

    // 유저 리스트 유저 정보에 해당 유저가 작성한 게시글 정보 넣기
    private void setBoardList(MemberProfile memberProfile, Long memberProfileId) {

        // 프로젝트 리스트 정보
        List<Project> projectList = getMemberProjectList(memberProfileId);
        memberProfile.setProjectlist(projectList);
        // 스터디 리스트 정보
        List<Study> studyList = getMemberStudyList(memberProfileId);
        memberProfile.setStudyList(studyList);
        // 정보 게시판 리스트 정보
        List<InfoBoard> infoBoardList = getMemberInfoBoardList(memberProfileId);
        memberProfile.setInfoBoardList(infoBoardList);
        // 질문 게시판 리스트 정보
        List<QuestionBoard> questionBoardList = getMemberQuestionList(memberProfileId);
        memberProfile.setQuestionBoardList(questionBoardList);

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

    // 특정 멤버가 가지고 있는 질문게시판 리스트
    private List<QuestionBoard> getMemberQuestionList(Long memberProfileId) {
        List<QuestionBoard> questionBoardList = questionBoardRepository.findAllByMemberProfile(memberProfileId);

        return questionBoardList;
    }

    // 프로필리스트 페이징
    private Page<MemberProfile> getMemberProfilePage(int page, List<MemberProfile> memberProfileList) {

        // 차단한 회원 걸러낸 리스트
        List<MemberProfile> filteringMemberProfileList = removeBloackMemberProfileList(memberProfileList);
        // 페이징 처리
        int pageSize = 8;
        int totalElements = filteringMemberProfileList.size();
        // 최근 활동 순으로 정렬
        Sort sort = Sort.by("modifiedAt");

        // 페이징 처리된 결과 페이지 생성
        PageRequest pageRequest = PageRequest.of(page, pageSize, sort);

        List<MemberProfile> content = filteringMemberProfileList.subList(page * pageSize, Math.min((page + 1) * pageSize, totalElements));
        Page<MemberProfile> memberProfilePage = new PageImpl<>(content, pageRequest, totalElements);

        return memberProfilePage;
    }

    //좋아요한 정보 게시판
    public Page<InfoBoard> getLikeInfoBoardList(int page) {

        Member findMember = findMemberFromToken();

        Page<InfoBoard> infoBoardPage = likesRepository
                .findInfoBoardByLikedMemberId(findMember.getMemberId(), PageRequest.of(page, 8, Sort.by("createdAt").descending()));

        return infoBoardPage;

    }

    //좋아요한 질문 게시판
    public Page<QuestionBoard> getLikeQuestionBoard(int page) {

        Member findMember = findMemberFromToken();

        Page<QuestionBoard> questionBoardPage = likesRepository
                .findQuestionBoardByLikedMemberId(findMember.getMemberId(), PageRequest.of(page, 8, Sort.by("createdAt").descending()));

        return questionBoardPage;
    }


    // 북마크한 게시판들
    public Page<QuestionBoard> getBooMarkedQuestionBoard(int page) {

        Member findMember = findMemberFromToken();

        Page<QuestionBoard> questionBoardPage = bookmarkRepository
                .findQuestionByBookmarkedMemberId(findMember.getMemberId(), PageRequest.of(page, 8, Sort.by("createdAt").descending()));

        return questionBoardPage;
    }

    public Page<InfoBoard> getBooMarkedInfoBoardBoard(int page) {

        Member findMember = findMemberFromToken();

        Page<InfoBoard> infoBoardPage = bookmarkRepository
                .findInfoByBookmarkedMemberId(findMember.getMemberId(), PageRequest.of(page, 8, Sort.by("createdAt").descending()));

        return infoBoardPage;
    }

    public Page<Project> getBooMarkedProjectBoard(int page) {

        Member findMember = findMemberFromToken();

        Page<Project> projectBoardPage = bookmarkRepository
                .findProjectByBookmarkedMemberId(findMember.getMemberId(), PageRequest.of(page, 8, Sort.by("createdAt").descending()));

        return projectBoardPage;
    }

    public Page<Study> getBooMarkedStudyBoard(int page) {

        Member findMember = findMemberFromToken();

        Page<Study> studyBoardPage = bookmarkRepository
                .findStudyByBookmarkedMemberId(findMember.getMemberId(), PageRequest.of(page, 8, Sort.by("createdAt").descending()));

        return studyBoardPage;
    }
//// 여기까지

    // 출석체크
    public void attendanceCheck() {

        MemberProfile memberProfile = findMemberFromToken().getMemberProfile();
        Level level = memberProfile.getLevel();

        isAttendanceChecked();

        memberProfile.setAttendanceChecked(true);

        if (level.getCurrentExp() < level.getMaxExp()) {
            level.setCurrentExp(level.getCurrentExp() + 1);
        }
    }

    private void isAttendanceChecked() {

        MemberProfile memberProfile = findMemberFromToken().getMemberProfile();

        if (memberProfile.isAttendanceChecked()) throw new BusinessLogicException(CHECK_COMPLETED);

    }

    // 매일 자정 출석체크 초기화
    @Scheduled(cron = "0 0 0 * * ?")
    protected void resetAttendanceCheck() {

        List<MemberProfile> memberProfileList = memberProfileRepository.findAll();

        for (MemberProfile memberProfile : memberProfileList) {
            memberProfile.setAttendanceChecked(false);
        }
        memberProfileRepository.saveAll(memberProfileList);

    }

    // 유저 리스트 필터링 기능
    private List<MemberProfile> getFilteredMemberProfileList(String nickname, List<String> positions, List<String> stacks) {

        // jpql 쿼리 문 작성
        StringBuilder jpql = new StringBuilder("SELECT mp FROM MemberProfile mp WHERE 1 = 1");

        // 필터 조건에 따라 쿼리문 추가
        if (nickname != null) {
            jpql.append(" AND LOWER(mp.nickname) LIKE CONCAT('%', LOWER(:nickname), '%') " +
                    "AND mp.memberStatus = 'MEMBER_ACTIVE' " +
                    "AND mp.listEnroll = true");
        }

        if (positions != null) {
            jpql.append(" AND mp IN (SELECT mp FROM MemberProfile mp " +
                    "JOIN mp.positions p " +
                    "WHERE p.positionName IN :positionNames " +
                    "AND mp.memberStatus = 'MEMBER_ACTIVE' " +
                    "AND mp.listEnroll = true " +
                    "GROUP BY mp HAVING COUNT(p) IN :positionCount)");
        }

        if(stacks != null){
            jpql.append(" AND mp IN (SELECT mp FROM MemberProfile mp JOIN mp.stackTags st " +
                    "WHERE st.tagName IN :tagNames " +
                    "AND mp.memberStatus = 'MEMBER_ACTIVE' " +
                    "AND mp.listEnroll = true " +
                    "GROUP BY mp HAVING COUNT(st) IN :tagCount)");

        }

        TypedQuery<MemberProfile> query = entityManager.createQuery(jpql.toString(), MemberProfile.class);

        // 쿼리 파라미터 추가
        if(nickname != null) {
            query.setParameter("nickname", nickname);
        }

        if(positions != null) {
            query.setParameter("positionNames", positions);
            query.setParameter("positionCount", positions.stream().count());
        }

        if(stacks != null) {
            query.setParameter("tagNames", stacks);
            query.setParameter("tagCount", stacks.stream().count());
        }

        return query.getResultList();

    }
}



