package WOOMOOL.DevSquad.bookmark.service;

import WOOMOOL.DevSquad.board.entity.Board;
import WOOMOOL.DevSquad.board.repository.BoardRepository;
import WOOMOOL.DevSquad.bookmark.entity.Bookmark;
import WOOMOOL.DevSquad.bookmark.repository.BookmarkRepository;
import WOOMOOL.DevSquad.exception.BusinessLogicException;
import WOOMOOL.DevSquad.exception.ExceptionCode;
import WOOMOOL.DevSquad.member.entity.MemberProfile;
import WOOMOOL.DevSquad.member.service.MemberService;
import WOOMOOL.DevSquad.projectboard.entity.Project;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class BookmarkService {
    private final BookmarkRepository bookmarkRepository;
    private final MemberService memberService;
    private final BoardRepository boardRepository;

    public BookmarkService(BookmarkRepository bookmarkRepository, MemberService memberService, BoardRepository boardRepository) {
        this.bookmarkRepository = bookmarkRepository;
        this.memberService = memberService;
        this.boardRepository = boardRepository;
    }

    // 북마크 추가 / 제거
    public HttpStatus addBookmark(Long boardId) {

        Board findBoard = findVerifiedBoard(boardId);
        MemberProfile findMemberProfile = memberService.findMemberFromToken().getMemberProfile();

        if( bookmarkRepository.findByMemberProfileAndBoard(findMemberProfile.getMemberProfileId(), boardId) == null) {
            Bookmark bookmark = new Bookmark();

            bookmark.setMemberProfile(findMemberProfile);
            bookmark.setBoard(findBoard);

            bookmarkRepository.save(bookmark);
            return HttpStatus.CREATED;

        } else {
            bookmarkRepository.delete(bookmarkRepository.findByMemberProfileAndBoard(findMemberProfile.getMemberProfileId(), boardId));
            return HttpStatus.NO_CONTENT;
        }
    }

    private Board findVerifiedBoard(Long boardId) {
        Optional<Board> optionalBoard = boardRepository.findById(boardId);
        if( optionalBoard.isPresent() )
            return optionalBoard.get();
        else throw new BusinessLogicException(ExceptionCode.POST_NOT_FOUND);
    }
}
