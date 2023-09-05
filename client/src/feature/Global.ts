import { atom } from "recoil";

export const isSignPageAtom = atom<boolean>({
    key: "isSignPageAtom",
    default: false,
});
