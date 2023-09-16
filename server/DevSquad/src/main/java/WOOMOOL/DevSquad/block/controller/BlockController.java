package WOOMOOL.DevSquad.block.controller;

import WOOMOOL.DevSquad.block.dto.BlockDto;
import WOOMOOL.DevSquad.block.service.BlockService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/block")
public class
BlockController {
    private final BlockService blockService;

    public BlockController(BlockService blockService) {
        this.blockService = blockService;
    }

    @PostMapping()
    public ResponseEntity createBlock(@RequestBody BlockDto blockDto){

        blockService.setBlockMember(blockDto.getBlockMemberId(), blockDto.getReportContent());

        return new ResponseEntity(HttpStatus.OK);
    }
    @DeleteMapping("/{member-id}")
    public ResponseEntity deleteBlock(@PathVariable("member-id") long memberId){

        blockService.deleteBlockMember(memberId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

}
