import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "@component/Button";
import Typography from "@component/Typography";
import BoardList from "@container/study/component/BoardList";
import Toggle from "@component/project-study/Toggle";
import CommonSearchFilters from "@component/board/SearchFilters";
import SearchInput from "@component/board/SearchInput";
import Pagination from "@component/Pagination";
import SkeletonUi from "@component/project-study/SkeletonUi";

import { useRecoilValue } from "recoil";
import { isLoggedInAtom } from "@feature/Global";
import { useGetAllStudies } from "@api/study/hook";
import { useToast } from "@hook/useToast";

const Board = () => {
    const navigate = useNavigate();
    const { reqLoginToUserToast } = useToast();

    const isLogginedIn = useRecoilValue(isLoggedInAtom);

    // 페이지 필터
    const [curPage, setCurPage] = useState<number>(1);
    // 검색어 필터
    const [searchValue, setSearchValue] = useState<string>("");
    // 검색 버튼 또는 엔터를 눌렀을 때 조회하기 위한 검색 파라미터
    const [search, setSearch] = useState<string>("");
    // 스택, 정렬 방식 필터
    const [selectedStacks, setSelectedStacks] = useState<Array<string>>([]);
    const [status, setStatus] = useState<boolean>(true);
    const {
        data: studies,
        isLoading,
        refetch,
    } = useGetAllStudies({
        page: curPage,
        size: 8,
        stack: selectedStacks.join(","),
        title: search,
        status: status ? "STUDY_POSTED" : "STUDY_CLOSED",
    });

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.currentTarget.value);
    };

    const onClickSearchHandler = () => {
        setSearch(searchValue);
    };

    const onClickRegisterHandler = () => {
        if (isLogginedIn) {
            navigate("/studies/register");
        } else {
            reqLoginToUserToast();
        }
    };

    useEffect(() => {
        refetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <div className="my-20 flex justify-end">
                <div className="mr-8 w-200">
                    <SearchInput
                        value={searchValue}
                        onChange={onChange}
                        placeholder="스터디명 검색"
                        onClickSearchHandler={onClickSearchHandler}
                    />
                </div>

                <Button
                    type="STUDY"
                    styles="bg-study font-semibold"
                    isFullBtn={false}
                    onClickHandler={onClickRegisterHandler}
                >
                    <Typography type="Body" text="스터디 등록하기" />
                </Button>
            </div>
            <div className="flex items-start justify-between">
                <div className="flex items-start">
                    <div className="flex">
                        <Typography type="Body" text="프로젝트 총 갯수: " styles="mr-8" />
                        <Typography type="Body" text={`${studies?.pageInfo?.totalElements || 0} 개  |`} styles="mr-8" />
                    </div>
                    <CommonSearchFilters
                        needStack={true}
                        // needOrder={true}
                        selectedStacks={selectedStacks}
                        setSelectedStacks={setSelectedStacks}
                        // selectedOrder={selectedOrder}
                        // setSelectedOrder={setSelectedOrder}
                    />
                </div>
                <Toggle status={status} setStatus={setStatus} label="스터디" />
            </div>
            <>
                {isLoading && (
                    <>
                        {Array.from({ length: 8 }).map((_, i) => (
                            <SkeletonUi key={`skeleton-${i}`} />
                        ))}
                    </>
                )}
                {!isLoading && studies && studies.data && Array.isArray(studies.data) && (
                    <>
                        {studies.data.length > 0 ? (
                            <>
                                {studies.data.map((v) => (
                                    <BoardList study={v} key={`study-${v.boardId}`} refetch={refetch} />
                                ))}
                            </>
                        ) : (
                            <div className="flex h-300 w-full items-center justify-center">
                                <Typography
                                    type="Highlight"
                                    text="진행 중인 스터디가 없어요🥹 새로운 스터디를 만들어볼까요?"
                                />
                            </div>
                        )}
                    </>
                )}
            </>
            <Pagination curPage={curPage} setCurPage={setCurPage} totalPages={studies?.pageInfo.totalPages || 1} />
        </div>
    );
};

export default Board;
