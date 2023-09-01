package WOOMOOL.DevSquad.member.controller;

import WOOMOOL.DevSquad.member.dto.PasswordDto;
import WOOMOOL.DevSquad.member.dto.MemberPostDto;
import WOOMOOL.DevSquad.member.dto.MemberProfileDto;
import WOOMOOL.DevSquad.member.entity.Member;
import WOOMOOL.DevSquad.member.entity.MemberProfile;
import WOOMOOL.DevSquad.member.mapper.MemberMapper;
import WOOMOOL.DevSquad.member.service.MemberService;
import WOOMOOL.DevSquad.utils.PageResponseDto;
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
public class MemberController {
    private final MemberService memberService;
    private final MemberMapper memberMapper;


    public MemberController(MemberService memberService, MemberMapper memberMapper) {
        this.memberService = memberService;
        this.memberMapper = memberMapper;
    }

    //멤버 생성
    @PostMapping
    public ResponseEntity createMember(@Valid @RequestBody MemberPostDto postDto) {
        Member member = memberMapper.postDtoToEntity(postDto);
        memberService.createMember(member);

        return new ResponseEntity(HttpStatus.CREATED);
    }

    // 멤버 프로필 수정
    @PatchMapping("/{member-id}")
    public ResponseEntity patchMemberProfile(@PathVariable("member-id") Long memberId,
                                             @Valid @RequestBody MemberProfileDto.Patch patchDto){
        MemberProfile memberProfile = memberMapper.patchDtoToEntity(patchDto);
        memberProfile.setMemberProfileId(memberId);

        MemberProfile updateProfile = memberService.updateMemberProfile(memberProfile, patchDto.getPosition(),patchDto.getStack());
        MemberProfileDto.detailResponse response = memberMapper.entityToResponseDto(updateProfile);

        return new ResponseEntity(response, HttpStatus.OK);
    }

    // 한 명의 유저 프로필 조회
    @GetMapping()
    public ResponseEntity getMemberProfile(@RequestBody PasswordDto passwordDto) {

        // 조회 전 비밀번호 확인하기?
        memberService.checkPassword(passwordDto.getRawPassword());
        MemberProfile memberProfile = memberService.getMemberProfile();
        MemberProfileDto.detailResponse response = memberMapper.entityToResponseDto(memberProfile);

        // 프로젝트 리스트
        // 스터디 리스트
        // 자유게시판 리스트 추가 반환

        return new ResponseEntity(response, HttpStatus.OK);
    }

    // 유저 리스트 조회 페이지네이션 10명까지?
    @GetMapping("/list")
    public ResponseEntity getMemberProfiles(@RequestParam int page) {

        Page<MemberProfile> memberProfilePage = memberService.getMemberProfilePage(page - 1);
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
    public ResponseEntity checkNickname(@RequestParam String nickname) {

        memberService.checkNickname(nickname);

        return new ResponseEntity(HttpStatus.OK);
    }

    // 비밀번호 변경
    @PatchMapping("/password")
    public ResponseEntity changePassword(@RequestBody PasswordDto passwordDto) {

        memberService.changePassword(passwordDto.getRawPassword(), passwordDto.getChangePassword());

        return new ResponseEntity(HttpStatus.OK);
    }
}
