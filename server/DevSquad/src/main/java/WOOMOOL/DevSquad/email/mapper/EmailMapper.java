package WOOMOOL.DevSquad.email.mapper;

import WOOMOOL.DevSquad.email.dto.EmailDto;
import WOOMOOL.DevSquad.email.entity.Email;
import org.mapstruct.Mapper;

@Mapper(componentModel = "Spring")
public interface EmailMapper {

    Email postDtoToEntity(EmailDto emailDto);
}
