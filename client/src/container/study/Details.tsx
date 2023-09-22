import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useCheckUser } from "@hook/useCheckUser";
import { useDeleteStudy, useGetDetailStudy } from "@api/study/hook";
import { useToast } from "@hook/useToast";

import Button from "@component/Button";
import Typography from "@component/Typography";
import Bookmark from "@component/board/Bookmark";
import UserCard from "@component/board/UserCard";
import DetailSkeleton from "./component/DetailSkeleton";

import { useGetComment } from "@api/comment/hook";
import { EditComment, ShowComment } from "@component/board/Comment";
import Pagination from "@component/Pagination";
import { usePostComment } from "@api/comment/hook";
import { useCheckValidValue } from "@hook/useCheckValidValue";

const Details = () => {
    const navigate = useNavigate();

    const { studyBoardId } = useParams();

    const {
        data: study,
        isLoading,
        refetch: refetchStudy,
    } = useGetDetailStudy({ boardId: Number.parseInt(studyBoardId || "0") });

    useEffect(() => {
        refetchStudy();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const { fireToast, createToast, errorToast } = useToast();
    const { isMine, isLoggedIn } = useCheckUser({ memberId: study?.memberProfile.memberId || 0 });
    const { mutate: deleteStudy } = useDeleteStudy();

    const [isBookmarked, setIsBookmarked] = useState(false);
    useEffect(() => {
        if (study && study.bookmarked) {
            setIsBookmarked(!!study?.bookmarked);
        }
    }, [study]);

    // 페이지 필터
    const [curPage, setCurPage] = useState<number>(1);
    const [comment, setComment] = useState<string>("");

    const { data: commentList, refetch: refetchComment } = useGetComment({
        board: "project",
        boardId: Number.parseInt(studyBoardId || "0"),
        page: curPage,
        size: 4,
    });

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(e.currentTarget.value);
    };

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
                { board: "project", boardId: Number.parseInt(studyBoardId || "0"), content: comment },
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

    if (isLoading) {
        return <DetailSkeleton />;
    }

    return (
        <div>
            <div className="m-20 flex gap-20">
                <section
                    className={`relative flex w-3/4 justify-between rounded-2xl border-2 border-solid border-borderline ${
                        study?.studyStatus === "STUDY_POSTED" ? "" : "bg-gray-300"
                    }`}
                >
                    <div>
                        {study?.studyStatus === "STUDY_POSTED" ? (
                            <div className="absolute left-16 top-10 flex h-28 w-56 items-center justify-center rounded bg-deadline ">
                                <Typography type="Recruit" text="모집중" styles="font-gangwon" />
                            </div>
                        ) : (
                            <div className="absolute left-16 top-10 flex h-30 w-68 items-center justify-center rounded bg-gray-600">
                                <Typography type="Recruit" text="모집완료" styles="text-white" />
                            </div>
                        )}
                        <h3 className="mx-20 mt-40">
                            <div className="mx-4 text-40 font-bold">{study?.title || ""}</div>
                        </h3>
                        <ul className="flex flex-col p-20">
                            <li className="my-10">
                                <Typography type="Label" styles="list-disc" text="• 상세내용" />
                                <Typography type="Recruit" text={study?.content || ""} />
                            </li>
                            <li className="my-10">
                                <Typography type="Label" styles="list-disc" text="• 요구 스택" />

                                <Typography
                                    type="Recruit"
                                    text={(study && Array.isArray(study?.stacks) && study.stacks.join(", ")) || ""}
                                    color="text-blue-800"
                                />
                            </li>

                            <li className="my-10">
                                <Typography type="Label" styles="list-disc" text="• 인원" />

                                <Typography type="Recruit" text={`${study?.recruitNum || 0}명`} />
                            </li>
                        </ul>
                    </div>
                    <div className="flex min-w-50 flex-col items-center py-10">
                        {isMine && (
                            <>
                                <Button
                                    type="STUDY_POINT"
                                    styles="px-4 py-2 rounded-sm"
                                    onClickHandler={() => navigate(`/studies/${study?.boardId}/edit`, { state: study })}
                                >
                                    <Typography text="수정" type="Description" />
                                </Button>
                                <Button type="WARN" styles="px-4 py-2 rounded-sm" onClickHandler={onClickDeleteHandler}>
                                    <Typography text="삭제" type="Description" />
                                </Button>
                            </>
                        )}
                        <Bookmark
                            board="project"
                            boardId={study?.boardId || 0}
                            isBookmarked={isBookmarked}
                            setIsBookmarked={setIsBookmarked}
                            refetch={refetchStudy}
                        />
                    </div>
                </section>
                <div className="flex w-1/4 flex-col items-center">
                    {study && <UserCard key={`${study?.memberProfile.nickname}`} user={study?.memberProfile} />}
                </div>
            </div>
            <div className="p-8">
                <Typography type="Highlight" text={`댓글 ${commentList?.pageInfo.totalElements || 0}개`} />
                {isLoggedIn && <EditComment value={comment} onChange={onChange} onSubmitHanlder={onSubmitHanlder} />}
                <div className="my-16">
                    {commentList?.data &&
                        Array.isArray(commentList.data) &&
                        commentList.data.map((v) => (
                            <ShowComment
                                key={v.commentId}
                                comment={v}
                                writerId={study?.memberProfile.memberId || 0}
                                refetchComment={refetchComment}
                            />
                        ))}
                    <Pagination
                        curPage={curPage}
                        setCurPage={setCurPage}
                        totalPages={commentList?.pageInfo.totalPages || 1}
                    />
                </div>
            </div>
        </div>
    );
};

export default Details;
