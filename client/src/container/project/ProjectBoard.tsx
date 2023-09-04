import Button from "@component/common/Button";
import { useNavigate } from "react-router-dom";

const ProjectBoard = () => {
    const navigate = useNavigate();
    return (
        <div>
            <Button
                type="PROJECT"
                label="프로젝트 등록하기"
                styles="bg-project font-semibold m-20"
                isFullBtn={false}
                onClickHandler={() => {
                    navigate("/projects/register");
                }}
            />
        </div>
    );
};

export default ProjectBoard;
