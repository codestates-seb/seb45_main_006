import Typography from "@component/Typography";
import Tag from "@component/project-study/Tag";
import { useState } from "react";
import { CommonResProjects } from "@type/project/project.res.dto";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import Bookmark from "@component/board/Bookmark";

const BoardList = ({ project }: { project: CommonResProjects }) => {
    const navigate = useNavigate();
    const [isBookmarked, setIsBookmarked] = useState(!!project.bookmarked);

    return (
        <div
            // 상세페이지로 넘어가는
            onClick={() => navigate(`/projects/${project.boardId}`)}
            className="my-10 flex w-full cursor-pointer justify-between rounded-lg border-2 border-solid border-borderline p-20 shadow-lg transition-transform hover:scale-y-105 hover:bg-gray-100"
        >
            <div>
                {project.projectStatus === "PROJECT_POSTED" ? (
                    <div className="flex h-24 w-54 items-center justify-center rounded bg-deadline ">
                        <Typography type="SmallLabel" text="모집중" styles="text-white" />
                    </div>
                ) : (
                    <div className="flex h-24 w-64 items-center justify-center rounded bg-gray-600">
                        <Typography type="SmallLabel" text="모집완료" styles="text-white" />
                    </div>
                )}
                <h1 className="my-4 text-24 font-bold">{project.title}</h1>
                <div className="flex min-h-28">
                    {Array.isArray(project.stack) &&
                        project.stack.map((v) => {
                            return <Tag key={`${project.boardId}-tag-${v}`} type="PROJECT" text={v} />;
                        })}
                </div>
                <div className="mt-4 text-14 text-gray-600">
                    {`${dayjs(project.createdAt).format("YYYY-")}${dayjs(project.startDate).format("MM-DD")}`}
                    <span> ~ </span>
                    {`${dayjs(project.createdAt).format("YYYY-")}${dayjs(project.deadline).format("MM-DD")}`}
                </div>
            </div>
            <Bookmark
                board="project"
                boardId={project.boardId}
                isBookmarked={isBookmarked}
                setIsBookmarked={setIsBookmarked}
            />
        </div>
    );
};

export default BoardList;
