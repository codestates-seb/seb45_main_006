import Button from "@component/Button";
import Typography from "@component/Typography";
import Report from "@component/project-study/Report";

import bookmark_unfill from "@assets/bookmark_unfill.svg";

const DetailSkeleton = () => {
    return (
        <div>
            <div className="m-20 flex gap-20">
                <section className="relative flex w-3/4 justify-between rounded-2xl border-2 border-solid border-borderline">
                    <div>
                        <div className="absolute left-16 top-10 flex w-48 items-center justify-center rounded bg-deadline font-gangwon ">
                            <Typography type="Recruit" text="모집중" styles="text-white" />
                        </div>
                        <h3 className="mx-20 mt-40 min-h-60">
                            <div className="h-50 w-300 rounded-md bg-gray-200 dark:bg-gray-700"></div>
                        </h3>
                        <ul className="flex flex-col p-20">
                            <li className="my-10">
                                <Typography type="Label" styles="list-disc" text="• 상세내용" />
                                <div className="h-100 w-400 rounded-md bg-gray-200 dark:bg-gray-700"></div>
                            </li>
                            <li className="my-10">
                                <Typography type="Label" styles="list-disc" text="• 요구 스택" />

                                <div className="h-50 w-full rounded-md bg-gray-200 dark:bg-gray-700"></div>
                            </li>
                            <li className="my-10">
                                <Typography type="Label" styles="list-disc" text="• 기간" />
                                <div className="mx-4 my-6">
                                    <div className="h-20 w-full rounded-md bg-gray-200 dark:bg-gray-700"></div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <img src={bookmark_unfill} className="m-10 h-28 w-28" />
                        <Report />
                    </div>
                </section>
                <div className="flex w-1/4 flex-col items-center">
                    <div
                        role="status"
                        className="m-10 h-291 w-240 animate-pulse space-y-4 divide-y divide-gray-200 border border-gray-200 p-12 shadow dark:divide-gray-700 dark:border-gray-700 md:p-6"
                    >
                        <div className="flex w-full flex-col items-center justify-between">
                            <div className="mx-8 h-130 w-full rounded-md bg-gray-200 dark:bg-gray-400"></div>
                            <div className="flex justify-between">
                                <div className="my-10 mr-8 h-27 w-110 rounded-md bg-gray-200 pb-10 dark:bg-gray-700"></div>
                                <div className="my-10 h-27 w-100 rounded-md bg-gray-200 pb-10 dark:bg-gray-700"></div>
                            </div>
                            <div className="h-2 w-full rounded-md bg-gray-200 dark:bg-gray-700"></div>
                            <div className="mt-10 h-80 w-full rounded-md bg-gray-200 dark:bg-gray-700"></div>
                        </div>
                        <span className="sr-only">Loading...</span>
                    </div>

                    <Button type="PROJECT_POINT" styles="font-semibold mr-0" isFullBtn={true}>
                        <Typography type="Body" text="참여하기" />
                    </Button>
                </div>
            </div>
            <div className="ml-20">
                <Typography type="Label" text="댓글 0개" />
            </div>
            <div className="mx-20 flex items-start">
                <div className="mr-16 h-44 w-44 rounded bg-gray-200 dark:bg-gray-700"></div>
                <textarea className="m-20 h-100 w-11/12 rounded-xl border-2 border-solid border-borderline" />
            </div>
            <Button type="PROJECT_POINT" styles="font-semibold mx-20" isFullBtn={false}>
                <Typography type="Body" text="댓글등록" />
            </Button>
        </div>
    );
};

export default DetailSkeleton;
