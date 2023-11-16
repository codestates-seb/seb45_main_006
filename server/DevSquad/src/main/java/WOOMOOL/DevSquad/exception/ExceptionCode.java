package WOOMOOL.DevSquad.exception;

import lombok.Getter;

public enum ExceptionCode {
    BOARD_NOT_FOUND(404, "게시판을 찾을 수 없습니다"),
    COMMENT_NOT_FOUND(404,"댓글을 찾을 수 없습니다"),
    QUESTION_NOT_FOUND(404, "질문을 찾을 수 없습니다"),
    ANSWER_NOT_FOUND(404, "질문을 찾을 수 없습니다"),
    ACCEPT_ALREADY_EXISTS(409, "이미 채택이 완료된 질문입니다."),
    POST_NOT_FOUND(404, "게시물을 찾을 수 없습니다."),
    PROJECT_NOT_FOUND(404, "프로젝트를 찾을 수 없습니다."),
    STUDY_NOT_FOUND(404, "스터디를 찾을 수 없습니다."),
    NO_AUTHORIZATION(401, "접근 권한이 없습니다."),
    CANT_EDIT(400, "모집 완료된 게시물은 수정할 수 없습니다."),
    FORBIDDEN(403, "Forbidden"),

    UNMATCHED_CODE(400, "인증 코드가 다릅니다."),
    MEMBER_NOT_FOUND(404, "회원을 찾을 수 없습니다"),
    EXIST_EMAIL(400, "존재하는 이메일 입니다."),
    DUPLICATE_NICKNAME(400, "중복된 닉네임 입니다."),
    UNMATCHED_PASSWORD(400, "비밀번호가 일치하지 않습니다."),
    QUITED_MEMBER(204, "탈퇴한 회원입니다."),
    NOT_BLOCKED_MEMBER(404, "차단하지 않은 회원입니다."),
    DUPLICATE_BLOCKING(400, "중복해서 차단할 수 없습니다."),
    CANT_SELF_BLOCKING(400, "자신을 차단할 수 없습니다."),
    CHAT_ROOM_NOT_FOUND(404, "채팅방을 찾을 수 없습니다"),
    DUPLICATE_CHAT_ROOM(400, "이미 서로 채팅중인 채팅방이 있습니다."),
    CHAT_ROOM_CLOSED(404, "닫힌 채팅방 입니다."),
    TOKEN_EXPIRED(400, "토큰이 만료되었습니다"),
    INVALID_TOKEN(400, "유효하지 않은 토큰입니다."),
    BAD_REQUEST(400, "잘못된 요청입니다."),
    CHECK_COMPLETED(400, "출석은 1일 1회 가능합니다.");



    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
