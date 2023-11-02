package WOOMOOL.DevSquad.level.controller;

import WOOMOOL.DevSquad.level.dto.LevelDto;
import WOOMOOL.DevSquad.level.entity.Level;
import WOOMOOL.DevSquad.level.mapper.LevelMapper;
import WOOMOOL.DevSquad.level.repository.LevelRepository;
import WOOMOOL.DevSquad.level.service.LevelService;
import WOOMOOL.DevSquad.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/level")
public class LevelController {

    private final LevelMapper levelMapper;
    private final MemberService memberService;
    @GetMapping()
    public ResponseEntity getMemberLevel(){

        Level level = memberService.findMemberFromToken().getMemberProfile().getLevel();
        LevelDto.Response response = levelMapper.entityToResponse(level);

        return new ResponseEntity(response, HttpStatus.OK);
    }
}
