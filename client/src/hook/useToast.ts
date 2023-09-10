import { useRecoilValue, useSetRecoilState } from "recoil";
import { toastState, addToastItem, removeToastItem } from "@feature/Global";
import { getRandomID } from "@util/random-helper";

import { IToast } from "@type/common";

export const useToast = () => {
    const toasts = useRecoilValue(toastState);
    const id = getRandomID();
    const addToastItemFn = useSetRecoilState(addToastItem);
    const removeToastItemFn = useSetRecoilState(removeToastItem);

    const fireToast = (toast: IToast) => {
        addToastItemFn([
            {
                id: id,
                content: toast.content || "",
                isConfirm: false,
                isWarning: toast.isWarning || false,
                callback: toast.callback,
            },
        ]);

        setTimeout(() => {
            removeToastItemFn([
                {
                    id: id,
                    content: toast.content || "",
                    isConfirm: false,
                    isWarning: toast.isWarning || false,
                    callback: toast.callback,
                },
            ]);
        }, 2500);
    };

    const createToast = (toast: IToast) => {
        addToastItemFn([
            {
                id: id,
                content: toast.content || "",
                isConfirm: toast.isConfirm || false,
                isWarning: toast.isWarning || false,
                callback: toast.callback,
            },
        ]);
    };

    const removeToast = (toast: IToast) => {
        removeToastItemFn([
            {
                id: toast.id,
                content: toast.content || "",
                isConfirm: toast.isConfirm || false,
                isWarning: toast.isWarning || false,
                callback: toast.callback,
            },
        ]);
    };

    const reqLoginToUserToast = () => {
        addToastItemFn([
            {
                id: id,
                content: "로그인이 필요한 서비스입니다. 로그인 화면으로 이동하시겠습니까?",
                isConfirm: true,
                isWarning: false,
                callback: () => (location.href = "/login"),
            },
        ]);
    };

    return { toasts, createToast, removeToast, fireToast, reqLoginToUserToast };
};
