package WOOMOOL.DevSquad.infoboard.mapper;

import WOOMOOL.DevSquad.bookmark.entity.Bookmark;
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

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface InfoBoardMapper {

    @Mapping(source = "memberId", target = "memberProfile.memberProfileId")
    InfoBoard InfoBoardPostDtoToInfoBoard(InfoBoardDto.Post request);
    @Mapping(source = "memberId", target = "memberProfile.memberProfileId")
    InfoBoard InfoBoardPatchDtoToInfoBoard(InfoBoardDto.Patch request);
    @Mapping(source = "memberProfile.memberProfileId", target = "memberId")
    @Mapping(source = "memberProfile.nickname", target = "nickname")
    @Mapping(source = "memberProfile.profilePicture", target = "profilePicture")
//    @Mapping(target = "liked", expression = "java(hasUserLikedBoard(infoBoard.getLikesList()))")
//    @Mapping(target = "bookmarked", expression = "java(markedOrNot(infoBoard.getBookmarkList()))")
    @Mapping(target = "likeCount", expression = "java(infoBoard.getLikesList().size())")
    InfoBoardDto.Response InfoBoardToInfoBoardResponseDto(InfoBoard infoBoard);
    List<InfoBoardDto.Response> InfoBoardListToInfoBoardResponseDtoList(List<InfoBoard> infoBoardList);

//    default boolean hasUserLikedBoard(List<Likes> likesList) {
//        SecurityContext securityContext = SecurityContextHolder.getContext();
//        if(securityContext==null)
//            return false;
//        else {
//            String userEmail = securityContext.getAuthentication().getName();
//             return likesList.stream().anyMatch(likes -> likes.getMemberProfile().getMember().getEmail().equals(userEmail));
//        }
//    }
//    default boolean markedOrNot(List<Bookmark> BookmarkList) {
//        SecurityContext securityContext = SecurityContextHolder.getContext();
//        if( securityContext == null ) {
//            return false;
//        } else {
//            String userEmail = securityContext.getAuthentication().getName();
//            return BookmarkList.stream().anyMatch(bookmark -> bookmark.getMemberProfile().getMember().getEmail().equals(userEmail));
//        }
//    }
}
