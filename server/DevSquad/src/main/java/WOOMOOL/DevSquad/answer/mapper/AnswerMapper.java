package WOOMOOL.DevSquad.answer.mapper;

import WOOMOOL.DevSquad.answer.dto.AnswerDto;
import WOOMOOL.DevSquad.answer.entity.Answer;
import WOOMOOL.DevSquad.comment.mapper.CommentMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.util.List;
@Mapper(componentModel = "spring",uses = {CommentMapper.class}, unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface AnswerMapper {
    @Mapping(source = "memberId", target = "memberProfile.memberProfileId")
    @Mapping(source = "boardId", target = "questionBoard.boardId")
    Answer answerPostDtoToAnswer(AnswerDto.Post request);
    Answer answerPatchDtoToAnswer(AnswerDto.Patch request);
    @Mapping(source = "memberProfile.memberProfileId", target = "memberId")
    @Mapping(source = "questionBoard.boardId", target = "boardId")
    @Mapping(source = "memberProfile.nickname", target = "nickname")
    AnswerDto.Response answerToAnswerResponseDto(Answer answer);
    List<AnswerDto.Response> answerListToAnswerResponseDtoList(List<Answer> answerList);
}
