package WOOMOOL.DevSquad.infoboard.controller;

import WOOMOOL.DevSquad.infoboard.dto.InfoBoardDto;
import WOOMOOL.DevSquad.infoboard.entity.InfoBoard;
import WOOMOOL.DevSquad.infoboard.mapper.InfoBoardMapper;
import WOOMOOL.DevSquad.infoboard.service.InfoBoardService;
import WOOMOOL.DevSquad.member.entity.Member;
import WOOMOOL.DevSquad.member.service.MemberService;
import WOOMOOL.DevSquad.utils.PageResponseDto;
import org.springframework.data.domain.Page;
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
    @GetMapping("/{board-id}")
    public ResponseEntity getInfoBoard(@PathVariable("board-id") @Positive long boardId) {
        InfoBoard infoBoard = infoBoardService.findVerifiedInfoBoard(boardId);

        return new ResponseEntity<>(mapper.InfoBoardToInfoBoardResponseDto(infoBoard), HttpStatus.OK);
    }

    // 회원이 쓴 정보게시판 조회
    @GetMapping("/member/{member-id}")
    public ResponseEntity getMemberInfoBoard(@PathVariable("member-id") Long memberId,
                                             @RequestParam int page){

        Page<InfoBoard> infoBoardListPage = infoBoardService.getInfoBoardList(memberId,page-1);
        List<InfoBoard> infoBoardList = infoBoardService.removeBlockUserBoard(infoBoardListPage.getContent());
        List<InfoBoardDto.Response> response = mapper.InfoBoardListToInfoBoardResponseDtoList(infoBoardList);

        return new ResponseEntity(new PageResponseDto(response,infoBoardListPage),HttpStatus.OK);

    }

    //정보게시판 전체 검색
    @GetMapping
    public ResponseEntity getAllInfoBoard(@RequestParam(name = "search", required = false) String search,
                                          @RequestParam @Positive int page,
                                          @RequestParam @Positive int size) {
        Page<InfoBoard> infoBoardPage = infoBoardService.findAllInfoBoard(null, search, page-1, size);
        List<InfoBoard> infoBoardList = infoBoardService.removeBlockUserBoard(infoBoardPage.getContent());

        return new ResponseEntity<>(new PageResponseDto<>(mapper.InfoBoardListToInfoBoardResponseDtoList(infoBoardList), infoBoardPage),
                HttpStatus.OK);
    }
    //정보게시판 카테고리별로 검색
    @GetMapping("/{category}")
    public ResponseEntity getCategoryInfoBoard(@PathVariable("category") String category,
                                               @RequestParam(name = "search", required = false) String search,
                                               @RequestParam @Positive int page,
                                               @RequestParam @Positive int size) {
        Page<InfoBoard> infoBoardPage = infoBoardService.findAllInfoBoard(category, search, page-1, size);
        List<InfoBoard> infoBoardList = infoBoardPage.getContent();

        return new ResponseEntity<>(new PageResponseDto<>(mapper.InfoBoardListToInfoBoardResponseDtoList(infoBoardList), infoBoardPage),
                HttpStatus.OK);
    }
    //HottestList
    @GetMapping("/hottest")
    public ResponseEntity getHottestInfoBoard() {
        List<InfoBoard> infoBoardList = infoBoardService.findHottestInfoBoard();

        return new ResponseEntity<>(mapper.InfoBoardListToInfoBoardResponseDtoList(infoBoardList), HttpStatus.OK);
    }

    //뷰카운트 올리기 (정보게시판을 펼쳐서 보기때문에 상세페이지가 따로 없어서 펼치기를 누르면 조회수가 올라감
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
