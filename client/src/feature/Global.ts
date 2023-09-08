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

export const toastState = atom<IToast[]>({
    key: "toastState",
    default: [],
});

// 기능 1. toastItem 추가
export const addToastItem = selector({
    key: "addToastItem",
    get: ({ get }) => get(toastState),
    set: ({ set }, newToast: IToast[] | DefaultValue) => {
        set(toastState, (prevToast) => [...prevToast, ...(newToast as [])]);
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
