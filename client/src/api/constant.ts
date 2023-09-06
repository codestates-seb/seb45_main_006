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
} as const;
