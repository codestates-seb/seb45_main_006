package WOOMOOL.DevSquad.bookmark.controller;

import WOOMOOL.DevSquad.bookmark.entity.Bookmark;
import WOOMOOL.DevSquad.bookmark.service.BookmarkService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/{board}/{boardId}/bookmark")
public class BookmarkController {

    private final BookmarkService bookmarkService;

    @PostMapping
    public ResponseEntity addBookmark(@Positive @PathVariable("boardId") Long boardId) {
        HttpStatus httpStatus = bookmarkService.addBookmark(boardId);

        return new ResponseEntity(httpStatus);
    }

}
