package WOOMOOL.DevSquad.blockmember.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class BlockMemberDto {

    private long blockMemberId;
    @NotBlank
    private String reportContent;
}
