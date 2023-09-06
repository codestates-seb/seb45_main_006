package WOOMOOL.DevSquad.exception;

import lombok.Getter;

public enum ExceptionCode {
    INFOBOARD_NOT_FOUND(404, "InfoBoard not found"),
    STACK_NOT_FOUND(404, "Stack not found"),

    // 찾기 편하려고 이모지 잠깐 넣어뒀어요. 나중에 뺄게요!
    PROJECT_NOT_FOUND(404, "🚨🚨🚨 Project not found 🚨🚨🚨"),
    STUDY_NOT_FOUND(404, "🚨🚨🚨 Study not found 🚨🚨🚨"),
    NO_AUTHORIZATION(401, "🚨🚨🚨 No Auth 🚨🚨🚨"),
    FORBIDDEN(403, "Forbidden"),

    UNMATCHED_CODE(400, "인증 코드가 다릅니다."),
    MEMBER_NOT_FOUND(404, "회원을 찾을 수 없습니다"),
    EXIST_EMAIL(400, "존재하는 이메일 입니다."),
    DUPLICATE_NICKNAME(400, "중복된 닉네임 입니다."),
    UNMATCHED_PASSWORD(400, "비밀번호가 일치하지 않습니다."),
    QUITED_MEMBER(204, "탈퇴한 회원입니다."),
    NOT_BLOCKED_MEMBER(404, "차단하지 않은 회원입니다."),
    DUPLICATE_BLOCKING(400, "중복해서 차단할 수 없습니다."),
    CANT_SELF_BLOCKING(400, "자신을 차단할 수 없습니다.");



    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
