package WOOMOOL.DevSquad.stacktag.controller;

import WOOMOOL.DevSquad.stacktag.service.StackTagService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/tags")
public class StackTagController {
    private final StackTagService stackTagService;

    public StackTagController(StackTagService stackTagService) {
        this.stackTagService = stackTagService;
    }
    //스택태그를 추가할때의 검색기능
    @GetMapping
    public ResponseEntity getStackTags(@RequestParam(name = "keyword", required = false) String keyword) {
        return new ResponseEntity<>(stackTagService.getStackTags(keyword), HttpStatus.OK);
    }
}
