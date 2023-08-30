package WOOMOOL.DevSquad.studyBoard.mapper;

import WOOMOOL.DevSquad.studyBoard.dto.StudyDto;
import WOOMOOL.DevSquad.studyBoard.entity.Study;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface StudyMapper {
    Study postDtoToEntity(StudyDto.PostDto postDto);
    Study patchDtoToEntity(StudyDto.PatchDto patchDto);
    List<StudyDto.previewResponseDto> entityToPreviewResponseDto(List<Study> studies);
    StudyDto.AllResponseDto entityToAllResponseDto(Study study);
}
