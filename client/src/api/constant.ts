import { SpecifyBoard, SpecifyComment } from "@type/comment/comment.req.dto";
import { SpecifyAnswer, SpecifyQuestion, SpecifyAnswerComment } from "@type/answer/answer.req.dto";

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
    },
    MEMBER: {
        PATH: "/members",
        LIST: "/members/list",
        CHANGE_PASSWORD: "/members/password",
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
        add: ({ board, boardId }: SpecifyBoard) => `/${board}/${boardId}/comment`,
        addRe: ({ board, boardId, commentId }: SpecifyComment) => `/${board}/${boardId}/comment/${commentId}`,
        update: ({ board, boardId, commentId }: SpecifyComment) => `/${board}/${boardId}/comment/${commentId}`,
        delete: ({ board, boardId, commentId }: SpecifyComment) => `/${board}/${boardId}/comment/${commentId}`,
    },
    ANSWER: {
        add: ({ questionId }: SpecifyQuestion) => `/question/${questionId}/answer`,
        update: ({ questionId, answerId }: SpecifyAnswer) => `/question/${questionId}/answer/${answerId}`,
        delete: ({ questionId, answerId }: SpecifyAnswer) => `/question/${questionId}/answer/${answerId}`,
        accept: ({ questionId, answerId }: SpecifyAnswer) => `/question/${questionId}/answer/${answerId}`,
        addComment: ({ questionId, answerId }: SpecifyAnswer) => `/question/${questionId}/answer/${answerId}`,
        updateComment: ({ questionId, answerId, commentId }: SpecifyAnswerComment) =>
            `/question/${questionId}/answer/${answerId}/${commentId}`,
        addCommentRe: ({ questionId, answerId, commentId }: SpecifyAnswerComment) =>
            `/question/${questionId}/answer/${answerId}/${commentId}`,
        deleteComment: ({ questionId, answerId, commentId }: SpecifyAnswerComment) =>
            `/question/${questionId}/answer/${answerId}/${commentId}`,
    },
};
