package WOOMOOL.DevSquad.questionboard.mapper;

import WOOMOOL.DevSquad.answer.entity.Answer;
import WOOMOOL.DevSquad.answer.mapper.AnswerMapper;
import WOOMOOL.DevSquad.block.entity.Block;
import WOOMOOL.DevSquad.bookmark.entity.Bookmark;
import WOOMOOL.DevSquad.comment.mapper.CommentMapper;
import WOOMOOL.DevSquad.likes.entity.Likes;
import WOOMOOL.DevSquad.member.entity.MemberProfile;
import WOOMOOL.DevSquad.questionboard.dto.QuestionBoardDto;
import WOOMOOL.DevSquad.questionboard.entity.QuestionBoard;
import WOOMOOL.DevSquad.questionboard.service.QuestionBoardService;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface QuestionBoardMapper {
    @Mapping(source = "memberId", target = "memberProfile.memberProfileId")
    QuestionBoard QuestionBoardPostDtoToQuestionBoard(QuestionBoardDto.Post request);
    @Mapping(source = "memberId", target = "memberProfile.memberProfileId")
    QuestionBoard QuestionBoardPatchDtoToQuestionBoard(QuestionBoardDto.Patch request);
    @Mapping(source = "memberProfile.memberProfileId", target = "memberId")
    @Mapping(source = "memberProfile.nickname", target = "nickname")
    @Mapping(source = "memberProfile.profilePicture", target = "profilePicture")
    @Mapping(target = "liked", expression = "java(hasUserLikedBoard(questionBoard.getLikesList()))")
    @Mapping(target = "bookmarked", expression = "java(markedOrNot(questionBoard.getBookmarkList()))")
    @Mapping(target = "likeCount", expression = "java(questionBoard.getLikesList().size())")
    QuestionBoardDto.Response QuestionBoardToQuestionBoardResponseDto(QuestionBoard questionBoard);
    List<QuestionBoardDto.Response> QuestionBoardListToQuestionBoardResponseDtoList(List<QuestionBoard> questionBoardList);



    default boolean hasUserLikedBoard(List<Likes> likesList) {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        if(userEmail.equals("anonymousUser"))
            return false;
        else {
            return likesList.stream().anyMatch(likes -> likes.getMemberProfile().getMember().getEmail().equals(userEmail));
        }
    }
    default boolean markedOrNot(List<Bookmark> BookmarkList) {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        if(userEmail.equals("anonymousUser")) {
            return false;
        } else {
            return BookmarkList.stream().anyMatch(bookmark -> bookmark.getMemberProfile().getMember().getEmail().equals(userEmail));
        }
    }
}
