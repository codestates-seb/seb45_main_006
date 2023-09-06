import Button from "@component/Button";
import Typography from "@component/Typography";
import { useNavigate } from "react-router-dom";
import BoardList from "@container/project/component/BoardList";
import Toggle from "@container/project/component/Toggle";
import search from "@assets/search.svg";

const Board = () => {
    const navigate = useNavigate();
    return (
        <div>
            <div className="my-20 flex justify-end">
                <div className="m-4 flex w-200 justify-between rounded-md border-2 border-solid border-borderline p-2 px-4">
                    <Typography type="SmallLabel" text="프로젝트명 검색" />
                    <img src={search} className="h-20 w-20" />
                </div>
                <Button
                    type="PROJECT"
                    styles="bg-project font-semibold"
                    isFullBtn={false}
                    onClickHandler={() => {
                        navigate("/projects/register");
                    }}
                >
                    <Typography type="Body" text="프로젝트 등록하기" />
                </Button>
            </div>
            <div className="flex justify-between">
                <div className="flex items-center">
                    <div>프로젝트 총 갯수 | </div>
                    <div className="m-2 rounded-md border-2 border-solid border-borderline px-4">스택 선택 ▼</div>
                    <div className="m-2 rounded-md border-2 border-solid border-borderline px-4">정렬방식 ▼</div>
                </div>
                <Toggle />
            </div>
            <BoardList />
            <BoardList />
        </div>
    );
};

export default Board;
