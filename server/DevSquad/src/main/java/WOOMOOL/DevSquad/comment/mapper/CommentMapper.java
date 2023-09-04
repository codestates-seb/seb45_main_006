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

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CommentMapper {
    CommentMapper INSTANCE =Mappers.getMapper(CommentMapper.class);

    @Mapping(source = "memberId", target = "memberProfile.memberProfileId")
    @Mapping(source = "parentId", target = "parent.commentId")
    Comment commentPostDtoToComment(CommentDto.Post request);
    @Mapping(source = "memberId", target = "memberProfile.memberProfileId")
    @Mapping(source = "parentId", target = "parent.commentId")
    Comment commentPatchDtoToComment(CommentDto.Patch request);
    @Mapping(source = "board.boardId", target = "boardId")
    CommentDto.Response commentToCommentResponseDto(Comment comment);

}
