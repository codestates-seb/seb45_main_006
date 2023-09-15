import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Typography from "@component/Typography";
import Tag from "@component/project-study/Tag";
import Bookmark from "@component/board/Bookmark";

import { CommonResStudies } from "@type/study/study.res.dto";

const BoardList = ({ study }: { study: CommonResStudies }) => {
    const navigate = useNavigate();
    const [isBookmarked, setIsBookmarked] = useState(!!study.bookmarked);

    return (
        <div
            onClick={() => navigate(`/studies/${study.boardId}`)}
            className="my-10 flex w-full cursor-pointer justify-between rounded-lg border-2 border-solid border-borderline p-20 shadow-lg transition-transform hover:scale-y-105 hover:bg-gray-100"
        >
            <div>
                <div className="flex w-48 items-center justify-center rounded bg-deadline">
                    <Typography type="SmallLabel" text="모집중" styles="text-white" />
                </div>
                <h1 className="my-4 cursor-pointer text-24 font-bold">{study.title}</h1>
                <div className="flex min-h-28">
                    {Array.isArray(study.stack) &&
                        study.stack.map((v) => {
                            return <Tag key={`${study.boardId}-tag-${v}`} type="STUDY" text={v} />;
                        })}
                </div>
            </div>
            <Bookmark
                board="study"
                boardId={study.boardId}
                isBookmarked={isBookmarked}
                setIsBookmarked={setIsBookmarked}
            />
        </div>
    );
};

export default BoardList;
