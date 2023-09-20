export const filterHelper = (filters: string) => {
    const filtersArr = filters.split(",");
    const changedFilter = (eachFilter: string) =>
        eachFilter
            .split("")
            .map((t) => {
                if (t === "+") return "%2B";
                if (t === "#") return "%23";
                return t;
            })
            .join("");
    return filtersArr.map((v) => changedFilter(v)).join(",");
};
