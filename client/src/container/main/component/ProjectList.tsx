import Typography from "@component/Typography";
import Tag from "@component/project-study/Tag";
import { CommonResProjects } from "@type/project/project.res.dto";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const ProjectList = ({ project }: { project: CommonResProjects }) => {
    const navigate = useNavigate();

    const handleProjectItemClick = () => {
        navigate("/projects/:projectBoardId", { state: project.boardId });
    };

    return (
        <div
            onClick={handleProjectItemClick}
            className="m-10 flex h-300 w-1/4 flex-col justify-between rounded-lg border-2 border-solid border-project p-20 shadow-lg transition-transform hover:scale-105 hover:bg-gray-100"
        >
            <div>
                <div className="flex w-48 items-center justify-center rounded bg-deadline ">
                    <Typography type="SmallLabel" text="모집중" styles="text-white" />
                </div>
                <h1 className="my-20 cursor-pointer text-24 font-bold">{project.title}</h1>
                <div className="my-20 flex">
                    <Tag type="PROJECT" text="Java"></Tag>
                    <Tag type="PROJECT" text="JavaScript"></Tag>
                </div>
                <div className="my-20 text-14 text-gray-600">
                    {`${dayjs(project.createdAt).format("YYYY-")}${dayjs(project.startDate).format("MM-DD")}`}
                    <span> ~ </span>
                    {`${dayjs(project.createdAt).format("YYYY-")}${dayjs(project.deadline).format("MM-DD")}`}
                </div>
            </div>
            <hr />
            <div className="flex cursor-pointer items-center">
                <div className="h-40 w-40 rounded-3xl bg-deadline">유저</div>
                <div className="mx-20 text-20">yeeendy</div>
            </div>
        </div>
    );
};

export default ProjectList;
