package WOOMOOL.DevSquad.projectboard.mapper;

import WOOMOOL.DevSquad.bookmark.entity.Bookmark;
import WOOMOOL.DevSquad.comment.mapper.CommentMapper;
import WOOMOOL.DevSquad.likes.entity.Likes;
import WOOMOOL.DevSquad.member.dto.MemberProfileDto;
import WOOMOOL.DevSquad.projectboard.dto.ProjectDto;
import WOOMOOL.DevSquad.projectboard.entity.Project;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.List;
import java.util.stream.Collectors;


@Mapper(componentModel = "spring", uses = {CommentMapper.class})
public interface ProjectMapper {
    default Project postDtoToEntity(ProjectDto.PostDto postDto) {
        Project project = new Project();

        project.setTitle( postDto.getTitle() );
        project.setContent( postDto.getContent() );
        project.setStartDate( postDto.getStartDate() );
        project.setDeadline( postDto.getDeadline() );
        project.setRecruitNum( postDto.getRecruitNum() );

        return project;
    }

    default Project patchDtoToEntity(ProjectDto.PatchDto patchDto) {
        Project project = new Project();
        if (patchDto.getBoardId() != null) {
            project.setBoardId(patchDto.getBoardId());
        }

        project.setTitle(patchDto.getTitle());
        project.setContent(patchDto.getContent());
        project.setStartDate(patchDto.getStartDate());
        project.setDeadline(patchDto.getDeadline());
        project.setRecruitNum(patchDto.getRecruitNum());
        project.setProjectStatus(patchDto.getProjectStatus());

        return project;
    }

    @Mapping(target = "bookmarked", expression = "java(markedOrNot(project.getBookmarkList()))")
    default List<ProjectDto.previewResponseDto> entityToPreviewResponseDto(List<Project> projects) {
        return projects.stream()
                .map(project -> new ProjectDto.previewResponseDto(
                        project.getBoardId(),
                        project.getTitle(),
                        project.getStackTags().stream()
                                .map(stackTag -> stackTag.getTagName())
                                .collect(Collectors.toSet()),
                        project.getStartDate(),
                        project.getDeadline(),
                        project.getCreatedAt(),
                        project.getModifiedAt(),
                        project.getRecruitNum(),
                        project.getProjectStatus(),
                        markedOrNot(project.getBookmarkList()),
                        project.getViewCount(),
                        new MemberProfileDto.listResponse(
                                project.getMemberProfile().getMemberProfileId(),
                                project.getMemberProfile().getProfilePicture(),
                                project.getMemberProfile().getNickname(),
                                project.getMemberProfile().getGithubId(),
                                project.getMemberProfile().getPositions().stream().map(position -> position.getPositionName()).collect(Collectors.toSet()),
                                project.getMemberProfile().getStackTags().stream().map(stackTag -> stackTag.getTagName()).collect(Collectors.toSet())
                        )
                ))
                .collect(Collectors.toList());
    }

    @Mapping(target = "bookmarked", expression = "java(markedOrNot(project.getBookmarkList()))")
    default ProjectDto.AllResponseDto entityToAllResponseDto(Project project) {
        return new ProjectDto.AllResponseDto(
                project.getBoardId(),
                project.getTitle(),
                project.getContent(),
                project.getStackTags().stream()
                        .map(stackTag -> stackTag.getTagName()).collect(Collectors.toSet()),
                project.getStartDate(),
                project.getDeadline(),
                project.getCreatedAt(),
                project.getModifiedAt(),
                project.getRecruitNum(),
                project.getProjectStatus(),
                markedOrNot(project.getBookmarkList()),
                project.getViewCount(),
                new MemberProfileDto.listResponse(
                        project.getMemberProfile().getMemberProfileId(),
                        project.getMemberProfile().getProfilePicture(),
                        project.getMemberProfile().getNickname(),
                        project.getMemberProfile().getGithubId(),
                        project.getMemberProfile().getPositions().stream().map(position -> position.getPositionName()).collect(Collectors.toSet()),
                        project.getMemberProfile().getStackTags().stream().map(stackTag -> stackTag.getTagName()).collect(Collectors.toSet())
                )
        );
    }


    default boolean markedOrNot(List<Bookmark> BookmarkList) {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        if(userEmail.equals("anonymousUser")) {
            return false;
        } else {
            return BookmarkList.stream().anyMatch(bookmark -> bookmark.getMemberProfile().getMember().getEmail().equals(userEmail));
        }
    }
}
