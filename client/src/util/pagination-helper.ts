const range = (startNum: number, endNum: number) => {
    if (endNum < startNum) {
        return [];
    }

    return Array.from({ length: endNum - startNum + 1 }, (_, i) => startNum + i);
};

export const defaultPagination = range(1, 10);

export const getPaginationRange = (curPage: number, totalPages: number): Array<number> => {
    // const sizeNum = size || 10;
    // const 십의_자리 = curPage % sizeNum === 0 ? Math.floor(curPage / sizeNum) - 1 : Math.floor(curPage / sizeNum);
    // const startNum = 십의_자리 * sizeNum + 1;
    // let endNum = (십의_자리 + 1) * sizeNum;

    // if (endPage < endNum) {
    //     endNum = endPage;
    // }

    // return range(startNum, endNum);

    const 십의_자리 = Math.floor(curPage / 10);
    const startNum = 십의_자리 * 10 + 1;
    let endNum = (십의_자리 + 1) * 10;

    if (totalPages < endNum) {
        endNum = totalPages;
    }

    return range(startNum, endNum);
};
