import Typography from "@component/Typography";
import Tag from "@component/project-study/Tag";
import bookmark_unfill from "@assets/bookmark_unfill.svg";
import bookmark_fill from "@assets/bookmark_fill.svg";
import { useState } from "react";
import { CommonResProjects } from "@type/project/project.res.dto";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const BoardList = ({ project }: { project: CommonResProjects }) => {
    const navigate = useNavigate();
    const [isBookmarked, setIsBookmarked] = useState(false);

    const toggleBookmark = () => {
        setIsBookmarked((prevState) => !prevState);
    };
    const handleProjectItemClick = () => {
        navigate("/projects/:projectBoardId", { state: project.boardId });
    };
    return (
        <div
            // 상세페이지로 넘어가는
            onClick={handleProjectItemClick}
            className="my-10 flex w-full cursor-pointer justify-between rounded-lg border-2 border-solid border-borderline p-20 shadow-lg transition-transform hover:scale-y-105 hover:bg-gray-100"
        >
            <div>
                <div className="flex w-48 items-center justify-center rounded bg-deadline ">
                    <Typography type="SmallLabel" text="모집중" styles="text-white" />
                </div>
                <h1 className="my-4 text-24 font-bold">{project.title}</h1>
                <div className="flex">
                    <Tag type="PROJECT" text="Java"></Tag>
                </div>
                <div className="mt-4 text-14 text-gray-600">
                    {`${dayjs(project.createdAt).format("YYYY-")}${dayjs(project.startDate).format("MM-DD")}`}
                    <span> ~ </span>
                    {`${dayjs(project.createdAt).format("YYYY-")}${dayjs(project.deadline).format("MM-DD")}`}
                </div>
            </div>
            <img
                src={isBookmarked ? bookmark_fill : bookmark_unfill}
                className="m-10 h-28 w-28 cursor-pointer"
                onClick={toggleBookmark}
            />
        </div>
    );
};

export default BoardList;
