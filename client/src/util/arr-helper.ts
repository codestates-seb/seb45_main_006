export const sortStr = (a: string, b: string) => {
    const A = a.toUpperCase();
    const B = b.toUpperCase();

    if (A < B) return -1;
    if (A > B) return 1;

    return 0;
};

export const filterDuplicated = (arr1: Array<string>, arr2: Array<string>) => {
    return arr1.filter((v) => !arr2.includes(v));
};
