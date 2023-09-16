package WOOMOOL.DevSquad.member.mapper;

import WOOMOOL.DevSquad.infoboard.dto.InfoBoardDto;
import WOOMOOL.DevSquad.member.dto.MemberPostDto;
import WOOMOOL.DevSquad.member.dto.MemberProfileDto;
import WOOMOOL.DevSquad.member.entity.Member;
import WOOMOOL.DevSquad.member.entity.MemberProfile;
import WOOMOOL.DevSquad.projectboard.dto.ProjectDto;
import WOOMOOL.DevSquad.questionboard.dto.QuestionBoardDto;
import WOOMOOL.DevSquad.studyboard.dto.StudyDto;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "Spring")
public interface MemberMapper {

    Member postDtoToEntity(MemberPostDto postDto);

    MemberProfile patchDtoToEntity(MemberProfileDto.Patch patchDto);

    // 프로필 수정 응답
    default MemberProfileDto.patchResponse entityToPatchResponseDto(MemberProfile memberProfile) {
        return new MemberProfileDto.patchResponse(
                memberProfile.getMemberProfileId(),
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

    // 내 프로필 상세 정보 Mapping
    default MemberProfileDto.myProfileResponse entityToResponseDto(MemberProfile memberProfile) {

        return new MemberProfileDto.myProfileResponse(
                memberProfile.getMemberProfileId(),
                memberProfile.getProfilePicture(),
                memberProfile.getNickname(),
                memberProfile.getGithubId(),
                memberProfile.getIntroduction(),
                memberProfile.isListEnroll(),
                memberProfile.getMember().getMemberType(),
                memberProfile.getPositions().stream()
                        .map(position -> position.getPositionName()).collect(Collectors.toSet()),
                memberProfile.getStackTags().stream()
                        .map(stackTag -> stackTag.getTagName()).collect(Collectors.toSet()),
                memberProfile.getBlockList().stream()
                        .map(blockMember -> blockMember.getBlockMemberId()).collect(Collectors.toList()),
                memberProfile.getModifiedAt()
        );
    }

    // 유저 리스트 Mapping
    default List<MemberProfileDto.listResponse> entityToResponseDto(List<MemberProfile> memberProfiles) {
        return memberProfiles.stream()
                .map(memberProfile -> new MemberProfileDto.listResponse(
                        memberProfile.getMemberProfileId(),
                        memberProfile.getProfilePicture(),
                        memberProfile.getNickname(),
                        memberProfile.getGithubId(),
                        memberProfile.getPositions().stream().map(position -> position.getPositionName()).collect(Collectors.toSet()),
                        memberProfile.getStackTags().stream().map(stackTag -> stackTag.getTagName()).collect(Collectors.toSet())))
                .collect(Collectors.toList());

    }
    // 유저리스트 유저 정보 상세보기 Mapping
    default MemberProfileDto.memberProfileResponse entityToResponseDto(MemberProfile memberProfile,
                                                                       List<ProjectDto.previewResponseDto> projectResponseDto,
                                                                       List<StudyDto.previewResponseDto> studyResponseDto,
                                                                       List<InfoBoardDto.Response> infoBoardResponseDto,
                                                                       List<QuestionBoardDto.Response> questionBoardDto){

        return new MemberProfileDto.memberProfileResponse(
                memberProfile.getMemberProfileId(),
                memberProfile.getProfilePicture(),
                memberProfile.getNickname(),
                memberProfile.getGithubId(),
                memberProfile.getIntroduction(),
                memberProfile.getPositions().stream()
                        .map(position -> position.getPositionName()).collect(Collectors.toSet()),
                memberProfile.getStackTags().stream()
                        .map(stackTag -> stackTag.getTagName()).collect(Collectors.toSet()),
                projectResponseDto,
                studyResponseDto,
                infoBoardResponseDto,
                questionBoardDto,
                memberProfile.getModifiedAt()
        );

    }
}


