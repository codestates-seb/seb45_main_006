package WOOMOOL.DevSquad.exception;

import lombok.Getter;

public enum ExceptionCode {
    INFOBOARD_NOT_FOUND(404, "InfoBoard not found"),
    STACK_NOT_FOUND(404, "Stack not found"),

    // 찾기 편하려고 이모지 잠깐 넣어뒀어요. 나중에 뺄게요!
    PROJECT_NOT_FOUND(404, "🚨🚨🚨 Project not found 🚨🚨🚨"),
    STUDY_NOT_FOUND(404, "🚨🚨🚨 Study not found 🚨🚨🚨"),
    NO_AUTHORIZATION(401, "🚨🚨🚨 No Auth 🚨🚨🚨"),
    FORBIDDEN(403, "Forbidden");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
