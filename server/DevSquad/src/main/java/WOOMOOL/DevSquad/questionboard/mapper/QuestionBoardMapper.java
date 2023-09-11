package WOOMOOL.DevSquad.questionboard.mapper;

import WOOMOOL.DevSquad.answer.entity.Answer;
import WOOMOOL.DevSquad.answer.mapper.AnswerMapper;
import WOOMOOL.DevSquad.likes.entity.Likes;
import WOOMOOL.DevSquad.questionboard.dto.QuestionBoardDto;
import WOOMOOL.DevSquad.questionboard.entity.QuestionBoard;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring",uses = {AnswerMapper.class}, unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface QuestionBoardMapper {
    @Mapping(source = "memberId", target = "memberProfile.memberProfileId")
    QuestionBoard QuestionBoardPostDtoToQuestionBoard(QuestionBoardDto.Post request);
    @Mapping(source = "memberId", target = "memberProfile.memberProfileId")
    QuestionBoard QuestionBoardPatchDtoToQuestionBoard(QuestionBoardDto.Patch request);
    @Mapping(source = "memberProfile.memberProfileId", target = "memberId")
    @Mapping(source = "memberProfile.nickname", target = "nickname")
    @Mapping(target = "liked", expression = "java(hasUserLikedBoard(questionBoard.getLikesList()))")
    QuestionBoardDto.Response QuestionBoardToQuestionBoardResponseDto(QuestionBoard questionBoard);
    List<QuestionBoardDto.Response> QuestionBoardListToQuestionBoardResponseDtoList(List<QuestionBoard> questionBoardList);

    default boolean hasUserLikedBoard(List<Likes> likesList) {
        SecurityContext securityContext = SecurityContextHolder.getContext();
        if(securityContext==null)
            return false;
        else {
            String userEmail = securityContext.getAuthentication().getName();
            return likesList.stream().anyMatch(likes -> likes.getMemberProfile().getMember().getEmail().equals(userEmail));
        }
    }
}
