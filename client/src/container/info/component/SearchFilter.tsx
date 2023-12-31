import { useEffect, useState } from "react";

import Typography from "@component/Typography";

import { CATEGORY_NAME } from "@type/info/common";

interface ISearchInput {
    category: CATEGORY_NAME | "";
    setCategory: (v: CATEGORY_NAME | "") => void;
}

type ICategoryItem = {
    label: CATEGORY_NAME;
    selected: boolean;
};

function SearchFilter({ category, setCategory }: ISearchInput) {
    const [categoryItems, setCategoryItems] = useState<Array<ICategoryItem>>([]);
    const infoCategory: Array<CATEGORY_NAME> = ["기술 정보", "구직자 정보", "뉴스 레터", "부트캠프"];

    useEffect(() => {
        const list = infoCategory.map((v) => {
            return { label: v, selected: false };
        });
        setCategoryItems(list);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <ol className="flex h-full items-end">
            <li>
                <button onClick={() => setCategory("")} className="w-max text-center">
                    <Typography
                        text="전체"
                        type="Highlight"
                        styles="font-bold mr-12 hover:text-warn/60"
                        color={category === "" ? "text-warn" : "text-primary"}
                    />
                </button>
            </li>
            {categoryItems.map((v) => (
                <li key={v.label}>
                    <button onClick={() => setCategory(v.label)} className="w-max text-center">
                        <Typography
                            text={v.label}
                            type="Highlight"
                            styles="font-bold mr-12 hover:text-warn/60"
                            color={category === v.label ? "text-warn" : "text-primary"}
                        />
                    </button>
                </li>
            ))}
        </ol>
    );
}

export default SearchFilter;
