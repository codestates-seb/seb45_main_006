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
    @PatchMapping
    public ResponseEntity patchMemberProfile(@Valid @RequestBody MemberProfileDto.Patch patchDto) {
        MemberProfile memberProfile = memberMapper.patchDtoToEntity(patchDto);

        MemberProfile updateProfile = memberService.updateMemberProfile(memberProfile, patchDto.getPosition(), patchDto.getStack());
        MemberProfileDto.patchResponse response = memberMapper.entityToPatchResponseDto(updateProfile);

        return new ResponseEntity(response, HttpStatus.OK);
    }

    // 내 프로필 조회
    @GetMapping()
    public ResponseEntity getMyProfile() {

        // 조회 전 비밀번호 확인하기 -> 프론트에서 하기로! getMapping은 Body를 못씀..
//        memberService.checkPassword(passwordDto.getRawPassword());

        MemberProfile memberProfile = memberService.getMyProfile();
        MemberProfileDto.myProfileResponse response = memberMapper.entityToResponseDto(memberProfile);

        return new ResponseEntity(response, HttpStatus.OK);
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
    // 북마크한 프로젝트
    @GetMapping("/bookmark/project")
    public ResponseEntity getMemberBookMarkedProjectBoard(@RequestParam int page){

        Page<Project> projectPage = memberService.getBooMarkedProjectBoard(page-1);
        List<Project> projectList = projectPage.getContent();
        List<ProjectDto.previewResponseDto> response = projectMapper.entityToPreviewResponseDto(projectList);

        return new ResponseEntity(new PageResponseDto<>(response,projectPage),HttpStatus.OK);
    }

    // 북마크한 스터디
    @GetMapping("/bookmark/study")
    public ResponseEntity getMemberBookMarkedStudyBoard(@RequestParam int page){

        Page<Study> studyPage = memberService.getBooMarkedStudyBoard(page-1);
        List<Study> studyList = studyPage.getContent();
        List<StudyDto.previewResponseDto> response = studyMapper.entityToPreviewResponseDto(studyList);

        return new ResponseEntity(new PageResponseDto<>(response,studyPage),HttpStatus.OK);
    }

    // 북마크한 정보 게시판
    @GetMapping("/bookmark/info")
    public ResponseEntity getMemberBookMarkedInfoBoard(@RequestParam int page){

        Page<InfoBoard> infoBoardPage = memberService.getBooMarkedInfoBoardBoard(page-1);
        List<InfoBoard> infoBoardList = infoBoardPage.getContent();
        List<InfoBoardDto.Response> response = infoBoardMapper.InfoBoardListToInfoBoardResponseDtoList(infoBoardList);

        return new ResponseEntity(new PageResponseDto<>(response,infoBoardPage),HttpStatus.OK);
    }

    // 북마크한 질문 게시판
    @GetMapping("/bookmark/question")
    public ResponseEntity getMemberBookMarkedQuestionBoard(@RequestParam int page){

        Page<QuestionBoard> questionBoardPage = memberService.getBooMarkedQuestionBoard(page-1);
        List<QuestionBoard> questionBoardList = questionBoardPage.getContent();
        List<QuestionBoardDto.Response> response = questionBoardMapper.QuestionBoardListToQuestionBoardResponseDtoList(questionBoardList);

        return new ResponseEntity(new PageResponseDto<>(response,questionBoardPage),HttpStatus.OK);
    }

    // 유저리스트의 유저 정보 조회
    @GetMapping("/{member-id}")
    public ResponseEntity getMemberProfile(@PathVariable("member-id") Long memberId){

        MemberProfile memberProfile = memberService.getMemberProfile(memberId);
        List<ProjectDto.previewResponseDto> projectResponses = projectMapper.entityToPreviewResponseDto(memberProfile.getProjectlist());
        List<StudyDto.previewResponseDto> studyResponse = studyMapper.entityToPreviewResponseDto(memberProfile.getStudyList());
        List<InfoBoardDto.Response> infoBoardResponse = infoBoardMapper.InfoBoardListToInfoBoardResponseDtoList(memberProfile.getInfoBoardList());
        List<QuestionBoardDto.Response> questionBoardResponse = questionBoardMapper.QuestionBoardListToQuestionBoardResponseDtoList(memberProfile.getQuestionBoardList());
        MemberProfileDto.memberProfileResponse response = memberMapper.entityToResponseDto(memberProfile,projectResponses,studyResponse,infoBoardResponse,questionBoardResponse);


        return new ResponseEntity(response, HttpStatus.OK);

    }
 // 유저 리스트 조회
    @GetMapping("/list")
    public ResponseEntity getMemberProfiles(@RequestParam int page,
                                            @RequestParam(required = false) String nickname,
                                            @RequestParam(required = false) List<String> positions,
                                            @RequestParam(required = false) List<String> stacks) {

        // 필터링
        Page<MemberProfile> memberProfilePage = memberService.getFilteredMemberProfile(page-1,nickname,positions,stacks);

        List<MemberProfile> memberProfileList = memberProfilePage.getContent();
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
    @PostMapping("/checkNickname")
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

    @PostMapping("/attendanceCheck")
    public ResponseEntity  attendanceCheck(){

        memberService.attendanceCheck();

        return new ResponseEntity(HttpStatus.OK);
    }
}
