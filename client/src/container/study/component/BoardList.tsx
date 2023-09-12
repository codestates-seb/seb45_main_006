import Typography from "@component/Typography";
import Tag from "@component/project-study/Tag";
import bookmark_unfill from "@assets/bookmark_unfill.svg";
import bookmark_fill from "@assets/bookmark_fill.svg";
import { useState } from "react";
import { CommonResStudies } from "@type/study/study.res.dto";

const BoardList = ({ study }: { study: CommonResStudies }) => {
    const [isBookmarked, setIsBookmarked] = useState(false);

    const toggleBookmark = () => {
        setIsBookmarked((prevState) => !prevState);
    };
    return (
        <div className="my-10 flex w-full justify-between rounded-lg border-2 border-solid border-borderline p-20 shadow-lg hover:bg-gray-100">
            <div>
                <div className="flex w-48 items-center justify-center rounded bg-deadline">
                    <Typography type="SmallLabel" text="모집중" styles="text-white" />
                </div>
                <h1 className="my-4 cursor-pointer text-24 font-bold">{study.title}</h1>
                <div className="flex">
                    <Tag type="STUDY" text="Java"></Tag>
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
