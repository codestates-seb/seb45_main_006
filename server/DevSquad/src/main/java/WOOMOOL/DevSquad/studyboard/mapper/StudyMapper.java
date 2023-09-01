package WOOMOOL.DevSquad.studyboard.mapper;

import WOOMOOL.DevSquad.studyboard.dto.StudyDto;
import WOOMOOL.DevSquad.studyboard.entity.Study;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface StudyMapper {
    Study postDtoToEntity(StudyDto.PostDto postDto);
    Study patchDtoToEntity(StudyDto.PatchDto patchDto);
    List<StudyDto.previewResponseDto> entityToPreviewResponseDto(List<Study> studies);
    StudyDto.AllResponseDto entityToAllResponseDto(Study study);
}
