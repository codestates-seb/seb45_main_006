package WOOMOOL.DevSquad.exception;

import lombok.Getter;

public enum ExceptionCode {
    INFOBOARD_NOT_FOUND(404, "InfoBoard not found"),
    STACK_NOT_FOUND(404, "Stack not found");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
