import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useRecoilValue } from "recoil";
import { isLoggedInAtom } from "@feature/Global";

import { useGetAllInfo } from "@api/info/hook";
import { useDeleteInfo } from "@api/info/hook";
import { useToast } from "@hook/useToast";

import Typography from "@component/Typography";
import InfoItem from "./component/InfoItem";
import Pagination from "@component/Pagination";
import SkeletonUi from "@component/board/SkeletonUi";
import BoardHeader from "@component/board/BoardHeader";
import HotBoard from "@component/board/HotBoard";

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

    const {
        data: infos,
        isLoading,
        refetch: refetchInfo,
    } = useGetAllInfo({
        category: category === "" ? undefined : CATEGORY_TO_ENUM[category],
        search: search,
        page: curPage,
        size: 10,
    });

    useEffect(() => {
        refetchInfo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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

    const { fireToast, createToast, errorToast } = useToast();
    const { mutate: deleteInfo } = useDeleteInfo();

    const onClickDeleteHandler = ({ boardId }: { boardId: number }) => {
        createToast({
            content: "해당 게시글을 삭제하시겠습니까?",
            isConfirm: true,
            callback: () => {
                deleteInfo(
                    { infoId: boardId },
                    {
                        onSuccess: () => {
                            fireToast({
                                content: "게시글이 삭제되었습니다!",
                                isConfirm: false,
                            });
                            refetchInfo();
                        },
                        onError: (err) => {
                            console.log(err);
                            errorToast();
                        },
                    },
                );
            },
        });
    };

    return (
        <>
            <div className="fixed z-10 flex w-full max-w-screen-xl flex-col border-b-1 border-borderline bg-white">
                <BoardHeader
                    label="자유"
                    searchValue={searchValue}
                    onChange={onChange}
                    onClickSearchHandler={onClickSearchHandler}
                    onClickRegisterHandler={onClickRegisterHandler}
                    category={category}
                    setCategory={setCategory}
                />
            </div>
            <div className="mt-80 flex">
                <div className="flex flex-1 flex-col border-r-1 border-borderline">
                    <div className="p-12">
                        {isLoading && (
                            <>
                                <SkeletonUi />
                                <SkeletonUi />
                                <SkeletonUi />
                            </>
                        )}
                        {!isLoading &&
                            infos?.data &&
                            Array.isArray(infos?.data) &&
                            infos.data.length > 0 &&
                            infos.data.map((v) => (
                                <InfoItem info={v} key={v.boardId} onClickDeleteHandler={onClickDeleteHandler} />
                            ))}
                        {!isLoading && infos?.data && Array.isArray(infos?.data) && infos.data.length === 0 && (
                            <div className="flex h-500 flex-col items-center justify-center">
                                <Typography text="게시된 글이 없습니다🥹" type="SmallLabel" styles="font-bold" />
                                <Typography text="첫 게시글을 작성해주세요!" type="SmallLabel" styles="font-bold" />
                            </div>
                        )}
                    </div>
                    {/* 임시 */}
                    <Pagination curPage={curPage} setCurPage={setCurPage} totalItems={totalItems || 0} size={10} />
                </div>
                <div className="hidden h-full w-300 flex-col p-8 lg:flex">
                    <Typography type="Label" text="🔥 HOT 게시글" />
                    <HotBoard board="information" />
                </div>
            </div>
        </>
    );
}

export default Board;
