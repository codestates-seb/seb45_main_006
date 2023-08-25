package WOOMOOL.DevSquad.member.controller;

import WOOMOOL.DevSquad.member.dto.MemberPostDto;
import WOOMOOL.DevSquad.member.dto.MemberProfileDto;
import WOOMOOL.DevSquad.member.entity.Member;
import WOOMOOL.DevSquad.member.entity.MemberProfile;
import WOOMOOL.DevSquad.member.mapper.MemberMapper;
import WOOMOOL.DevSquad.member.service.MemberService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/members")
public class MemberController {
    private final MemberService memberService;
    private final MemberMapper memberMapper;

    public MemberController(MemberService memberService, MemberMapper memberMapper) {
        this.memberService = memberService;
        this.memberMapper = memberMapper;
    }

    //멤버 생성
    @PostMapping
    public ResponseEntity createMember(@RequestBody MemberPostDto postDto){
        Member member = memberMapper.postDtoToEntity(postDto);
        memberService.createMember(member);

        return new ResponseEntity(HttpStatus.CREATED);
    }
    // 멤버 프로필 수정
    @PatchMapping("/{member-id}")
    public ResponseEntity patchMemberProfile(@PathVariable("member-id") Long memberId,
                                             @RequestBody MemberProfileDto.Patch patchDto){
        MemberProfile memberProfile = memberMapper.patchDtoToEntity(patchDto);
        memberProfile.setMemberProfileId(memberId);
        MemberProfile updateProfile = memberService.updateMemberProfile(memberProfile);
        MemberProfileDto.Response response = memberMapper.entityToResponseDto(updateProfile);

        return new ResponseEntity(response, HttpStatus.OK);
    }
}
