import Button from "@component/Button";
import Typography from "@component/Typography";
import { useState } from "react";
import Report from "@component/project-study/Report";
import Bookmark from "@component/board/Bookmark";

const Details = () => {
    const [isBookmarked, setIsBookmarked] = useState(false); // State to track bookmark status

    return (
        <div>
            <div className="m-20 flex gap-20">
                <section className="relative flex w-3/4 justify-between rounded-2xl border-2 border-solid border-borderline">
                    <div>
                        <div className="absolute left-16 top-10 flex w-48 items-center justify-center rounded bg-deadline ">
                            <Typography type="SmallLabel" text="모집중" styles="text-white" />
                        </div>
                        <h3 className="mx-20 mt-40">
                            <Typography type="Heading" text="여기가 바로 스터디 제목입니다~!" />
                        </h3>
                        <ul className="flex flex-col p-20">
                            <li className="my-10">
                                <Typography type="Label" styles="list-disc" text="• 상세내용" />
                                <div className="mx-4 my-6">
                                    카메라 개발 서비스, 카메라 개발 서비스, 카메라 개발 서비스 카메라 개발 서비스,
                                </div>
                            </li>
                            <li className="my-10">
                                <Typography type="Label" styles="list-disc" text="• 요구 스택" />

                                <div className="mx-4 my-6">java, javascript</div>
                            </li>
                            <li className="my-10">
                                <Typography type="Label" styles="list-disc" text="• 기간" />
                                <div className="mx-4 my-6">2023-08-24 ~ 2023-09-22</div>
                            </li>
                            <li className="my-10">
                                <Typography type="Label" styles="list-disc" text="• 인원" />

                                <div className="mx-4 my-6">6명</div>
                            </li>
                        </ul>
                    </div>
                    <div>
                        {/* TODO: study 전달받으면 보여주기 */}
                        <Bookmark
                            board="study"
                            boardId={1}
                            isBookmarked={isBookmarked}
                            setIsBookmarked={setIsBookmarked}
                        />
                        <Report />
                    </div>
                </section>
                <div className="flex w-1/4 flex-col items-center">
                    <div className="h-200 w-full border-2 border-solid border-borderline">유저리스트</div>
                    <Button type="STUDY_POINT" styles="font-semibold m-20" isFullBtn={true}>
                        <Typography type="Body" text="참여하기" />
                    </Button>
                </div>
            </div>
            <div className="ml-20">
                <Typography type="Label" text="댓글 0개" />
            </div>
            <div className="mx-20 flex items-start">
                <div className="mt-20 h-40 w-40 rounded-3xl bg-deadline">유저</div>
                <textarea className="m-20 h-100 w-11/12 rounded-xl border-2 border-solid border-borderline" />
            </div>
            <Button type="STUDY_POINT" styles="font-semibold mx-20" isFullBtn={false}>
                <Typography type="Body" text="댓글등록" />
            </Button>
        </div>
    );
};

export default Details;
