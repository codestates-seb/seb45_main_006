import Button from "@component/Button";
import Typography from "@component/Typography";
import { useNavigate } from "react-router-dom";

const Board = () => {
    const navigate = useNavigate();
    return (
        <div>
            <Button
                type="PROJECT"
                styles="bg-project font-semibold m-20"
                isFullBtn={false}
                onClickHandler={() => {
                    navigate("/projects/register");
                }}
            >
                <Typography type="Body" text="프로젝트 등록하기" />
            </Button>
        </div>
    );
};

export default Board;
