package WOOMOOL.DevSquad.member.mapper;

import WOOMOOL.DevSquad.member.dto.MemberPostDto;
import WOOMOOL.DevSquad.member.dto.MemberProfileDto;
import WOOMOOL.DevSquad.member.entity.Member;
import WOOMOOL.DevSquad.member.entity.MemberProfile;
import org.mapstruct.Mapper;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Mapper(componentModel = "Spring")
public interface MemberMapper {

    Member postDtoToEntity(MemberPostDto postDto);

    MemberProfile patchDtoToEntity(MemberProfileDto.Patch patchDto);

    // MemberProfile 상세 정보 Mapping
    default MemberProfileDto.detailResponse entityToResponseDto(MemberProfile memberProfile){
        return new MemberProfileDto.detailResponse(
                memberProfile.getProfilePicture(),
                memberProfile.getNickname(),
                memberProfile.getGithubId(),
                memberProfile.getIntroduction(),
                memberProfile.isListEnroll(),
                memberProfile.isOAuth2User(),
                memberProfile.getPositions().stream().map(position -> position.getPositionName()).collect(Collectors.toSet()),
                new ArrayList<>(),
                memberProfile.getModifiedAt()
        );
    }

    List<MemberProfileDto.listResponse> entityToResponseDto(List<MemberProfile> memberProfiles);
}


