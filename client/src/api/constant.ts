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
    PROJECT: {
        PATH: "/project",
        LIST: "/project/list",
    },
    STUDY: {
        PATH: "/study",
        LIST: "/study/list",
    },
} as const;
