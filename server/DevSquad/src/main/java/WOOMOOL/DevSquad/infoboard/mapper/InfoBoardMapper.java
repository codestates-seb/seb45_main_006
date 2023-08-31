package WOOMOOL.DevSquad.infoboard.mapper;

import WOOMOOL.DevSquad.infoboard.dto.InfoBoardDto;
import WOOMOOL.DevSquad.infoboard.entity.InfoBoard;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface InfoBoardMapper {
    @Mapping(source = "memberId", target = "memberProfile.memberProfileId")
    InfoBoard InfoBoardPostDtoToInfoBoard(InfoBoardDto.Post request);
    InfoBoard InfoBoardPatchDtoToInfoBoard(InfoBoardDto.Patch request);
    InfoBoardDto.Response InfoBoardToInfoBoardResponseDto(InfoBoard infoBoard);
    List<InfoBoardDto.Response> InfoBoardListToInfoBoardResponseDtoList(List<InfoBoard> infoBoardList);

}
