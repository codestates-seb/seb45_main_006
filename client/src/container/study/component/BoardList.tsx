import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Typography from "@component/Typography";
import Tag from "@component/project-study/Tag";
import Bookmark from "@component/board/Bookmark";
import { useToast } from "@hook/useToast";
import { useRecoilValue } from "recoil";
import { isLoggedInAtom } from "@feature/Global";

import { CommonResStudies } from "@type/study/study.res.dto";

const BoardList = ({ study, refetch }: { study: CommonResStudies; refetch: () => void }) => {
    const navigate = useNavigate();
    const [isBookmarked, setIsBookmarked] = useState(!!study.bookmarked);

    const isLogginedIn = useRecoilValue(isLoggedInAtom);
    const { reqLoginToUserToast } = useToast();

    return (
        <div
            onClick={() => {
                if (!isLogginedIn) {
                    reqLoginToUserToast();
                    return;
                }
                navigate(`/studies/${study.boardId}`);
            }}
            className="my-10 flex w-full cursor-pointer justify-between rounded-lg border-2 border-solid border-borderline p-20 shadow-lg transition-transform hover:scale-y-105 hover:bg-gray-100"
        >
            <div>
                {study.studyStatus === "STUDY_POSTED" ? (
                    <div className="flex h-24 w-54 items-center justify-center rounded bg-deadline">
                        <Typography type="Recruit" text="모집중" styles="text-white" />
                    </div>
                ) : (
                    <div className="flex h-24 w-64 items-center justify-center rounded bg-gray-600">
                        <Typography type="Recruit" text="모집완료" styles="text-white" />
                    </div>
                )}
                <h1 className="my-4 cursor-pointer text-24 font-bold">{study.title}</h1>
                <div className="flex min-h-28">
                    {Array.isArray(study.stacks) &&
                        study.stacks.slice(0, 5).map((v) => {
                            return <Tag key={`${study.boardId}-tag-${v}`} type="STUDY" text={v} />;
                        })}
                    {study.stacks.length > 5 && <Typography text="and more ..." type="SmallLabel" />}
                </div>
            </div>
            <Bookmark
                board="study"
                boardId={study.boardId}
                isBookmarked={isBookmarked}
                setIsBookmarked={setIsBookmarked}
                refetch={refetch}
            />
        </div>
    );
};

export default BoardList;
