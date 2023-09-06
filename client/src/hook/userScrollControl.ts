import { useCallback } from "react";

export const useScrollControll = () => {
    const lockScroll = useCallback(() => {
        document.body.style.overflow = "hidden";
    }, []);

    const openScroll = useCallback(() => {
        document.body.style.removeProperty("overflow");
    }, []);

    return { lockScroll, openScroll };
};
