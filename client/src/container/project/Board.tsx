import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "@component/Button";
import Typography from "@component/Typography";
import BoardList from "@container/project/component/BoardList";
import Toggle from "@component/project-study/Toggle";
import CommonSearchFilters from "@component/board/SearchFilters";
import SearchInput from "@component/board/SearchInput";

import { useRecoilValue } from "recoil";
import { isLoggedInAtom } from "@feature/Global";
import { useGetAllProjects } from "@api/project/hook";
import { useToast } from "@hook/useToast";

const Board = () => {
    const navigate = useNavigate();
    const { reqLoginToUserToast } = useToast();

    const isLogginedIn = useRecoilValue(isLoggedInAtom);

    // 검색어 필터
    const [searchValue, setSearchValue] = useState<string>("");
    // 스택, 정렬 방식 필터
    const [selectedStacks, setSelectedStacks] = useState<Array<string>>([]);
    const [selectedOrder, setSelectedOrder] = useState<Array<string>>([]);
    const { projectsList } = useGetAllProjects();

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

    return (
        <div>
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
                    <div className="mr-8">프로젝트 총 갯수 | </div>
                    <CommonSearchFilters
                        needStack={true}
                        needOrder={true}
                        selectedStacks={selectedStacks}
                        setSelectedStacks={setSelectedStacks}
                        selectedOrder={selectedOrder}
                        setSelectedOrder={setSelectedOrder}
                    />
                </div>
                <Toggle />
            </div>
            <>
                {Array.isArray(projectsList) &&
                    projectsList.map((v) => <BoardList project={v} key={`project-${v.boardId}`} />)}
            </>
        </div>
    );
};

export default Board;
