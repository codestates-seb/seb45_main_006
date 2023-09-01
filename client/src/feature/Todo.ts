import { PostResTodo } from "@type/todo/todo.res.dto";
import { atom } from "recoil";

export const addTodoResult = atom<PostResTodo>({
    key: "addTodoResult",
    default: { id: -1, todo: "", completed: false, userId: -1 },
});

export const isReadStatus = atom<boolean>({
    key: "isReadStatus",
    default: true,
});
