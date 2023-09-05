package WOOMOOL.DevSquad.questionboard.mapper;

import WOOMOOL.DevSquad.questionboard.dto.QuestionBoardDto;
import WOOMOOL.DevSquad.questionboard.entity.QuestionBoard;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface QuestionBoardMapper {
    @Mapping(source = "memberId", target = "memberProfile.memberProfileId")
    QuestionBoard QuestionBoardPostDtoToQuestionBoard(QuestionBoardDto.Post request);
    @Mapping(source = "memberId", target = "memberProfile.memberProfileId")
    QuestionBoard QuestionBoardPatchDtoToQuestionBoard(QuestionBoardDto.Patch request);
    @Mapping(source = "memberProfile.memberProfileId", target = "memberId")
    QuestionBoardDto.Response QuestionBoardToQuestionBoardResponseDto(QuestionBoard questionBoard);
    List<QuestionBoardDto.Response> QuestionBoardListToQuestionBoardResponseDtoList(List<QuestionBoard> questionBoardList);

}
