package WOOMOOL.DevSquad.member.mapper;

import WOOMOOL.DevSquad.member.dto.MemberPostDto;
import WOOMOOL.DevSquad.member.dto.MemberProfileDto;
import WOOMOOL.DevSquad.member.entity.Member;
import WOOMOOL.DevSquad.member.entity.MemberProfile;
import org.mapstruct.Mapper;

import java.time.LocalDateTime;

@Mapper(componentModel = "Spring")
public interface MemberMapper {

    Member postDtoToEntity(MemberPostDto postDto);
    MemberProfile patchDtoToEntity(MemberProfileDto.Patch patchDto);

    default MemberProfileDto.Response entityToResponseDto(MemberProfile memberProfile) {
        return new MemberProfileDto.Response(
                memberProfile.getMember().getNickname(),
                memberProfile.getGithubId(),
                memberProfile.getIntroduction(),
                memberProfile.isListEnroll(),
                memberProfile.isOAuth2User(),
                memberProfile.getModifiedAt()
        );
    }

}
