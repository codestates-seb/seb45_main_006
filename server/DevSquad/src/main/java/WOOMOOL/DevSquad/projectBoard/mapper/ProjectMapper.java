package WOOMOOL.DevSquad.projectBoard.mapper;

import WOOMOOL.DevSquad.projectBoard.dto.ProjectDto;
import WOOMOOL.DevSquad.projectBoard.entity.Project;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProjectMapper {
    Project postDtoToEntity(ProjectDto.PostDto postDto);
    Project patchDtoToEntity(ProjectDto.PatchDto patchDto);
    List<ProjectDto.previewResponseDto> entityToPreviewResponseDto(List<Project> projects);
    ProjectDto.AllResponseDto entityToAllResponseDto(Project project);
}
