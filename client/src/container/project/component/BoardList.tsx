import Typography from "@component/Typography";
import Tag from "@component/project-study/Tag";
import { useState } from "react";
import { CommonResProjects } from "@type/project/project.res.dto";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import Bookmark from "@component/board/Bookmark";
import { useToast } from "@hook/useToast";
import { useRecoilValue } from "recoil";
import { isLoggedInAtom } from "@feature/Global";

const BoardList = ({ project }: { project: CommonResProjects }) => {
    const navigate = useNavigate();
    const isLogginedIn = useRecoilValue(isLoggedInAtom);
    const { reqLoginToUserToast } = useToast();
    const [isBookmarked, setIsBookmarked] = useState(!!project.bookmarked);

    return (
        <div
            // 상세페이지로 넘어가는
            onClick={() => {
                if (!isLogginedIn) {
                    reqLoginToUserToast();
                    return;
                }
                navigate(`/projects/${project.boardId}`);
            }}
            className="my-10 flex w-full cursor-pointer justify-between rounded-lg border-2 border-solid border-borderline p-20 shadow-lg transition-transform hover:scale-y-105 hover:bg-gray-100"
        >
            <div>
                {project.projectStatus === "PROJECT_POSTED" ? (
                    <div className="flex h-24 w-54 items-center justify-center rounded bg-deadline">
                        <Typography type="Recruit" text="모집중" styles="text-white" />
                    </div>
                ) : (
                    <div className="flex h-24 w-64 items-center justify-center rounded bg-gray-600">
                        <Typography type="Recruit" text="모집완료" styles="text-white" />
                    </div>
                )}
                <h1 className="my-4 text-24 font-bold">{project.title}</h1>
                <div className="flex min-h-28">
                    {Array.isArray(project.stack) &&
                        project.stack.slice(0, 5).map((v) => {
                            return <Tag key={`${project.boardId}-tag-${v}`} type="PROJECT" text={v} />;
                        })}
                    {project.stack.length > 5 && <Typography text="and more ..." type="SmallLabel" />}
                </div>
                <div className="mt-4 flex text-16 text-gray-600">
                    <Typography
                        type="Recruit"
                        text={`${dayjs(project.createdAt).format("YYYY-")}${dayjs(project.startDate).format("MM-DD")}`}
                    />
                    <Typography type="Recruit" text="~" />
                    <Typography
                        type="Recruit"
                        text={`${dayjs(project.createdAt).format("YYYY-")}${dayjs(project.deadline).format("MM-DD")}`}
                    />
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
