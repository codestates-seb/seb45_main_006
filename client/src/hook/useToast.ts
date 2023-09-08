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

    return { toasts, createToast, removeToast, fireToast };
};
