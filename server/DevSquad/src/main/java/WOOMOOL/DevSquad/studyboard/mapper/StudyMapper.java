package WOOMOOL.DevSquad.studyboard.mapper;

import WOOMOOL.DevSquad.bookmark.entity.Bookmark;
import WOOMOOL.DevSquad.studyboard.dto.StudyDto;
import WOOMOOL.DevSquad.studyboard.entity.Study;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.List;

@Mapper(componentModel = "spring")
public interface StudyMapper {
    Study postDtoToEntity(StudyDto.PostDto postDto);
    Study patchDtoToEntity(StudyDto.PatchDto patchDto);
    List<StudyDto.previewResponseDto> entityToPreviewResponseDto(List<Study> studies);

    @Mapping(target = "bookmarked", expression = "java(markedOrNot(study.getBookmarkList()))")
    StudyDto.AllResponseDto entityToAllResponseDto(Study study);

    default boolean markedOrNot(List<Bookmark> BookmarkList) {
        SecurityContext securityContext = SecurityContextHolder.getContext();
        if( securityContext == null ) {
            return false;
        } else {
            String userEmail = securityContext.getAuthentication().getName();
            return BookmarkList.stream().anyMatch(bookmark -> bookmark.getMemberProfile().getMember().getEmail().equals(userEmail));
        }

    }
}
