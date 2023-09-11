package WOOMOOL.DevSquad.block.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class BlockDto {

    private long blockMemberId;
    @NotBlank
    private String reportContent;
}
