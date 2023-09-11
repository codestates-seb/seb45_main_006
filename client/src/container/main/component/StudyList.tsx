import Typography from "@component/Typography";
import Tag from "@component/project-study/Tag";
import { CommonResStudies } from "@type/study/study.res.dto";

const StudyList = ({ study }: { study: CommonResStudies }) => {
    return (
        <div className="m-10 flex h-300 w-1/4 flex-col justify-between rounded-lg border-2 border-solid border-study p-20 shadow-lg">
            <div>
                <div className="flex w-48 items-center justify-center rounded bg-deadline ">
                    <Typography type="SmallLabel" text="모집중" styles="text-white" />
                </div>
                <h1 className="my-20 cursor-pointer text-24 font-bold">{study.title}</h1>
                <div className="my-20 flex">
                    <Tag type="STUDY" text="Java"></Tag>
                    <Tag type="STUDY" text="JavaScript"></Tag>
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

export default StudyList;
