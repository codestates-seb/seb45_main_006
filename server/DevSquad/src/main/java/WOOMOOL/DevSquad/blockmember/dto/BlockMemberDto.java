package WOOMOOL.DevSquad.blockmember.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class BlockMemberDto {

    private long blockId;
    @NotBlank
    private String reportContent;
}
