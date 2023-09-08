import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useGetAllInfo } from "@api/info/hook";

import Button from "@component/Button";
import Typography from "@component/Typography";
import SearchFilter from "./component/SearchFilter";
import InfoItem from "./component/InfoItem";

import { CATEGORY_NAME } from "@type/info/common";
import { CATEGORY_TO_ENUM } from "@api/info/constant";

function Board() {
    const navigate = useNavigate();
    // 검색 버튼 또는 엔터를 눌렀을 때 조회하기 위한 검색 파라미터
    const [search, setSearch] = useState<string>("");
    // 검색 인풋 value 저장하기 위한 변수
    const [searchValue, setSearchValue] = useState<string>("");
    const [category, setCategory] = useState<CATEGORY_NAME | "">("");

    const { data: infos } = useGetAllInfo({
        category: category === "" ? undefined : CATEGORY_TO_ENUM[category],
        search: search,
    });

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.currentTarget.value);
    };

    const onClickSearchHandler = () => {
        if (searchValue !== "") {
            setSearch(searchValue);
        }
    };

    return (
        <>
            <div className="fixed z-10 flex w-full max-w-screen-xl border-b-1 border-borderline bg-white">
                <div className="flex flex-1 flex-col">
                    <SearchFilter
                        searchValue={searchValue}
                        onChange={onChange}
                        category={category}
                        setCategory={setCategory}
                        onClickSearchHandler={onClickSearchHandler}
                    />
                </div>
                <div className="hidden w-300 justify-end p-10 lg:flex">
                    <Button type="INFO_POINT" onClickHandler={() => navigate("/infos/add")}>
                        <Typography type="Highlight" text="자유게시글 등록" />
                    </Button>
                </div>
            </div>
            <div className="mt-58 flex">
                <div className="flex flex-1 flex-col border-r-1 border-borderline">
                    <div className="p-12">
                        {Array.isArray(infos) && infos.map((v) => <InfoItem info={v} key={v.boardId} />)}
                    </div>
                </div>
                <div className="hidden h-full w-300 flex-col p-8 lg:flex">
                    <Typography type="Label" text="🔥 HOT 게시글" />
                </div>
            </div>
        </>
    );
}

export default Board;
