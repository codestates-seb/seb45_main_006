import { useEffect, useState } from "react";
import { sortStr, filterDuplicated } from "@util/arr-helper";

type IUseSuggestionArr = {
    text: string;
    selectedTags: Array<string>;
    defaultSuggestions: Array<string>;
};

export const useSuggestionArr = ({ text, selectedTags, defaultSuggestions }: IUseSuggestionArr) => {
    const [suggestions, setSuggestions] = useState<Array<string>>(defaultSuggestions);

    useEffect(() => {
        const arr = filterDuplicated(defaultSuggestions, selectedTags);
        if (text !== "") {
            const regex = new RegExp(`^${text}`, "i");
            setSuggestions(arr.filter((v) => regex.test(v)).sort((a, b) => sortStr(a, b)));
        } else {
            setSuggestions(arr);
        }
    }, [defaultSuggestions, selectedTags, text]);

    return { suggestions };
};
