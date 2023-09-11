package WOOMOOL.DevSquad.member.controller;

import WOOMOOL.DevSquad.infoboard.dto.InfoBoardDto;
import WOOMOOL.DevSquad.infoboard.entity.InfoBoard;
import WOOMOOL.DevSquad.infoboard.mapper.InfoBoardMapper;
import WOOMOOL.DevSquad.infoboard.repository.InfoBoardRepository;
import WOOMOOL.DevSquad.member.dto.NicknameDto;
import WOOMOOL.DevSquad.member.dto.PasswordDto;
import WOOMOOL.DevSquad.member.dto.MemberPostDto;
import WOOMOOL.DevSquad.member.dto.MemberProfileDto;
import WOOMOOL.DevSquad.member.entity.Member;
import WOOMOOL.DevSquad.member.entity.MemberProfile;
import WOOMOOL.DevSquad.member.mapper.MemberMapper;
import WOOMOOL.DevSquad.member.service.MemberService;
import WOOMOOL.DevSquad.projectboard.dto.ProjectDto;
import WOOMOOL.DevSquad.projectboard.entity.Project;
import WOOMOOL.DevSquad.projectboard.mapper.ProjectMapper;
import WOOMOOL.DevSquad.projectboard.repository.ProjectRepository;
import WOOMOOL.DevSquad.questionboard.dto.QuestionBoardDto;
import WOOMOOL.DevSquad.questionboard.entity.QuestionBoard;
import WOOMOOL.DevSquad.questionboard.mapper.QuestionBoardMapper;
import WOOMOOL.DevSquad.questionboard.repository.QuestionBoardRepository;
import WOOMOOL.DevSquad.studyboard.dto.StudyDto;
import WOOMOOL.DevSquad.studyboard.entity.Study;
import WOOMOOL.DevSquad.studyboard.mapper.StudyMapper;
import WOOMOOL.DevSquad.studyboard.repository.StudyRepository;
import WOOMOOL.DevSquad.utils.PageResponseDto;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;


@RestController
@RequestMapping("/members")
@Validated
@AllArgsConstructor
public class MemberController {
    private final MemberService memberService;
    private final MemberMapper memberMapper;
    private final ProjectMapper projectMapper;
    private final StudyMapper studyMapper;
    private final InfoBoardMapper infoBoardMapper;
    private final QuestionBoardMapper questionBoardMapper;

    //멤버 생성
    @PostMapping
    public ResponseEntity createMember(@Valid @RequestBody MemberPostDto postDto) {
        Member member = memberMapper.postDtoToEntity(postDto);
        memberService.createMember(member);

        return new ResponseEntity(HttpStatus.CREATED);
    }

    // 멤버 프로필 수정
    @PatchMapping()
    public ResponseEntity patchMemberProfile(@Valid @RequestBody MemberProfileDto.Patch patchDto) {
        MemberProfile memberProfile = memberMapper.patchDtoToEntity(patchDto);

        MemberProfile updateProfile = memberService.updateMemberProfile(memberProfile, patchDto.getPosition(), patchDto.getStack());
        MemberProfileDto.patchResponse response = memberMapper.entityToPatchResponseDto(updateProfile);

        return new ResponseEntity(response, HttpStatus.OK);
    }

    // 내 프로필 조회
    @GetMapping()
    public ResponseEntity getMyProfile(@RequestBody PasswordDto passwordDto) {

        // 조회 전 비밀번호 확인하기
        memberService.checkPassword(passwordDto.getRawPassword());

        MemberProfile memberProfile = memberService.getMyProfile();
        MemberProfileDto.myProfileResponse response = memberMapper.entityToResponseDto(memberProfile);

        return new ResponseEntity(response, HttpStatus.OK);
    }
    // 회원이 쓴 프로젝트 게시판 조회
    @GetMapping("/{member-id}/project")
    public ResponseEntity getMemberProjectBoard(@PathVariable("member-id") Long memberId,
                                                @RequestParam int page){

        Page<Project> projectListPage = memberService.getProjectBoardList(memberId,page-1);
        List<Project> projectList = projectListPage.getContent();
        List<ProjectDto.previewResponseDto> response = projectMapper.entityToPreviewResponseDto(projectList);

        return new ResponseEntity(new PageResponseDto(response,projectListPage),HttpStatus.OK);

    }
    // 회원이 쓴 스터디 게시판 조회
    @GetMapping("/{member-id}/study")
    public ResponseEntity getMemberStudyBoard(@PathVariable("member-id") Long memberId,
                                              @RequestParam int page){

        Page<Study> studyListPage = memberService.getStudyBoardList(memberId,page-1);
        List<Study> studytList = studyListPage.getContent();
        List<StudyDto.previewResponseDto> response = studyMapper.entityToPreviewResponseDto(studytList);

        return new ResponseEntity(new PageResponseDto(response,studyListPage),HttpStatus.OK);

    }
    // 회원이 쓴 정보게시판 조회
    @GetMapping("/{member-id}/info")
    public ResponseEntity getMemberInfoBoard(@PathVariable("member-id") Long memberId,
                                             @RequestParam int page){

        Page<InfoBoard> infoBoardListPage = memberService.getInfoBoardList(memberId,page-1);
        List<InfoBoard> infoBoardList = infoBoardListPage.getContent();
        List<InfoBoardDto.Response> response = infoBoardMapper.InfoBoardListToInfoBoardResponseDtoList(infoBoardList);

        return new ResponseEntity(new PageResponseDto(response,infoBoardListPage),HttpStatus.OK);

    }

    // 회원이 쓴 질문게시판 조회
    @GetMapping("/{member-id}/question")
    public ResponseEntity getMemberQuestionBoard(@PathVariable("member-id") Long memberId,
                                                 @RequestParam int page){

        Page<QuestionBoard> questionBoardListPage = memberService.getQuestionBoardList(memberId,page-1);
        List<QuestionBoard> questionBoardList = questionBoardListPage.getContent();
        List<QuestionBoardDto.Response> response = questionBoardMapper.QuestionBoardListToQuestionBoardResponseDtoList(questionBoardList);

        return new ResponseEntity(new PageResponseDto(response,questionBoardListPage),HttpStatus.OK);
    }

    // 좋아요한 정보게시판
    @GetMapping("/likes/info")
    public ResponseEntity getMemberLikeInfoBoard(@RequestParam int page){

        Page<InfoBoard> infoBoardPage = memberService.getLikeInfoBoardList(page-1);
        List<InfoBoard> infoBoardList = infoBoardPage.getContent();
        List<InfoBoardDto.Response> response = infoBoardMapper.InfoBoardListToInfoBoardResponseDtoList(infoBoardList);

        return new ResponseEntity(new PageResponseDto<>(response,infoBoardPage),HttpStatus.OK);
    }
    // 좋아요한 질문게시판
    @GetMapping("/likes/question")
    public ResponseEntity getMemberLikeQuestionBoard(@RequestParam int page){

        Page<QuestionBoard> questionBoardPage = memberService.getLikeQuestionBoard(page-1);
        List<QuestionBoard> questionBoardList = questionBoardPage.getContent();
        List<QuestionBoardDto.Response> response = questionBoardMapper.QuestionBoardListToQuestionBoardResponseDtoList(questionBoardList);

        return new ResponseEntity(new PageResponseDto<>(response,questionBoardPage),HttpStatus.OK);

    }

    // todo: 북마크

    // 유저리스트의 유저 정보 조회
    @GetMapping("/{member-id}")
    public ResponseEntity getMemberProfile(@PathVariable("member-id") Long memberId){

        MemberProfile memberProfile = memberService.getMemberProfile(memberId);
        List<ProjectDto.previewResponseDto> projectResponses = projectMapper.entityToPreviewResponseDto(memberProfile.getProjectlist());
        List<StudyDto.previewResponseDto> studyResponse = studyMapper.entityToPreviewResponseDto(memberProfile.getStudyList());
        List<InfoBoardDto.Response> infoBoardResponse = infoBoardMapper.InfoBoardListToInfoBoardResponseDtoList(memberProfile.getInfoBoardList());

        MemberProfileDto.memberProfileResponse response = memberMapper.entityToResponseDto(memberProfile,projectResponses,studyResponse,infoBoardResponse);

        return new ResponseEntity(response, HttpStatus.OK);

    }

    // 나의 유저 리스트 조회 8명 까지 + 포지션, 스택 별로 필터링 (차단한 회원은 안보이게)
    @GetMapping("/myList")
    public ResponseEntity getMyMemberProfiles(@RequestParam int page,
                                            @RequestParam(required = false) String nickname,
                                            @RequestParam(required = false) List<String> positions,
                                            @RequestParam(required = false) List<String> stacks) {

        Page<MemberProfile> memberProfilePage;
        // 포지션 필터링
        if (positions != null) {

            memberProfilePage = memberService.getMemberProfilesByPosition(page - 1, positions);
        // 스택 필터링
        } else if (stacks != null) {

            memberProfilePage = memberService.getMemberProfilesByStack(page - 1, stacks);
        // 필터링 X
        } else if ( nickname != null ){
            memberProfilePage = memberService.getMemberProfileByNickname(page-1, nickname);
        }
        else {

            memberProfilePage = memberService.getMemberProfilePage(page - 1);

        }

        List<MemberProfile> memberProfileList = memberService.getMyMemberProfiles(memberProfilePage);
        List<MemberProfileDto.listResponse> response = memberMapper.entityToResponseDto(memberProfileList);


        return new ResponseEntity(new PageResponseDto<>(response, memberProfilePage), HttpStatus.OK);
    }
    // 로그인하지 않고도 볼 수 있는 회원 리스트
    @GetMapping("/list")
    public ResponseEntity getMemberProfiles(@RequestParam int page,
                                            @RequestParam(required = false) String nickname,
                                            @RequestParam(required = false) List<String> positions,
                                            @RequestParam(required = false) List<String> stacks) {

        Page<MemberProfile> memberProfilePage;
        // 포지션 필터링
        if (positions != null) {

            memberProfilePage = memberService.getMemberProfilesByPosition(page - 1, positions);
            // 스택 필터링
        } else if (stacks != null) {

            memberProfilePage = memberService.getMemberProfilesByStack(page - 1, stacks);
            // 필터링 X
        } else if (nickname != null){

            memberProfilePage = memberService.getMemberProfileByNickname(page-1, nickname);
        }
        else {

            memberProfilePage = memberService.getMemberProfilePage(page - 1);

        }

        List<MemberProfile> memberProfileList = memberService.getMemberProfile(memberProfilePage);
        List<MemberProfileDto.listResponse> response = memberMapper.entityToResponseDto(memberProfileList);


        return new ResponseEntity(new PageResponseDto<>(response, memberProfilePage), HttpStatus.OK);
    }

    // 회원 탈퇴
    @DeleteMapping
    public ResponseEntity deleteMember() {

        memberService.deleteMember();

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    // 중복 닉네임 확인
    @GetMapping("/checkNickname")
    public ResponseEntity checkNickname(@Valid @RequestBody NicknameDto nickname) {

        memberService.checkNickname(nickname.getNickname());

        return new ResponseEntity(HttpStatus.OK);
    }

    // 비밀번호 변경
    @PatchMapping("/password")
    public ResponseEntity changePassword(@Valid @RequestBody PasswordDto passwordDto) {

        memberService.changePassword(passwordDto.getRawPassword(), passwordDto.getChangePassword());

        return new ResponseEntity(HttpStatus.OK);
    }
}
