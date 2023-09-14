import { useNavigate } from "react-router-dom";

import Typography from "@component/Typography";
import Tag from "@component/project-study/Tag";
import UserProfile from "@component/user/UserProfile";

import { CommonResStudies } from "@type/study/study.res.dto";

const StudyList = ({ study }: { study: CommonResStudies }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/studies/${study.boardId}`)}
            className="m-10 flex h-300 w-260 cursor-pointer flex-col justify-between rounded-lg border-2 border-solid border-study p-20 shadow-lg transition-transform hover:scale-105 hover:bg-gray-100"
        >
            <div>
                <div className="flex w-48 items-center justify-center rounded bg-deadline ">
                    <Typography type="SmallLabel" text="모집중" styles="text-white" />
                </div>
                <h1 className="my-20 cursor-pointer text-24 font-bold">{study.title}</h1>
                <div className="my-20 flex min-h-26">
                    {Array.isArray(study.stack) &&
                        study.stack.map((v) => {
                            return <Tag key={`${study.boardId}-tag-${v}`} type="STUDY" text={v} />;
                        })}
                </div>
            </div>
            <hr />
            <div className="flex cursor-pointer items-center">
                <UserProfile profilePicture={study.memberProfile.profilePicture} size="sm" />
                <Typography type="Label" text={study.memberProfile.nickname} styles="mx-20" />
            </div>
        </div>
    );
};

export default StudyList;
