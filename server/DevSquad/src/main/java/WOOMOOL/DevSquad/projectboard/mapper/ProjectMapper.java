package WOOMOOL.DevSquad.projectboard.mapper;

import WOOMOOL.DevSquad.bookmark.entity.Bookmark;
import WOOMOOL.DevSquad.comment.mapper.CommentMapper;
import WOOMOOL.DevSquad.projectboard.dto.ProjectDto;
import WOOMOOL.DevSquad.projectboard.entity.Project;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.List;

@Mapper(componentModel = "spring", uses = {CommentMapper.class})
public interface ProjectMapper {
    Project postDtoToEntity(ProjectDto.PostDto postDto);
    Project patchDtoToEntity(ProjectDto.PatchDto patchDto);
    List<ProjectDto.previewResponseDto> entityToPreviewResponseDto(List<Project> projects);

    @Mapping(target = "bookmarked", expression = "java(markedOrNot(project.getBookmarkList()))")
    ProjectDto.AllResponseDto entityToAllResponseDto(Project project);

    default boolean markedOrNot(List<Bookmark> BookmarkList) {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        if(userEmail.equals("anonymousUser")) {
            return false;
        } else {
            return BookmarkList.stream().anyMatch(bookmark -> bookmark.getMemberProfile().getMember().getEmail().equals(userEmail));
        }

    }
}
