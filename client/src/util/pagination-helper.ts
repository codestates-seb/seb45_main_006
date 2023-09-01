const range = (startNum: number, endNum: number) => {
    if (endNum < startNum) {
        return [];
    }

    return Array.from({ length: endNum - startNum + 1 }, (_, i) => startNum + i);
};

export const defaultPagination = range(1, 10);

export const getPaginationRange = (curPage: number, endPage: number): Array<number> => {
    const 십의_자리 = curPage % 10 === 0 ? Math.floor(curPage / 10) - 1 : Math.floor(curPage / 10);
    const startNum = 십의_자리 * 10 + 1;
    let endNum = (십의_자리 + 1) * 10;

    if (endPage < endNum) {
        endNum = endPage;
    }

    return range(startNum, endNum);
};
