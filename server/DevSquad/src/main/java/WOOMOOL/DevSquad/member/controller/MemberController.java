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
import io.swagger.annotations.*;
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
@Api(tags = {"회원 기능에 대한 API"})
public class MemberController {
    private final MemberService memberService;
    private final MemberMapper memberMapper;
    private final ProjectMapper projectMapper;
    private final StudyMapper studyMapper;
    private final InfoBoardMapper infoBoardMapper;
    private final QuestionBoardMapper questionBoardMapper;

    //멤버 생성
    @ApiOperation(value = "회원가입", notes = "회원 가입 API, 토큰 필요 X")
    @PostMapping
    public ResponseEntity createMember(@Valid @RequestBody MemberPostDto postDto) {
        Member member = memberMapper.postDtoToEntity(postDto);
        memberService.createMember(member);

        return new ResponseEntity(HttpStatus.CREATED);
    }

    // 멤버 프로필 수정
    @ApiOperation(value = "회원정보 수정", notes = "회원정보 수정 API")
    @PatchMapping
    public ResponseEntity patchMemberProfile(@Valid @RequestBody MemberProfileDto.Patch patchDto) {
        MemberProfile memberProfile = memberMapper.patchDtoToEntity(patchDto);

        MemberProfile updateProfile = memberService.updateMemberProfile(memberProfile, patchDto.getPosition(), patchDto.getStack());
        MemberProfileDto.patchResponse response = memberMapper.entityToPatchResponseDto(updateProfile);

        return new ResponseEntity(response, HttpStatus.OK);
    }

    // 내 프로필 조회
    @ApiOperation(value = "내 프로필 정보 조회", notes = "내 프로필 조회")
    @GetMapping()
    public ResponseEntity getMyProfile() {

        MemberProfile memberProfile = memberService.getMyProfile();
        MemberProfileDto.myProfileResponse response = memberMapper.entityToResponseDto(memberProfile);

        return new ResponseEntity(response, HttpStatus.OK);
    }

    // 좋아요한 정보게시판
    @ApiOperation(value = "내가 좋아요한 정보 게시판", notes = "프로필에서 좋아요한 정보게시판 확인")
    @ApiImplicitParam(name = "page", value = "페이지 번호", example = "1", required = true)
    @GetMapping("/likes/info")
    public ResponseEntity getMemberLikeInfoBoard(@RequestParam int page) {

        Page<InfoBoard> infoBoardPage = memberService.getLikeInfoBoardList(page - 1);
        List<InfoBoard> infoBoardList = infoBoardPage.getContent();
        List<InfoBoardDto.Response> response = infoBoardMapper.InfoBoardListToInfoBoardResponseDtoList(infoBoardList);

        return new ResponseEntity(new PageResponseDto<>(response, infoBoardPage), HttpStatus.OK);
    }

    // 좋아요한 질문게시판
    @ApiOperation(value = "내가 좋아요한 질문 게시판", notes = "프로필에서 좋아요한 질문게시판 확인")
    @ApiImplicitParam(name = "page", value = "페이지 번호", example = "1", required = true)
    @GetMapping("/likes/question")
    public ResponseEntity getMemberLikeQuestionBoard(@RequestParam int page) {

        Page<QuestionBoard> questionBoardPage = memberService.getLikeQuestionBoard(page - 1);
        List<QuestionBoard> questionBoardList = questionBoardPage.getContent();
        List<QuestionBoardDto.Response> response = questionBoardMapper.QuestionBoardListToQuestionBoardResponseDtoList(questionBoardList);

        return new ResponseEntity(new PageResponseDto<>(response, questionBoardPage), HttpStatus.OK);
    }

    // 북마크한 프로젝트
    @ApiOperation(value = "내가 북마크한 프로젝트 게시판", notes = "프로필에서 북마크한 프로젝트 게시판 확인")
    @ApiImplicitParam(name = "page", value = "페이지 번호", example = "1", required = true)
    @GetMapping("/bookmark/project")
    public ResponseEntity getMemberBookMarkedProjectBoard(@RequestParam int page) {

        Page<Project> projectPage = memberService.getBooMarkedProjectBoard(page - 1);
        List<Project> projectList = projectPage.getContent();
        List<ProjectDto.previewResponseDto> response = projectMapper.entityToPreviewResponseDto(projectList);

        return new ResponseEntity(new PageResponseDto<>(response, projectPage), HttpStatus.OK);
    }

    // 북마크한 스터디
    @ApiOperation(value = "내가 북마크한 스터디 게시판", notes = "프로필에서 북마크한 스터디 게시판 확인")
    @ApiImplicitParam(name = "page", value = "페이지 번호", example = "1", required = true)
    @GetMapping("/bookmark/study")
    public ResponseEntity getMemberBookMarkedStudyBoard(@RequestParam int page) {

        Page<Study> studyPage = memberService.getBooMarkedStudyBoard(page - 1);
        List<Study> studyList = studyPage.getContent();
        List<StudyDto.previewResponseDto> response = studyMapper.entityToPreviewResponseDto(studyList);

        return new ResponseEntity(new PageResponseDto<>(response, studyPage), HttpStatus.OK);
    }

    // 북마크한 정보 게시판
    @ApiOperation(value = "내가 북마크한 정보 게시판", notes = "프로필에서 북마크한 정보게시판 확인")
    @ApiImplicitParam(name = "page", value = "페이지 번호", example = "1", required = true)
    @GetMapping("/bookmark/info")
    public ResponseEntity getMemberBookMarkedInfoBoard(@RequestParam int page) {

        Page<InfoBoard> infoBoardPage = memberService.getBooMarkedInfoBoardBoard(page - 1);
        List<InfoBoard> infoBoardList = infoBoardPage.getContent();
        List<InfoBoardDto.Response> response = infoBoardMapper.InfoBoardListToInfoBoardResponseDtoList(infoBoardList);

        return new ResponseEntity(new PageResponseDto<>(response, infoBoardPage), HttpStatus.OK);
    }

    // 북마크한 질문 게시판
    @ApiOperation(value = "내가 북마크한 질문 게시판", notes = "프로필에서 북마크한 질문게시판 확인")
    @ApiImplicitParam(name = "page", value = "페이지 번호", example = "1", required = true)
    @GetMapping("/bookmark/question")
    public ResponseEntity getMemberBookMarkedQuestionBoard(@RequestParam int page) {

        Page<QuestionBoard> questionBoardPage = memberService.getBooMarkedQuestionBoard(page - 1);
        List<QuestionBoard> questionBoardList = questionBoardPage.getContent();
        List<QuestionBoardDto.Response> response = questionBoardMapper.QuestionBoardListToQuestionBoardResponseDtoList(questionBoardList);

        return new ResponseEntity(new PageResponseDto<>(response, questionBoardPage), HttpStatus.OK);
    }

    // 유저리스트의 유저 정보 조회
    @ApiOperation(value = "타 유저 정보 조회", notes = "다른 유저의 여러가지 정보 조회")
    @ApiParam(name = "memberId", value = "회원 아이디", example = "1", required = true)
    @GetMapping("/{member-id}")
    public ResponseEntity getMemberProfile(@PathVariable("member-id") Long memberId) {

        MemberProfile memberProfile = memberService.getMemberProfile(memberId);
        List<ProjectDto.previewResponseDto> projectResponses = projectMapper.entityToPreviewResponseDto(memberProfile.getProjectlist());
        List<StudyDto.previewResponseDto> studyResponse = studyMapper.entityToPreviewResponseDto(memberProfile.getStudyList());
        List<InfoBoardDto.Response> infoBoardResponse = infoBoardMapper.InfoBoardListToInfoBoardResponseDtoList(memberProfile.getInfoBoardList());
        List<QuestionBoardDto.Response> questionBoardResponse = questionBoardMapper.QuestionBoardListToQuestionBoardResponseDtoList(memberProfile.getQuestionBoardList());
        MemberProfileDto.memberProfileResponse response = memberMapper.entityToResponseDto(memberProfile, projectResponses, studyResponse, infoBoardResponse, questionBoardResponse);


        return new ResponseEntity(response, HttpStatus.OK);

    }

    // 유저 리스트 조회
    @ApiOperation(value = "회원 리스트 조회", notes = "로그인하지 않았을 때는 리스트에 등록되어있는 유저 모두조회, 토큰 보유시 차단한 유저 필터링 후 조회 + 닉네임, 포지션, 기술 스택별 필터링")
    @ApiImplicitParams(
            {
                    @ApiImplicitParam(name = "page", value = "페이지 번호",example = "1"),
                    @ApiImplicitParam(name = "nickname", value = "닉네임", example = "아"),
                    @ApiImplicitParam(name = "positions", value = "포지션",example = "Backend,Frontend"),
                    @ApiImplicitParam(name = "stacks", value = "기술스택", example = "Java,JavaScript")
            }
    )
    @GetMapping("/list")
    public ResponseEntity getMemberProfiles(@RequestParam int page,
                                            @RequestParam(required = false) String nickname,
                                            @RequestParam(required = false) List<String> positions,
                                            @RequestParam(required = false) List<String> stacks) {

        // 필터링
        Page<MemberProfile> memberProfilePage = memberService.getFilteredMemberProfile(page - 1, nickname, positions, stacks);

        List<MemberProfile> memberProfileList = memberProfilePage.getContent();
        List<MemberProfileDto.listResponse> response = memberMapper.entityToResponseDto(memberProfileList);


        return new ResponseEntity(new PageResponseDto<>(response, memberProfilePage), HttpStatus.OK);
    }

    // 회원 탈퇴
    @ApiOperation(value = "회원탈퇴", notes = "회원탈퇴 API")
    @DeleteMapping
    public ResponseEntity deleteMember() {

        memberService.deleteMember();

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    // 중복 닉네임 확인
    @ApiOperation(value = "닉네임 중복확인", notes = "닉네임 중복확인 API")
    @PostMapping("/checkNickname")
    public ResponseEntity checkNickname(@Valid @RequestBody NicknameDto nickname) {

        memberService.checkNickname(nickname.getNickname());

        return new ResponseEntity(HttpStatus.OK);
    }

    // 비밀번호 변경
    @ApiOperation(value = "비밀번호 변경", notes = "비밀번호 변경 API")
    @PatchMapping("/password")
    public ResponseEntity changePassword(@Valid @RequestBody PasswordDto passwordDto) {

        memberService.changePassword(passwordDto.getRawPassword(), passwordDto.getChangePassword());

        return new ResponseEntity(HttpStatus.OK);
    }

    // 출석 체크
    @ApiOperation(value = "출석체크", notes = "출석체크 API")
    @PostMapping("/attendanceCheck")
    public ResponseEntity attendanceCheck() {

        memberService.attendanceCheck();

        return new ResponseEntity(HttpStatus.OK);
    }
}
