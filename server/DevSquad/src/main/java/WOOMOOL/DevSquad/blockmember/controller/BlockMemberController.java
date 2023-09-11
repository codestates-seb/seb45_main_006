package WOOMOOL.DevSquad.blockmember.controller;

import WOOMOOL.DevSquad.blockmember.dto.BlockMemberDto;
import WOOMOOL.DevSquad.blockmember.service.BlockMemberService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/blockMember")
public class BlockMemberController {
    private final BlockMemberService blockMemberService;

    public BlockMemberController(BlockMemberService blockMemberService) {
        this.blockMemberService = blockMemberService;
    }

    @PostMapping()
    public ResponseEntity createBlockMember(@RequestBody BlockMemberDto blockMemberDto){

        blockMemberService.setBlockMember(blockMemberDto.getBlockMemberId(),blockMemberDto.getReportContent());

        return new ResponseEntity(HttpStatus.OK);
    }
    @DeleteMapping("/{member-id}")
    public ResponseEntity deleteBlockMember(@PathVariable("member-id") long memberId){

        blockMemberService.deleteBlockMember(memberId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

}
