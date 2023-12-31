import { GetReqComment, SpecifyBoard, SpecifyComment } from "@type/comment/comment.req.dto";
import {
    SpecifyAnswer,
    SpecifyQuestion,
    SpecifyAnswerComment,
    GetReqAnswer,
    GetReqAnswerComment,
} from "@type/answer/answer.req.dto";
import { DeleteReqExitChatRoom, GetReqEnrollChatRoom } from "@type/chat/chat.req.dto";

export const COMMON_API_PATH = {
    USER: {
        PATH: "/users",
    },
    TODO: {
        PATH: "/todos",
        ADD: "/todos/add",
    },
    SIGN: {
        PATH: "/members",
        NICKNAME: "/members/checkNickname",
        LOGIN: "/login",
        LOGOUT: "/refreshToken",
        NEW_ACCESS_TOKEN: "/accessToken",
    },
    AUTH: {
        FOR_SIGNUP: "/email/auth",
        FOR_SIGNUP_AUTH: "/email/authEmail",
        FOR_FIND_PW: "/email/findPassword",
        FOR_FIND_PW_AUTH: "/email/authPassword",
    },
    MEMBER: {
        PATH: "/members",
        LIST: "/members/list",
        MY_LIST: "/members/list",
        CHANGE_PASSWORD: "/members/password",
        BLOCK: "/block",
    },
    INFO: {
        PATH: "/information",
    },
    QUESTION: {
        PATH: "/question",
    },
    PROJECT: {
        PATH: "/project",
        LIST: "/project/list",
    },
    STUDY: {
        PATH: "/study",
        LIST: "/study/list",
    },
} as const;

export const MAKE_API_PATH = {
    COMMENT: {
        list: ({ board, boardId, page, size }: GetReqComment) =>
            `/${board}/${boardId}/comment?page=${page}&size=${size}`,
        add: ({ board, boardId }: SpecifyBoard) => `/${board}/${boardId}/comment`,
        addRe: ({ board, boardId, commentId }: SpecifyComment) => `/${board}/${boardId}/comment/${commentId}`,
        update: ({ board, boardId, commentId }: SpecifyComment) => `/${board}/${boardId}/comment/${commentId}`,
        delete: ({ board, boardId, commentId }: SpecifyComment) => `/${board}/${boardId}/comment/${commentId}`,
    },
    ANSWER: {
        list: ({ questionId, page, size }: GetReqAnswer) => `/question/${questionId}/answer?page=${page}&size=${size}`,
        commentList: ({ questionId, page, size, answerId }: GetReqAnswerComment) =>
            `/question/${questionId}/answer/${answerId}/comment?page=${page}&size=${size}`,
        add: ({ questionId }: SpecifyQuestion) => `/question/${questionId}/answer`,
        update: ({ questionId, answerId }: SpecifyAnswer) => `/question/${questionId}/answer/${answerId}`,
        delete: ({ questionId, answerId }: SpecifyAnswer) => `/question/${questionId}/answer/${answerId}`,
        accept: ({ questionId, answerId }: SpecifyAnswer) => `/question/${questionId}/answer/${answerId}/accept`,
        addComment: ({ questionId, answerId }: SpecifyAnswer) => `/question/${questionId}/answer/${answerId}/comment`,
        updateComment: ({ questionId, answerId, commentId }: SpecifyAnswerComment) =>
            `/question/${questionId}/answer/${answerId}/comment/${commentId}`,
        addCommentRe: ({ questionId, answerId, commentId }: SpecifyAnswerComment) =>
            `/question/${questionId}/answer/${answerId}/comment/${commentId}`,
        deleteComment: ({ questionId, answerId, commentId }: SpecifyAnswerComment) =>
            `/question/${questionId}/answer/${answerId}/comment/${commentId}`,
    },
    CHAT: {
        create: () => `/chat`,
        enroll: ({ chatRoomId }: GetReqEnrollChatRoom) => `/chat/${chatRoomId}`,
        list: () => `/chat`,
        exit: ({ chatRoomId }: DeleteReqExitChatRoom) => `/chat/${chatRoomId}`,
    },
};
