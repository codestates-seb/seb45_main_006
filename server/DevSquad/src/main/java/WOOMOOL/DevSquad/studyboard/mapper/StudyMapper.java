package WOOMOOL.DevSquad.studyboard.mapper;

import WOOMOOL.DevSquad.bookmark.entity.Bookmark;
import WOOMOOL.DevSquad.likes.entity.Likes;
import WOOMOOL.DevSquad.member.dto.MemberProfileDto;
import WOOMOOL.DevSquad.projectboard.dto.ProjectDto;
import WOOMOOL.DevSquad.projectboard.entity.Project;
import WOOMOOL.DevSquad.studyboard.dto.StudyDto;
import WOOMOOL.DevSquad.studyboard.entity.Study;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface StudyMapper {
    default Study postDtoToEntity(StudyDto.PostDto postDto) {
        Study study = new Study();

        study.setTitle( postDto.getTitle() );
        study.setContent( postDto.getContent() );
        study.setRecruitNum( postDto.getRecruitNum() );

        return study;
    }

    default Study patchDtoToEntity(StudyDto.PatchDto patchDto) {
        Study study = new Study();
        if (patchDto.getBoardId() != null) {
            study.setBoardId(patchDto.getBoardId());
        }

        study.setTitle(patchDto.getTitle());
        study.setContent(patchDto.getContent());
        study.setRecruitNum(patchDto.getRecruitNum());
        study.setStudyStatus(patchDto.getStudyStatus());

        return study;
    }

    @Mapping(target = "bookmarked", expression = "java(markedOrNot(study.getBookmarkList()))")
    default List<StudyDto.previewResponseDto> entityToPreviewResponseDto(List<Study> studies) {
        return studies.stream()
                .map(study -> new StudyDto.previewResponseDto(
                        study.getBoardId(),
                        study.getTitle(),
                        study.getStackTags().stream()
                                .map(stackTag -> stackTag.getTagName())
                                .collect(Collectors.toSet()),
                        study.getCreatedAt(),
                        study.getModifiedAt(),
                        study.getRecruitNum(),
                        study.getStudyStatus(),
                        markedOrNot(study.getBookmarkList()),
                        study.getViewCount(),
                        new MemberProfileDto.listResponse(
                                study.getMemberProfile().getMemberProfileId(),
                                study.getMemberProfile().getProfilePicture(),
                                study.getMemberProfile().getNickname(),
                                study.getMemberProfile().getGithubId(),
                                study.getMemberProfile().getPositions().stream().map(position -> position.getPositionName()).collect(Collectors.toSet()),
                                study.getMemberProfile().getStackTags().stream().map(stackTag -> stackTag.getTagName()).collect(Collectors.toSet())
                        )
                ))
                .collect(Collectors.toList());
    }

    @Mapping(target = "bookmarked", expression = "java(markedOrNot(study.getBookmarkList()))")
    default StudyDto.AllResponseDto entityToAllResponseDto(Study study) {
        return new StudyDto.AllResponseDto(
                study.getBoardId(),
                study.getTitle(),
                study.getContent(),
                study.getStackTags().stream()
                        .map(stackTag -> stackTag.getTagName()).collect(Collectors.toSet()),
                study.getCreatedAt(),
                study.getModifiedAt(),
                study.getRecruitNum(),
                study.getStudyStatus(),
                markedOrNot(study.getBookmarkList()),
                study.getViewCount(),
                new MemberProfileDto.listResponse(
                        study.getMemberProfile().getMemberProfileId(),
                        study.getMemberProfile().getProfilePicture(),
                        study.getMemberProfile().getNickname(),
                        study.getMemberProfile().getGithubId(),
                        study.getMemberProfile().getPositions().stream().map(position -> position.getPositionName()).collect(Collectors.toSet()),
                        study.getMemberProfile().getStackTags().stream().map(stackTag -> stackTag.getTagName()).collect(Collectors.toSet())
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
