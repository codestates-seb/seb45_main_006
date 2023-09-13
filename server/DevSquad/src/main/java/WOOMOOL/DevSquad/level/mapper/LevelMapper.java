package WOOMOOL.DevSquad.level.mapper;

import WOOMOOL.DevSquad.level.dto.LevelDto;
import WOOMOOL.DevSquad.level.entity.Level;
import org.mapstruct.Mapper;

@Mapper(componentModel = "Spring")
public interface LevelMapper {

    default LevelDto.Response entityToResponse(Level level){

        return new LevelDto.Response(
                level.getMemberProfile().getMemberProfileId(),
                level.getGrade(),
                level.getCurrentExp(),
                level.getMaxExp()
        );
    }
}
