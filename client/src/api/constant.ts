export const COMMON_API_PATH = {
    USER: {
        PATH: "/users",
    },
    TODO: {
        PATH: "/todos",
        ADD: "/todos/add",
    },
    MEMBER: {
        PATH: "/members",
        NICKNAME: "/members/checkNickname",
    },
} as const;
