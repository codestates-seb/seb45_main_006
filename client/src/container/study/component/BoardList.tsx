import Typography from "@component/Typography";
import Tag from "@component/project-study/Tag";
import { useState } from "react";
import { CommonResStudies } from "@type/study/study.res.dto";
import Bookmark from "@component/board/Bookmark";

const BoardList = ({ study }: { study: CommonResStudies }) => {
    const [isBookmarked, setIsBookmarked] = useState(false);

    return (
        <div className="my-10 flex w-full  justify-between rounded-lg border-2 border-solid border-borderline p-20 shadow-lg hover:bg-gray-100">
            <div>
                <div className="flex w-48 items-center justify-center rounded bg-deadline">
                    <Typography type="SmallLabel" text="모집중" styles="text-white" />
                </div>
                <h1 className="my-4 cursor-pointer text-24 font-bold">{study.title}</h1>
                <div className="flex">
                    <Tag type="STUDY" text="Java"></Tag>
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
