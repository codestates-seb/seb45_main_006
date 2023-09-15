package WOOMOOL.DevSquad.level.service;

import WOOMOOL.DevSquad.answer.entity.Answer;
import WOOMOOL.DevSquad.answer.repository.AnswerRepository;
import WOOMOOL.DevSquad.board.entity.Board;
import WOOMOOL.DevSquad.comment.repository.CommentRepository;
import WOOMOOL.DevSquad.infoboard.entity.InfoBoard;
import WOOMOOL.DevSquad.infoboard.repository.InfoBoardRepository;
import WOOMOOL.DevSquad.level.entity.Level;
import WOOMOOL.DevSquad.level.repository.LevelRepository;
import WOOMOOL.DevSquad.likes.repository.LikesRepository;
import WOOMOOL.DevSquad.member.entity.Member;
import WOOMOOL.DevSquad.member.entity.MemberProfile;
import WOOMOOL.DevSquad.member.service.MemberService;
import WOOMOOL.DevSquad.projectboard.repository.ProjectRepository;
import WOOMOOL.DevSquad.questionboard.entity.QuestionBoard;
import WOOMOOL.DevSquad.questionboard.repository.QuestionBoardRepository;
import WOOMOOL.DevSquad.questionboard.service.QuestionBoardService;
import WOOMOOL.DevSquad.studyboard.repository.StudyRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class LevelService {

    private final MemberService memberService;
    private final CommentRepository commentRepository;
    private final ProjectRepository projectRepository;
    private final StudyRepository studyRepository;
    private final InfoBoardRepository infoBoardRepository;
    private final QuestionBoardRepository questionBoardRepository;
    private final AnswerRepository answerRepository;
    private final LevelRepository levelRepository;
    private final LikesRepository likesRepository;

    public Level getMemberLevel(){

        Member findMember = memberService.findMemberFromToken();

        return levelRepository.findByMemberProfileId(findMember.getMemberId());
    }

    public void leveling() {

        // 토큰 없으면 실행 안함
        if (SecurityContextHolder.getContext().getAuthentication().getName().equals("anonymousUser"))
            return;

        // 토큰 들어오면 로직 실행
        MemberProfile memberProfile = memberService.findMemberFromToken().getMemberProfile();
        Long memberProfileId = memberProfile.getMemberProfileId();
        Level level = memberProfile.getLevel();
        String memberGrade = memberProfile.getLevel().getGrade();

        switch (memberGrade) {

            // 좋아요 3번, 댓글 1개 작성
            case "개구리알":

                int likeNum = countLikes(memberProfileId);
                int commentNum = countComment(memberProfileId);

                if (likeNum >= 3 && commentNum >= 1) {
                    level.setGrade("올챙이");
                    level.setCurrentExp(0);
                    level.setMaxExp(15);
                }
                // 게시글 작성 경험치 15
            case "올챙이":
                int boardNum = countBoard(memberProfileId);

                if (boardNum >= 1 && level.getCurrentExp() >= 15) {
                    level.setGrade("뒷다리올챙이");
                    level.setCurrentExp(0);
                    level.setMaxExp(30);
                }
                // 답변 채택받기 경험치 30
            case "뒷다리올챙이":

                int acceptedAnswerNum = countAcceptedAnswer(memberProfileId);
                if (acceptedAnswerNum >= 1 && level.getCurrentExp() >= 30) {
                    level.setGrade("앞다리올챙이");
                    level.setCurrentExp(0);
                    level.setMaxExp(50);
                }
                // 게시글 좋아요 10개 받기 경험치 50
            case "앞다리올챙이":
                int tenMoreLikedBoard = count10MoreLikedBoard(memberProfileId);

                if (tenMoreLikedBoard >= 1 && level.getCurrentExp() >= 50) {
                    level.setGrade("새끼개구리");
                    level.setCurrentExp(0);
                    level.setMaxExp(500);
                }
                // 경험치 500
            case "새끼개구리":

                if (level.getCurrentExp() >= 500) {
                    level.setGrade("어른개구리");
                }
        }
    }

    public void getExpFromActivity(MemberProfile memberProfile) {

        Level level = memberProfile.getLevel();
        // 게시판작성, 댓글, 답변달기 경험치 +1
        if (level.getCurrentExp() < level.getMaxExp()) {
            // 게시판을 5개 이상일 경우 5개 마다 경험치 +3
            if (countBoard(memberProfile.getMemberProfileId()) % 5 == 0) {

                level.setCurrentExp(level.getCurrentExp() + 3);
            }
            level.setCurrentExp(level.getCurrentExp() + 1);
        }

    }

    public void getExpFrom10MoreLikes(InfoBoard infoBoard) {

        // 회원 레벨 정보
        Level level = getMemberProfileLevel(infoBoard.getMemberProfile());

        if (level.getCurrentExp() < level.getMaxExp()) {
            // 좋아요 계수
            int coefficient = infoBoard.getLikeExp();
            // 정보게시판이 정보가 들어오고 좋아요가 10개 받을 때마다 경험치 +5
            if (infoBoard.getLikesList().size() % 10 * coefficient == 0) {

                level.setCurrentExp(level.getCurrentExp() + 5);
                // 계수 1 증가
                infoBoard.setLikeExp(coefficient + 1);
            }
        }
    }

    public void getExpFrom10MoreLikes(QuestionBoard questionBoard) {

        // 회원 레벨 정보
        Level level = getMemberProfileLevel(questionBoard.getMemberProfile());

        if (level.getCurrentExp() < level.getMaxExp()) {
            // 좋아요 계수
            int coefficient = questionBoard.getLikeExp();
            // 정보게시판이 정보가 들어오고 좋아요가 10개 받을 때마다 경험치 +5
            if (questionBoard.getLikesList().size() % 10 * coefficient == 0) {

                level.setCurrentExp(level.getCurrentExp() + 5);
                // 계수 1 증가
                questionBoard.setLikeExp(coefficient + 1);
            }
        }
    }

    public void getExpFromAcceptedAnswer(Answer answer) {

        MemberProfile memberProfile = answer.getMemberProfile();
        Level level = memberProfile.getLevel();

        level.setCurrentExp(level.getCurrentExp() + 10);
    }
    private int countLikes(Long memberProfileId){

        return likesRepository.findByMemberProfileId(memberProfileId).size();
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

    // 회원 레벨 정보 가져오기
    private Level getMemberProfileLevel(MemberProfile memberProfile) {

        return memberProfile.getLevel();
    }
}
