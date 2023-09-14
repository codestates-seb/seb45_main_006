import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import Typography from "@component/Typography";
import Tag from "@component/project-study/Tag";
import { CommonResProjects } from "@type/project/project.res.dto";
import UserProfile from "@component/user/UserProfile";

const ProjectList = ({ project }: { project: CommonResProjects }) => {
    const navigate = useNavigate();

    const handleProjectItemClick = () => {
        navigate("/projects/:projectBoardId", { state: project.boardId });
    };

    return (
        <div
            onClick={handleProjectItemClick}
            className="m-10 flex h-300 w-260 flex-col justify-between rounded-lg border-2 border-solid border-project p-20 shadow-lg transition-transform hover:scale-105 hover:bg-gray-100"
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
                <UserProfile profilePicture={project.memberProfile.profilePicture} size="sm" />
                <div className="mx-20 text-20">yeeendy</div>
            </div>
        </div>
    );
};

export default ProjectList;
