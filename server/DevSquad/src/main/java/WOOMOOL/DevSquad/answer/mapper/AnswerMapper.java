package WOOMOOL.DevSquad.answer.mapper;

import WOOMOOL.DevSquad.answer.dto.AnswerDto;
import WOOMOOL.DevSquad.answer.entity.Answer;
import WOOMOOL.DevSquad.comment.mapper.CommentMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.util.ArrayList;
import java.util.List;
@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface AnswerMapper {
    @Mapping(source = "memberId", target = "memberProfile.memberProfileId")
    @Mapping(source = "boardId", target = "questionBoard.boardId")
    Answer answerPostDtoToAnswer(AnswerDto.Post request);
    Answer answerPatchDtoToAnswer(AnswerDto.Patch request);
    @Mapping(source = "memberProfile.memberProfileId", target = "memberId")
    @Mapping(source = "questionBoard.boardId", target = "boardId")
    @Mapping(source = "memberProfile.nickname", target = "nickname")
    @Mapping(source = "memberProfile.profilePicture", target = "profilePicture")
    AnswerDto.Response answerToAnswerResponseDto(Answer answer);
    List<AnswerDto.Response> answerListToAnswerResponseDtoList(List<Answer> answerList);

//    default List<AnswerDto.Response> answerListToAnswerResponseDtoList(List<Answer> answerList) {
//        if ( answerList == null ) {
//            return null;
//        }
//
//        List<AnswerDto.Response> list = new ArrayList<>( answerList.size() );
//        for ( Answer answer : answerList ) {
//            if(answer.getAnswerStatus().name().equals("ANSWER_POSTED"))
//                list.add( answerToAnswerResponseDto( answer ) );
//        }
//
//        return list;
//    }
}
