import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Button from "@component/Button";
import Typography from "@component/Typography";
import Report from "@component/project-study/Report";

import { useCheckUser } from "@hook/useCheckUser";
import { useGetDetailProject } from "@api/project/hook";
import { useDeleteProject } from "@api/project/hook";
import { useToast } from "@hook/useToast";
import Bookmark from "@component/board/Bookmark";
import UserCard from "@component/board/UserCard";
import DetailSkeleton from "./component/DetailSkeleton";
import UserProfile from "@component/user/UserProfile";

const Details = () => {
    const navigate = useNavigate();
    const { projectBoardId } = useParams();

    const boardId = projectBoardId;

    const {
        data: projectInputs,
        isLoading,
        refetch,
    } = useGetDetailProject({ boardId: Number.parseInt(boardId || "0") });

    const [isBookmarked, setIsBookmarked] = useState(!!projectInputs?.bookmarked);

    const { fireToast, createToast, errorToast } = useToast();
    const { isMine } = useCheckUser({ memberId: projectInputs?.memberProfile.memberId || 0 });
    const { mutate: deleteProject } = useDeleteProject();

    useEffect(() => {
        refetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onClickDeleteHandler = () => {
        createToast({
            content: "해당 게시글을 삭제하시겠습니까?",
            isConfirm: true,
            callback: () => {
                deleteProject(
                    { boardId: projectInputs?.boardId || 0 },
                    {
                        onSuccess: () => {
                            fireToast({
                                content: "게시글이 삭제되었습니다!",
                                isConfirm: false,
                            });
                            navigate("/projects");
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
                <section
                    // eslint-disable-next-line tailwindcss/no-custom-classname
                    className={`relative flex w-3/4 justify-between rounded-2xl border-2 border-solid border-borderline ${
                        projectInputs?.projectStatus === "PROJECT_POSTED" ? "" : "bg-gray-300"
                    }`}
                >
                    <div>
                        {projectInputs?.projectStatus === "PROJECT_POSTED" ? (
                            <div className="absolute left-16 top-10 flex h-28 w-56 items-center justify-center rounded bg-deadline ">
                                <Typography type="SmallLabel" text="모집중" styles="text-white" />
                            </div>
                        ) : (
                            <div className="absolute left-16 top-10 flex h-30 w-68 items-center justify-center rounded bg-gray-600">
                                <Typography type="SmallLabel" text="모집완료" styles="text-white" />
                            </div>
                        )}
                        <h3 className="mx-20 mt-40">
                            <div className="mx-4 text-40 font-bold">{projectInputs?.title || ""}</div>
                        </h3>
                        <ul className="flex flex-col p-20">
                            <li className="my-10">
                                <Typography type="Label" styles="list-disc" text="• 상세내용" />
                                <div className="mx-4 my-6">{projectInputs?.content || ""}</div>
                            </li>
                            <li className="my-10">
                                <Typography type="Label" styles="list-disc" text="• 요구 스택" />

                                <Typography
                                    type="Body"
                                    text={
                                        (projectInputs &&
                                            Array.isArray(projectInputs?.stack) &&
                                            projectInputs.stack.join(", ")) ||
                                        ""
                                    }
                                    color="text-blue-800"
                                />
                            </li>
                            <li className="my-10">
                                <Typography type="Label" styles="list-disc" text="• 기간" />
                                <div className="mx-4 my-6">
                                    {projectInputs?.startDate || ""} ~ {projectInputs?.deadline || ""}
                                </div>
                            </li>
                            <li className="my-10">
                                <Typography type="Label" styles="list-disc" text="• 인원" />

                                <div className="mx-4 my-6">{projectInputs?.recruitNum || 0}명</div>
                            </li>
                        </ul>
                    </div>

                    <div className="flex flex-col items-center py-10">
                        {isMine && (
                            <>
                                <Button
                                    type="PROJECT_POINT"
                                    styles="px-4 py-2 rounded-sm"
                                    onClickHandler={() =>
                                        navigate(`/projects/${projectInputs?.boardId}/edit`, { state: projectInputs })
                                    }
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
                            boardId={projectInputs?.boardId || 0}
                            isBookmarked={isBookmarked}
                            setIsBookmarked={setIsBookmarked}
                        />
                        <Report />
                    </div>
                </section>
                <div className="flex w-1/4 flex-col items-center">
                    {projectInputs && (
                        <UserCard
                            key={`${projectInputs?.memberProfile.nickname}`}
                            user={projectInputs?.memberProfile}
                            setBlockedMemberId={() => navigate("/projects")}
                            refetchAllMembers={() => {}}
                        />
                    )}
                    <Button type="PROJECT_POINT" styles="font-semibold mr-0" isFullBtn={true}>
                        <Typography type="Body" text="참여하기" />
                    </Button>
                </div>
            </div>
            <div className="mb-10 ml-20">
                <Typography type="Label" text="댓글 0개" />
            </div>
            <div className="mx-20 max-w-800">
                <div className="mb-12 flex items-start justify-between">
                    <UserProfile size="sm" mine={true} />
                    <Button type="PROJECT_POINT" styles="font-semibold" isFullBtn={false}>
                        <Typography type="Body" text="댓글등록" />
                    </Button>
                </div>
                <textarea className="h-100 w-full rounded-xl border-2 border-solid border-borderline" />
            </div>
        </div>
    );
};

export default Details;
