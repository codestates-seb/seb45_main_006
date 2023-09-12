package WOOMOOL.DevSquad.level.service;

import WOOMOOL.DevSquad.answer.repository.AnswerRepository;
import WOOMOOL.DevSquad.comment.repository.CommentRepository;
import WOOMOOL.DevSquad.infoboard.repository.InfoBoardRepository;
import WOOMOOL.DevSquad.level.entity.Level;
import WOOMOOL.DevSquad.member.entity.MemberProfile;
import WOOMOOL.DevSquad.member.service.MemberService;
import WOOMOOL.DevSquad.projectboard.repository.ProjectRepository;
import WOOMOOL.DevSquad.questionboard.repository.QuestionBoardRepository;
import WOOMOOL.DevSquad.questionboard.service.QuestionBoardService;
import WOOMOOL.DevSquad.studyboard.repository.StudyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LevelService {

    private final MemberService memberService;
    private final CommentRepository commentRepository;
    private final ProjectRepository projectRepository;
    private final StudyRepository studyRepository;
    private final InfoBoardRepository infoBoardRepository;
    private final QuestionBoardRepository questionBoardRepository;
    private final AnswerRepository answerRepository;

    public void leveling() {

        MemberProfile memberProfile = memberService.findMemberFromToken().getMemberProfile();
        Long memberProfileId = memberProfile.getMemberProfileId();
        Level level = memberProfile.getLevel();
        String memberGrade = memberProfile.getLevel().getGrade();

        switch (memberGrade) {

            // 좋아요 3번, 댓글 1개 작성
            case "알":
                int likeNum = memberProfile.getLikesList().size();
                int commentNum = countComment(memberProfileId);

                if (likeNum >= 3 && commentNum >= 1) {
                    level.setGrade("올챙이");
                    level.setMaxExp(15);
                }
        // 게시글 작성 경험치 15
            case "올챙이":
                int boardNum = countBoard(memberProfileId);

                if (boardNum >= 1 && level.getCurrentExp() >= 15) {
                    level.setGrade("뒷다리올챙이");
                    level.setMaxExp(30);
                }
        // 답변 채택받기 경험치 30
            case "뒷다리올챙이":

                int acceptedAnswerNum = countAcceptedAnswer(memberProfileId);
                if (acceptedAnswerNum >= 1 && level.getCurrentExp() >= 30) {
                    level.setGrade("앞다리올챙이");
                    level.setMaxExp(50);
                }
        // 게시글 좋아요 10개 받기 경험치 50
            case "앞다리올챙이":
                int tenMoreLikedBoard = count10MoreLikedBoard(memberProfileId);

                if (tenMoreLikedBoard >= 1 && level.getCurrentExp() >= 50) {
                    level.setGrade("새끼개구리");
                    level.setMaxExp(500);
                }
         // 경험치 500
            case "새끼개구리":

                if (level.getCurrentExp() >= 500) {
                    level.setGrade("어른개구리");
                }
        }
    }

    private int countComment(Long memberProfileId) {

        return commentRepository.findByMemberId(memberProfileId).size();
    }

    private int countBoard(Long memberProfileId) {

        int projectNum = projectRepository.findByProjectStatusAndMemberProfile(memberProfileId).size();
        int studyNum = studyRepository.findByStudyStatusAndMemberProfile(memberProfileId).size();
        int questionNum = questionBoardRepository.findAllByMemberProfile(memberProfileId).size();
        int infoNum = infoBoardRepository.findAllByMemberProfile(memberProfileId).size();

        return projectNum + studyNum + questionNum + infoNum;
    }

    private int countAcceptedAnswer(Long memberProfileId) {

        return answerRepository.findByAcceptedByMemberProfileId(memberProfileId).size();
    }

    private int count10MoreLikedBoard(Long memberProfileId) {

        int infoNum = infoBoardRepository.findAllBy10MoreLikeByMemberProfile(memberProfileId).size();
        int questionNum = questionBoardRepository.findAllBy10MoreLikedByMemberProfile(memberProfileId).size();

        return infoNum + questionNum;
    }
}
