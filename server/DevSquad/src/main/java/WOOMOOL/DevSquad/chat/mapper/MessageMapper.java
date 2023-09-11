package WOOMOOL.DevSquad.chat.mapper;

import WOOMOOL.DevSquad.chat.dto.MessageDto;
import WOOMOOL.DevSquad.chat.entity.Message;
import org.mapstruct.Mapper;

@Mapper(componentModel = "Spring")
public interface MessageMapper {

    Message postDtoToEntity(MessageDto.Post postDto);

    MessageDto.Response entityToResponse(Message message);
}
