package WOOMOOL.DevSquad.infoboard.controller;

import WOOMOOL.DevSquad.infoboard.dto.InfoBoardDto;
import WOOMOOL.DevSquad.infoboard.entity.InfoBoard;
import WOOMOOL.DevSquad.infoboard.mapper.InfoBoardMapper;
import WOOMOOL.DevSquad.infoboard.service.InfoBoardService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;


import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController
@Validated
@RequestMapping("/information")
public class InfoBoardController {
    private final static String INFOBOARD_DEFAULT_URL = "/information";
    private final InfoBoardService infoBoardService;
    private final InfoBoardMapper mapper;

    public InfoBoardController(InfoBoardService infoBoardService,
                               InfoBoardMapper mapper) {
        this.infoBoardService = infoBoardService;
        this.mapper = mapper;
    }
    @PostMapping
    public ResponseEntity postInfoBoard(@Valid @RequestBody InfoBoardDto.Post requestBody) {
        InfoBoard infoBoard = mapper.InfoBoardPostDtoToInfoBoard(requestBody);

        InfoBoard createdInfoBoard = infoBoardService.createInfoBoard(infoBoard);

        URI location = UriComponentsBuilder
                .newInstance()
                .path(INFOBOARD_DEFAULT_URL + "/{board-id}")
                .buildAndExpand(createdInfoBoard.getBoardId())
                .toUri();

        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{board-id}")
    public ResponseEntity patchInfoBoard(@Valid @RequestBody InfoBoardDto.Patch requestBody,
                                         @PathVariable("board-id") @Positive long boardId) {
        requestBody.setBoardId(boardId);
        InfoBoard infoBoard = mapper.InfoBoardPatchDtoToInfoBoard(requestBody);

        InfoBoard updatedInfoBoard = infoBoardService.updateInfoBoard(infoBoard);

        return new ResponseEntity<>(mapper.InfoBoardToInfoBoardResponseDto(updatedInfoBoard), HttpStatus.OK);
    }
    @GetMapping
    public ResponseEntity getAllInfoBoard(@RequestParam(name = "search", required = false) String search) {
        List<InfoBoard> infoBoardList = infoBoardService.findAllInfoBoard(null, search);

        return new ResponseEntity<>(mapper.InfoBoardListToInfoBoardResponseDtoList(infoBoardList), HttpStatus.OK);
    }
    @GetMapping("/{category}")
    public ResponseEntity getCategoryInfoBoard(@PathVariable("category") String category,
                                               @RequestParam(name = "search", required = false) String search) {
        List<InfoBoard> infoBoardList = infoBoardService.findAllInfoBoard(category, search);

        return new ResponseEntity<>(mapper.InfoBoardListToInfoBoardResponseDtoList(infoBoardList), HttpStatus.OK);
    }

    @PostMapping("/{board-id}")
    public ResponseEntity increaseViewCount(@PathVariable("board-id") @Positive long boardId) {
        infoBoardService.increaseViewCount(boardId);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{board-id}")
    public ResponseEntity deleteInfoBoard(@PathVariable("board-id") @Positive long boardId) {
        infoBoardService.deleteInfoBoard(boardId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
