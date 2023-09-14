import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "@component/Button";
import Typography from "@component/Typography";
import BoardList from "@container/project/component/BoardList";
import Toggle from "@component/project-study/Toggle";
import CommonSearchFilters from "@component/board/SearchFilters";
import SearchInput from "@component/board/SearchInput";
import Pagination from "@component/Pagination";
import SkeletonUi from "@component/project-study/SkeletonUi";

import { useRecoilValue } from "recoil";
import { isLoggedInAtom } from "@feature/Global";
import { useGetAllProjects } from "@api/project/hook";
import { useToast } from "@hook/useToast";

const Board = () => {
    const navigate = useNavigate();
    const { reqLoginToUserToast } = useToast();

    const isLogginedIn = useRecoilValue(isLoggedInAtom);

    // 페이지 필터
    const [curPage, setCurPage] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0);
    // 검색어 필터
    const [searchValue, setSearchValue] = useState<string>("");
    // 스택, 정렬 방식 필터
    const [selectedStacks, setSelectedStacks] = useState<Array<string>>([]);
    // const [selectedOrder, setSelectedOrder] = useState<Array<string>>([]);
    const {
        data: projects,
        isLoading,
        refetch,
    } = useGetAllProjects({
        page: curPage,
        size: 8,
        stack: selectedStacks.join(","),
    });

    useEffect(() => {
        refetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.currentTarget.value);
    };

    const onClickRegisterHandler = () => {
        if (isLogginedIn) {
            navigate("/projects/register");
        } else {
            reqLoginToUserToast();
        }
    };

    useEffect(() => {
        if (projects && projects?.pageInfo && projects.pageInfo.totalElements) {
            setTotalItems(projects?.pageInfo.totalElements);
        }
    }, [projects]);

    return (
        <div className="p-10">
            <div className="my-20 flex justify-end">
                <div className="mr-8 w-200">
                    <SearchInput value={searchValue} onChange={onChange} placeholder="프로젝트명 검색" />
                </div>

                <Button
                    type="PROJECT"
                    styles="bg-project font-semibold"
                    isFullBtn={false}
                    onClickHandler={onClickRegisterHandler}
                >
                    <Typography type="Body" text="프로젝트 등록하기" />
                </Button>
            </div>
            <div className="flex items-start justify-between">
                <div className="flex items-start">
                    <div className="flex">
                        <Typography type="Body" text="프로젝트 총 갯수: " styles="mr-8" />
                        <Typography
                            type="Body"
                            text={`${projects?.pageInfo?.totalElements || 0} 개  |`}
                            styles="mr-8"
                        />
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
                <Toggle />
            </div>
            <>
                {isLoading && (
                    <>
                        {Array.from({ length: 8 }).map((_, i) => (
                            <SkeletonUi key={`skeleton-${i}`} />
                        ))}
                    </>
                )}
                {!isLoading && projects && projects.data && Array.isArray(projects.data) && (
                    <>
                        {projects.data.length > 0 ? (
                            projects.data.map((v) => <BoardList project={v} key={`project-${v.boardId}`} />)
                        ) : (
                            <div className="flex h-300 w-full items-center justify-center">
                                <Typography
                                    type="Highlight"
                                    text="진행 중인 프로젝트가 없어요🥹 새로운 프로젝트를 만들어볼까요?"
                                />
                            </div>
                        )}
                    </>
                )}
            </>
            <Pagination curPage={curPage} setCurPage={setCurPage} totalItems={totalItems || 0} size={8} />
        </div>
    );
};

export default Board;
