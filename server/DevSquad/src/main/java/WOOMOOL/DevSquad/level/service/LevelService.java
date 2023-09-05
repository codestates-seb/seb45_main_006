package WOOMOOL.DevSquad.level.service;

import WOOMOOL.DevSquad.member.entity.MemberProfile;
import WOOMOOL.DevSquad.member.service.MemberService;
import org.springframework.stereotype.Service;

@Service
public class LevelService {

    private final MemberService memberService;

    public LevelService(MemberService memberService) {
        this.memberService = memberService;
    }

    public void leveling() {

        MemberProfile memberProfile = memberService.findMemberFromToken().getMemberProfile();
        String memberGrade = memberProfile.getLevel().getGrade();

        switch (memberGrade) {

            case "올챙이": // 좋아요3 댓글1
            case "앞다리올챙이": // 게시글1 경험치15
            case "뒷다리올챙이": // 질문채택 1개이상 경험치30
            case "새끼개구리": // 내가쓴 게시글에 좋아요10개 이상 경험치50
            case "어른개구리": // 경험치 500
        }
    }

}
