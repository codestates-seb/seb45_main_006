import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useRecoilValue } from "recoil";
import { isLoggedInAtom } from "@feature/Global";

import { useGetAllInfo } from "@api/info/hook";
import { useToast } from "@hook/useToast";

import Button from "@component/Button";
import Typography from "@component/Typography";
import SearchFilter from "./component/SearchFilter";
import InfoItem from "./component/InfoItem";
import Pagination from "@component/Pagination";

import { CATEGORY_NAME } from "@type/info/common";
import { CATEGORY_TO_ENUM } from "@api/info/constant";

function Board() {
    const navigate = useNavigate();
    const { reqLoginToUserToast } = useToast();

    const isLogginedIn = useRecoilValue(isLoggedInAtom);

    // 페이지 필터
    const [curPage, setCurPage] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0);
    // 검색 버튼 또는 엔터를 눌렀을 때 조회하기 위한 검색 파라미터
    const [search, setSearch] = useState<string>("");
    // 검색 인풋 value 저장하기 위한 변수
    const [searchValue, setSearchValue] = useState<string>("");
    const [category, setCategory] = useState<CATEGORY_NAME | "">("");

    const { data: infos } = useGetAllInfo({
        category: category === "" ? undefined : CATEGORY_TO_ENUM[category],
        search: search,
        page: curPage,
        size: 10,
    });

    useEffect(() => {
        if (infos && infos?.pageInfo.totalElements) {
            setTotalItems(infos?.pageInfo.totalElements);
        }
    }, [infos]);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.currentTarget.value);
    };

    const onClickSearchHandler = () => {
        if (searchValue !== "") {
            setSearch(searchValue);
        }
    };

    const onClickRegisterHandler = () => {
        if (isLogginedIn) {
            navigate("/infos/add");
        } else {
            reqLoginToUserToast();
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
                    <Button type="INFO_POINT" onClickHandler={onClickRegisterHandler}>
                        <Typography type="Highlight" text="자유게시글 등록" />
                    </Button>
                </div>
            </div>
            <div className="mt-58 flex">
                <div className="flex flex-1 flex-col border-r-1 border-borderline">
                    <div className="p-12">
                        {infos?.data && Array.isArray(infos?.data) && infos.data.length > 0 ? (
                            infos.data.map((v) => <InfoItem info={v} key={v.boardId} />)
                        ) : (
                            <div className="flex h-500 flex-col items-center justify-center">
                                <Typography text="게시된 글이 없습니다🥹" type="SmallLabel" styles="font-bold" />
                                <Typography text="첫 게시글을 작성해주세요!" type="SmallLabel" styles="font-bold" />
                            </div>
                        )}
                    </div>
                </div>
                <div className="hidden h-full w-300 flex-col p-8 lg:flex">
                    <Typography type="Label" text="🔥 HOT 게시글" />
                </div>
            </div>
            {/* 임시 */}
            <Pagination curPage={curPage} setCurPage={setCurPage} totalItems={totalItems || 0} />
        </>
    );
}

export default Board;
