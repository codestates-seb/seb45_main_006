import Typography from "@component/Typography";
import Tag from "@container/project/component/Tag";

const ProjectList = () => {
    return (
        <div className="m-10 flex h-300 w-1/4 flex-col justify-between rounded-lg border-2 border-solid border-project p-20 shadow-lg">
            <div>
                <div className="flex w-48 items-center justify-center rounded bg-deadline ">
                    <Typography type="SmallLabel" text="모집중" styles="text-white" />
                </div>
                <h1 className="my-20 cursor-pointer text-24 font-bold">여기가 프로젝트 제목입니다~!</h1>
                <div className="my-20 flex">
                    <Tag type="PROJECT" text="Java"></Tag>
                    <Tag type="PROJECT" text="JavaScript"></Tag>
                </div>
                <div className="my-20 text-14 text-gray-600">2023-08-24 ~ 2023-09-22</div>
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
