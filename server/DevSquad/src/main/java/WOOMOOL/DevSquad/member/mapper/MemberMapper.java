package WOOMOOL.DevSquad.member.mapper;

import WOOMOOL.DevSquad.infoboard.dto.InfoBoardDto;
import WOOMOOL.DevSquad.member.dto.MemberPostDto;
import WOOMOOL.DevSquad.member.dto.MemberProfileDto;
import WOOMOOL.DevSquad.member.entity.Member;
import WOOMOOL.DevSquad.member.entity.MemberProfile;
import WOOMOOL.DevSquad.projectboard.dto.ProjectDto;
import WOOMOOL.DevSquad.studyboard.dto.StudyDto;
import org.mapstruct.Mapper;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Mapper(componentModel = "Spring")
public interface MemberMapper {

    Member postDtoToEntity(MemberPostDto postDto);

    MemberProfile patchDtoToEntity(MemberProfileDto.Patch patchDto);

    // 프로필 수정 응답
    default MemberProfileDto.patchResponse entityToResponseDto(MemberProfile memberProfile) {
        return new MemberProfileDto.patchResponse(
                memberProfile.getNickname(),
                memberProfile.getProfilePicture(),
                memberProfile.getGithubId(),
                memberProfile.getIntroduction(),
                memberProfile.isListEnroll(),
                memberProfile.getPositions().stream()
                        .map(position -> position.getPositionName()).collect(Collectors.toSet()),
                memberProfile.getStackTags().stream()
                        .map(stackTag -> stackTag.getTagName()).collect(Collectors.toSet())
        );
    }

    // MemberProfile 상세 정보 Mapping
    default MemberProfileDto.detailResponse entityToResponseDto(MemberProfile memberProfile,
                                                                List<ProjectDto.previewResponseDto> projectResponseDto,
                                                                List<StudyDto.previewResponseDto> studyResponseDto,
                                                                List<InfoBoardDto.Response> infoBoardResponseDto) {

        return new MemberProfileDto.detailResponse(
                memberProfile.getProfilePicture(),
                memberProfile.getNickname(),
                memberProfile.getGithubId(),
                memberProfile.getIntroduction(),
                memberProfile.isListEnroll(),
                memberProfile.isOAuth2Member(),
                memberProfile.getPositions().stream()
                        .map(position -> position.getPositionName()).collect(Collectors.toSet()),
                memberProfile.getStackTags().stream()
                        .map(stackTag -> stackTag.getTagName()).collect(Collectors.toSet()),
                projectResponseDto,
                studyResponseDto,
                infoBoardResponseDto,
                memberProfile.getBlockMemberList().stream()
                        .map(blockMember -> blockMember.getBlockNickname()).collect(Collectors.toList()),
                memberProfile.getModifiedAt()
        );
    }

    // 유저 리스트 Mapping
    default List<MemberProfileDto.listResponse> entityToResponseDto(List<MemberProfile> memberProfiles) {
        return memberProfiles.stream()
                .map(memberProfile -> new MemberProfileDto.listResponse(
                        memberProfile.getProfilePicture(),
                        memberProfile.getNickname(),
                        memberProfile.getGithubId(),
                        memberProfile.getPositions().stream().map(position -> position.getPositionName()).collect(Collectors.toSet()),
                        memberProfile.getStackTags().stream().map(stackTag -> stackTag.getTagName()).collect(Collectors.toSet())))
                .collect(Collectors.toList());

    }
}


