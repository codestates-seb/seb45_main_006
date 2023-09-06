package WOOMOOL.DevSquad.member.controller;

import WOOMOOL.DevSquad.infoboard.dto.InfoBoardDto;
import WOOMOOL.DevSquad.infoboard.mapper.InfoBoardMapper;
import WOOMOOL.DevSquad.member.dto.NicknameDto;
import WOOMOOL.DevSquad.member.dto.PasswordDto;
import WOOMOOL.DevSquad.member.dto.MemberPostDto;
import WOOMOOL.DevSquad.member.dto.MemberProfileDto;
import WOOMOOL.DevSquad.member.entity.Member;
import WOOMOOL.DevSquad.member.entity.MemberProfile;
import WOOMOOL.DevSquad.member.mapper.MemberMapper;
import WOOMOOL.DevSquad.member.service.MemberService;
import WOOMOOL.DevSquad.projectboard.dto.ProjectDto;
import WOOMOOL.DevSquad.projectboard.mapper.ProjectMapper;
import WOOMOOL.DevSquad.studyboard.dto.StudyDto;
import WOOMOOL.DevSquad.studyboard.mapper.StudyMapper;
import WOOMOOL.DevSquad.utils.PageResponseDto;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
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
        MemberProfileDto.patchResponse response = memberMapper.entityToResponseDto(updateProfile);

        return new ResponseEntity(response, HttpStatus.OK);
    }

    // 한 명의 유저 프로필 조회
    @GetMapping()
    public ResponseEntity getMemberProfile(@RequestBody PasswordDto passwordDto) {

        // 조회 전 비밀번호 확인하기
        memberService.checkPassword(passwordDto.getRawPassword());

        MemberProfile memberProfile = memberService.getMemberProfile();
        List<ProjectDto.previewResponseDto> projectResponses = projectMapper.entityToPreviewResponseDto(memberProfile.getProjectlist());
        List<StudyDto.previewResponseDto> studyResponse = studyMapper.entityToPreviewResponseDto(memberProfile.getStudyList());
        List<InfoBoardDto.Response> infoBoardResponse = infoBoardMapper.InfoBoardListToInfoBoardResponseDtoList(memberProfile.getInfoBoardList());

        MemberProfileDto.detailResponse response = memberMapper.entityToResponseDto(memberProfile, projectResponses, studyResponse, infoBoardResponse);

        return new ResponseEntity(response, HttpStatus.OK);
    }

    // 유저 리스트 조회 8명 까지 + 포지션, 스택 별로 필터링
    @GetMapping("/list")
    public ResponseEntity getMemberProfiles(@RequestParam int page,
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
        } else {

            memberProfilePage = memberService.getMemberProfilePage(page - 1);

        }

        List<MemberProfile> memberProfileList = memberService.getMemberProfiles(memberProfilePage);
        List<MemberProfileDto.listResponse> response = memberMapper.entityToResponseDto(memberProfileList);


        return new ResponseEntity(new PageResponseDto<>(response, memberProfilePage), HttpStatus.OK);
    }

    // 회원 삭제
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
