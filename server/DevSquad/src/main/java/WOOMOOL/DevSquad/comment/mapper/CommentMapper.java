package WOOMOOL.DevSquad.comment.mapper;

import WOOMOOL.DevSquad.board.entity.Board;
import WOOMOOL.DevSquad.comment.dto.CommentDto;
import WOOMOOL.DevSquad.comment.entity.Comment;

import WOOMOOL.DevSquad.infoboard.entity.InfoBoard;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ObjectFactory;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CommentMapper {

    @Mapping(source = "memberId", target = "memberProfile.memberProfileId")
    @Mapping(source = "parentId", target = "parent.commentId")
    @Mapping(source = "answerId", target = "answer.answerId")
    Comment commentPostDtoToComment(CommentDto.Post request);

    Comment commentPatchDtoToComment(CommentDto.Patch request);
    @Mapping(source = "board.boardId", target = "boardId")
    @Mapping(source = "answer.answerId", target = "answerId")
    @Mapping(source = "memberProfile.memberProfileId", target = "memberId")
    @Mapping(source = "parent.commentId", target = "parentId")
    @Mapping(source = "memberProfile.nickname", target = "nickname")
    CommentDto.Response commentToCommentResponseDto(Comment comment);

    List<CommentDto.Response> commentListToCommentResponseDtoList(List<Comment> commentList);

}
