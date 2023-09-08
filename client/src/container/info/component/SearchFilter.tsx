import { useEffect, useState } from "react";

import Typography from "@component/Typography";
import SearchInput from "@component/board/SearchInput";

import { infoCategory } from "@component/mockData";
import { CATEGORY_NAME } from "@type/info/common";

interface ISearchInput {
    category: CATEGORY_NAME | "";
    setCategory: (v: CATEGORY_NAME | "") => void;
    searchValue: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClickSearchHandler?: () => void;
}

type ICategoryItem = {
    label: CATEGORY_NAME;
    selected: boolean;
};

function SearchFilter({ category, setCategory, searchValue, onChange, onClickSearchHandler }: ISearchInput) {
    const [categoryItems, setCategoryItems] = useState<Array<ICategoryItem>>([]);

    useEffect(() => {
        const list = infoCategory.map((v) => {
            return { label: v, selected: false };
        });
        setCategoryItems(list);
    }, []);

    return (
        <div className="flex items-center justify-between p-8">
            <ol className="flex h-full items-end">
                <li>
                    <button onClick={() => setCategory("")} className="w-max text-center">
                        <Typography
                            text="전체"
                            type="Highlight"
                            styles="font-bold mr-12"
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
                                styles="font-bold mr-12"
                                color={category === v.label ? "text-warn" : "text-primary"}
                            />
                        </button>
                    </li>
                ))}
            </ol>
            <div className="mr-8 w-200">
                <SearchInput
                    value={searchValue}
                    onChange={onChange}
                    placeholder="자유게시판 검색"
                    onClickSearchHandler={onClickSearchHandler}
                />
            </div>
        </div>
    );
}

export default SearchFilter;
