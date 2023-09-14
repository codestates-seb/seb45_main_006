import { atom, selector, DefaultValue } from "recoil";

import { IToast } from "@type/common";

export const isSignPageAtom = atom<boolean>({
    key: "isSignPageAtom",
    default: false,
});

export const isLoggedInAtom = atom<boolean>({
    key: "isLoggedInAtom",
    default: false,
});

export const authNicknameAtom = atom<string>({
    key: "authNicknameAtom",
    default: "",
});

export const authEmailAtom = atom<string>({
    key: "authEmailAtom",
    default: "",
});

export const authEmailForPwAtom = atom<string>({
    key: "authEmailForPwAtom",
    default: "",
});

export const authCodeAtom = atom<string>({
    key: "authCodeAtom",
    default: "",
});

export const authCodeForPwAtom = atom<string>({
    key: "authCodeForPwAtom",
    default: "",
});

export const rawPasswordAtom = atom<string>({
    key: "rawPasswordAtom",
    default: "",
});

export const randomIdAtom = atom<string>({
    key: "randomIdAtom",
    default: "",
});

export const isLoginFailedAtom = atom<boolean>({
    key: "isLoginFailedAtom",
    default: false,
});

export const defaultPostionAtom = atom<Array<string>>({
    key: "defaultPostionAtom",
    default: [],
});

export const defaultStackAtom = atom<Array<string>>({
    key: "defaultStackAtom",
    default: [],
});

export const toastState = atom<IToast[]>({
    key: "toastState",
    default: [],
});

// 기능 1. toastItem 추가
export const addToastItem = selector({
    key: "addToastItem",
    get: ({ get }) => get(toastState),
    set: ({ set }, newToast: IToast[] | DefaultValue) => {
        set(toastState, (prevToast) => {
            const toastIds = prevToast.map((v) => v.id);
            if (Array.isArray(newToast) && newToast[0] && newToast[0].id && toastIds.includes(newToast[0].id)) {
                return [...prevToast];
            }
            return [...prevToast, ...(newToast as [])];
        });
    },
});
// 기능 2. id에 해당하는 toastItem 삭제
export const removeToastItem = selector({
    key: "removeToastItem",
    get: ({ get }) => get(toastState),
    set: ({ set }, deletedToast: IToast[] | DefaultValue) => {
        const deleteId = Array.isArray(deletedToast) ? deletedToast[0]?.id : undefined;
        set(toastState, (prevToast) => prevToast.filter((v: IToast) => v.id && v.id !== deleteId));
    },
});
