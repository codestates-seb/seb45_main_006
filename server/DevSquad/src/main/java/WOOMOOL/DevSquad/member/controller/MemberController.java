package WOOMOOL.DevSquad.member.controller;

import WOOMOOL.DevSquad.member.dto.MemberPostDto;
import WOOMOOL.DevSquad.member.dto.MemberProfileDto;
import WOOMOOL.DevSquad.member.entity.Member;
import WOOMOOL.DevSquad.member.entity.MemberProfile;
import WOOMOOL.DevSquad.member.mapper.MemberMapper;
import WOOMOOL.DevSquad.member.service.MemberService;
import WOOMOOL.DevSquad.position.entity.Position;
import WOOMOOL.DevSquad.position.repository.PositionRepository;
import WOOMOOL.DevSquad.utils.PageInfo;
import WOOMOOL.DevSquad.utils.PageResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

import static WOOMOOL.DevSquad.member.entity.MemberProfile.MemberStatus.MEMBER_ACTIVE;


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
    public ResponseEntity createMember(@Valid @RequestBody MemberPostDto postDto){
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

        MemberProfile updateProfile = memberService.updateMemberProfile(memberProfile,patchDto.getPosition());
        MemberProfileDto.detailResponse response = memberMapper.entityToResponseDto(updateProfile);

        return new ResponseEntity(response, HttpStatus.OK);
    }
    // 한 명의 유저 프로필 조회
    @GetMapping("/{member-id}")
    public ResponseEntity getMemberProfile(@PathVariable("member-id") Long memberId){
       MemberProfile memberProfile = memberService.getMemberProfile(memberId);
       MemberProfileDto.detailResponse response = memberMapper.entityToResponseDto(memberProfile);

       return new ResponseEntity(response, HttpStatus.OK);
    }
    // 유저 리스트 조회 페이지네이션 10명까지
    @GetMapping("/list")
    public ResponseEntity getMemberProfiles(@RequestParam int page){

        Page<MemberProfile> memberProfilePage = memberService.getMemberProfilePage(page-1);
        List<MemberProfile> memberProfileList = memberService.getMemberProfiles(memberProfilePage);

        List<MemberProfileDto.listResponse> response = memberMapper.entityToResponseDto(memberProfileList);

        return new ResponseEntity(new PageResponseDto<>(response,memberProfilePage), HttpStatus.OK);
    }

    // 중복 닉네임 확인
    @GetMapping("/checkNickname")
    public ResponseEntity checkNickname(@RequestParam String nickname){

        memberService.checkNickname(nickname);

        return new ResponseEntity(HttpStatus.OK);
    }
    @DeleteMapping("/{member-id}")
    public ResponseEntity deleteMember(@PathVariable("member-id") Long memberId){

        memberService.deleteMember(memberId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
