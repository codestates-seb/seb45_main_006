import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useCheckUser } from "@hook/useCheckUser";
import { useDeleteStudy, useGetDetailStudy } from "@api/study/hook";
import { useToast } from "@hook/useToast";

import Button from "@component/Button";
import Typography from "@component/Typography";
import Report from "@component/project-study/Report";
import Bookmark from "@component/board/Bookmark";
import DetailSkeleton from "./component/DetailSkeleton";
import UserCard from "@component/board/UserCard";
import UserProfile from "@component/user/UserProfile";

const Details = () => {
    const navigate = useNavigate();

    const { studyBoardId } = useParams();

    const { data: study, isLoading, refetch } = useGetDetailStudy({ boardId: Number.parseInt(studyBoardId || "0") });

    const { fireToast, createToast, errorToast } = useToast();
    const { isMine } = useCheckUser({ memberId: study?.memberProfile.memberId || 0 });
    const { mutate: deleteStudy } = useDeleteStudy();

    const [isBookmarked, setIsBookmarked] = useState(!!study?.bookmarked);

    useEffect(() => {
        refetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onClickDeleteHandler = () => {
        createToast({
            content: "해당 게시글을 삭제하시겠습니까?",
            isConfirm: true,
            callback: () => {
                deleteStudy(
                    { boardId: study?.boardId || 0 },
                    {
                        onSuccess: () => {
                            fireToast({
                                content: "게시글이 삭제되었습니다!",
                                isConfirm: false,
                            });
                            navigate("/studies");
                        },
                        onError: (err) => {
                            console.log(err);
                            errorToast();
                        },
                    },
                );
            },
        });
    };

    if (isLoading) {
        return <DetailSkeleton />;
    }

    return (
        <div>
            <div className="m-20 flex gap-20">
                <section className="relative flex w-3/4 justify-between rounded-2xl border-2 border-solid border-borderline">
                    <div>
                        <div className="absolute left-16 top-10 flex w-48 items-center justify-center rounded bg-deadline font-gangwon ">
                            <Typography type="Recruit" text="모집중" styles="text-white" />
                        </div>
                        <h3 className="mx-20 mt-40">
                            <div className="mx-4 text-40 font-bold">{study?.title || ""}</div>
                        </h3>
                        <ul className="flex flex-col p-20">
                            <li className="my-10">
                                <Typography type="Label" styles="list-disc" text="• 상세내용" />
                                <div className="mx-4 my-6 font-gangwon text-lg">{study?.content || ""}</div>
                            </li>
                            <li className="my-10">
                                <Typography type="Label" styles="list-disc" text="• 요구 스택" />

                                <Typography
                                    type="Body"
                                    text={(study && Array.isArray(study?.stack) && study.stack.join(", ")) || ""}
                                    color="text-blue-800"
                                />
                            </li>

                            <li className="my-10">
                                <Typography type="Label" styles="list-disc" text="• 인원" />

                                <div className="mx-4 my-6 font-gangwon text-lg">{study?.recruitNum || 0}명</div>
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col items-center py-10">
                        {isMine && (
                            <>
                                <Button
                                    type="STUDY_POINT"
                                    styles="px-4 py-2 rounded-sm"
                                    onClickHandler={() => navigate(`/studies/${study?.boardId}/edit`, { state: study })}
                                >
                                    <Typography text="수정" type="Description" color="text-white" />
                                </Button>
                                <Button type="WARN" styles="px-4 py-2 rounded-sm" onClickHandler={onClickDeleteHandler}>
                                    <Typography text="삭제" type="Description" color="text-white" />
                                </Button>
                            </>
                        )}
                        <Bookmark
                            board="project"
                            boardId={study?.boardId || 0}
                            isBookmarked={isBookmarked}
                            setIsBookmarked={setIsBookmarked}
                        />
                        <Report />
                    </div>
                </section>
                <div className="flex w-1/4 flex-col items-center">
                    {study && (
                        <UserCard
                            key={`${study?.memberProfile.nickname}`}
                            user={study?.memberProfile}
                            setBlockedMemberId={() => navigate("/projects")}
                            refetchAllMembers={() => {}}
                        />
                    )}
                    <Button type="STUDY_POINT" styles="font-semibold m-20" isFullBtn={true}>
                        <Typography type="Body" text="참여하기" />
                    </Button>
                </div>
            </div>
            <div className="ml-20">
                <Typography type="Label" text="댓글 0개" />
            </div>
            <div className="mx-20 flex items-start justify-between">
                <UserProfile size="sm" mine={true} />
                <Button type="PROJECT_POINT" styles="font-semibold mx-20" isFullBtn={false}>
                    <Typography type="Body" text="댓글등록" />
                </Button>
            </div>
            <textarea className="m-20 h-100 w-full rounded-xl border-2 border-solid border-borderline" />
        </div>
    );
};

export default Details;
