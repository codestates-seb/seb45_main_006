import { useEffect, useState, RefObject } from "react";

/**
 * 엘리먼트의 전체 width와 height를 반환시키는 훅
 * @param ref 크기를 확인하고 싶은 앨리먼트의 ref
 * @returns {object<width: number, height: number>} ref로 받은 컴포넌트의 width와 heigth
 */
export const useElementWidthAndHeight = (ref: RefObject<HTMLElement>) => {
    // prettier-ignore
    const [width, setWidth] = useState<number>(0);
    // prettier-ignore
    const [height, setHeight] = useState<number>(0);

    useEffect(() => {
        const setElementClientWidthHeight = () => {
            if (ref.current) {
                const refStyle = window.getComputedStyle(ref.current);
                const width = refStyle.getPropertyValue("width");
                const height = refStyle.getPropertyValue("height");

                setWidth(Number.parseInt(width.split("px")[0]));
                setHeight(Number.parseInt(height.split("px")[0]));
            }
        };

        setElementClientWidthHeight();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ref.current]);

    const clientRects = { width, height };

    return clientRects;
};
