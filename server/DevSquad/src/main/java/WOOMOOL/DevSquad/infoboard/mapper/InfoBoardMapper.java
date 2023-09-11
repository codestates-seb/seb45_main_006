package WOOMOOL.DevSquad.infoboard.mapper;

import WOOMOOL.DevSquad.comment.mapper.CommentMapper;
import WOOMOOL.DevSquad.infoboard.dto.InfoBoardDto;
import WOOMOOL.DevSquad.infoboard.entity.InfoBoard;
import WOOMOOL.DevSquad.likes.entity.Likes;
import WOOMOOL.DevSquad.member.entity.Member;
import WOOMOOL.DevSquad.member.repository.MemberRepository;
import WOOMOOL.DevSquad.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.List;

@Mapper(componentModel = "spring", uses = {CommentMapper.class}, unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface InfoBoardMapper {

    @Mapping(source = "memberId", target = "memberProfile.memberProfileId")
    InfoBoard InfoBoardPostDtoToInfoBoard(InfoBoardDto.Post request);
    @Mapping(source = "memberId", target = "memberProfile.memberProfileId")
    InfoBoard InfoBoardPatchDtoToInfoBoard(InfoBoardDto.Patch request);
    @Mapping(source = "memberProfile.memberProfileId", target = "memberId")
    @Mapping(source = "memberProfile.nickname", target = "nickname")
    @Mapping(target = "liked", expression = "java(hasUserLikedBoard(infoBoard.getLikesList()))")
    InfoBoardDto.Response InfoBoardToInfoBoardResponseDto(InfoBoard infoBoard);
    List<InfoBoardDto.Response> InfoBoardListToInfoBoardResponseDtoList(List<InfoBoard> infoBoardList);

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
