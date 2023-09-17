import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Button from "@component/Button";
import Typography from "@component/Typography";
import Report from "@component/project-study/Report";

import { useCheckUser } from "@hook/useCheckUser";
import { useGetDetailProject } from "@api/project/hook";
import { useDeleteProject } from "@api/project/hook";
import { useToast } from "@hook/useToast";
import { useCheckChat } from "@hook/useCheckChat";

import Bookmark from "@component/board/Bookmark";
import UserCard from "@component/board/UserCard";
import DetailSkeleton from "./component/DetailSkeleton";

import { useGetComment, usePostComment } from "@api/comment/hook";
import { EditComment, ShowComment } from "@component/board/Comment";
import Pagination from "@component/Pagination";
import { useCheckValidValue } from "@hook/useCheckValidValue";

const Details = () => {
    const navigate = useNavigate();
    const { projectBoardId } = useParams();

    const boardId = projectBoardId;

    const {
        data: projectInputs,
        isLoading,
        refetch,
    } = useGetDetailProject({ boardId: Number.parseInt(boardId || "0") });

    useEffect(() => {
        refetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // 페이지 필터
    const [curPage, setCurPage] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [comment, setComment] = useState<string>("");

    const { data: commentList, refetch: refetchComment } = useGetComment({
        board: "project",
        boardId: Number.parseInt(boardId || "0"),
        page: curPage,
        size: 4,
    });

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(e.currentTarget.value);
    };

    const [isBookmarked, setIsBookmarked] = useState(!!projectInputs?.bookmarked);

    const { fireToast, createToast, errorToast } = useToast();
    const { isMine, isLoggedIn } = useCheckUser({ memberId: projectInputs?.memberProfile.memberId || 0 });
    const { mutate: deleteProject } = useDeleteProject();

    useEffect(() => {
        if (commentList && commentList?.pageInfo.totalElements) {
            setTotalItems(commentList?.pageInfo.totalElements);
        }
    }, [commentList]);

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
                        onError: (err) => errorToast(err),
                    },
                );
            },
        });
    };

    const { alertWhenEmptyFn } = useCheckValidValue();
    const { mutate: postComment } = usePostComment();

    const onSubmitHanlder = () => {
        const inputs = [{ name: "댓글", content: comment }];
        const emptyNames = alertWhenEmptyFn(inputs);

        if (emptyNames.length === 0) {
            postComment(
                { board: "project", boardId: Number.parseInt(boardId || "0"), content: comment },
                {
                    onSuccess: () => {
                        fireToast({
                            content: "댓글이 등록되었습니다!",
                            isConfirm: false,
                        });
                        setComment("");
                        refetchComment();
                    },
                    onError: (err) => errorToast(err),
                },
            );
        }
    };

    const { createOrEnrollChatRoom } = useCheckChat({ memberId: projectInputs?.memberProfile.memberId || 0 });

    const onClickChatBtn = () => {
        createOrEnrollChatRoom({ nickname: projectInputs?.memberProfile.nickname || "" });
    };

    if (isLoading) {
        return <DetailSkeleton />;
    }

    return (
        <div>
            <div className="m-20 flex gap-20">
                <section
                    className={`relative flex w-3/4 justify-between rounded-2xl border-2 border-solid border-borderline ${
                        projectInputs?.projectStatus === "PROJECT_POSTED" ? "" : "bg-gray-300"
                    }`}
                >
                    <div>
                        {projectInputs?.projectStatus === "PROJECT_POSTED" ? (
                            <div className="absolute left-16 top-10 flex h-28 w-56 items-center justify-center rounded bg-deadline ">
                                <Typography type="Recruit" text="모집중" styles="text-white font-gangwon" />
                            </div>
                        ) : (
                            <div className="absolute left-16 top-10 flex h-30 w-68 items-center justify-center rounded bg-gray-600">
                                <Typography type="Recruit" text="모집완료" styles="text-white" />
                            </div>
                        )}
                        <h3 className="mx-20 mt-40">
                            <div className="mx-4 text-40 font-bold">{projectInputs?.title || ""}</div>
                        </h3>
                        <ul className="flex flex-col p-20">
                            <li className="my-10">
                                <Typography type="Label" styles="list-disc" text="• 상세내용" />
                                <Typography type="Recruit" text={projectInputs?.content || ""} />
                            </li>
                            <li className="my-10">
                                <Typography type="Label" styles="list-disc" text="• 요구 스택" />

                                <Typography
                                    type="Recruit"
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
                                    <Typography
                                        type="Recruit"
                                        text={`${projectInputs?.startDate || ""} ~ ${projectInputs?.deadline || ""}`}
                                    />
                                </div>
                            </li>
                            <li className="my-10">
                                <Typography type="Label" styles="list-disc" text="• 인원" />

                                <Typography type="Recruit" text={`${projectInputs?.recruitNum || 0}명`} />
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
                    {!isMine && (
                        <Button
                            type="PROJECT_POINT"
                            styles="font-semibold mr-0"
                            isFullBtn={true}
                            onClickHandler={onClickChatBtn}
                        >
                            <Typography type="Body" text="참여하기" />
                        </Button>
                    )}
                </div>
            </div>

            <div className="p-8">
                <Typography type="Highlight" text={`댓글 ${commentList?.data?.length || 0}개`} />
                {isLoggedIn && <EditComment value={comment} onChange={onChange} onSubmitHanlder={onSubmitHanlder} />}
                <div className="my-16">
                    {commentList?.data &&
                        Array.isArray(commentList.data) &&
                        commentList.data.map((v) => (
                            <ShowComment
                                key={v.commentId}
                                comment={v}
                                writerId={projectInputs?.memberProfile.memberId || 0}
                                refetchComment={refetchComment}
                            />
                        ))}
                    <Pagination curPage={curPage} setCurPage={setCurPage} totalItems={totalItems || 0} size={4} />
                </div>
            </div>
        </div>
    );
};

export default Details;
