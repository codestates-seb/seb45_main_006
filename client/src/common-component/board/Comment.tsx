import { useState } from "react";

import { usePatchComment, useDeleteComment, usePostCommentRe } from "@api/comment/hook";

import { useToast } from "@hook/useToast";
import { useCheckUser } from "@hook/useCheckUser";
import { useCheckValidValue } from "@hook/useCheckValidValue";

import dayjs from "dayjs";

import Textarea, { ITextarea } from "@component/Textarea";
import Button from "@component/Button";
import Typography from "@component/Typography";

import { CommentDefaultTypeWithRe } from "@type/comment/comment.res.dto";

import { BiPencil, BiReply } from "react-icons/bi";
import { RiReplyLine, RiDeleteBin5Line } from "react-icons/ri";
import UserProfile from "@component/user/UserProfile";

interface IComment extends ITextarea {
    onSubmitHanlder: () => void;
}

export const EditComment = ({ value = "", onChange, onSubmitHanlder }: IComment) => {
    return (
        <div className="flex flex-col border-b-1 border-borderline py-12">
            <div className="flex flex-col">
                <div className="flex justify-between">
                    <UserProfile size="sm" mine={true} />
                    <Button type="PROJECT_POINT" onClickHandler={onSubmitHanlder}>
                        <Typography type="Highlight" text="댓글 등록" color="text-white" />
                    </Button>
                </div>
                <div className="mt-8 flex-1">
                    <Textarea
                        name="comment"
                        maxlength={200}
                        placeholder="댓글을 입력해주세요."
                        value={value}
                        onChange={onChange}
                        borderStyle="border-1 border-borderline shadow-md"
                    />
                </div>
            </div>
        </div>
    );
};

export const OneComment = ({
    v,
    writerId,
    boardId,
    refetchComment,
}: {
    v: CommentDefaultTypeWithRe;
    writerId: number;
    boardId: number;
    refetchComment: () => void;
}) => {
    const { isLoggedIn, isMine, isSameUser } = useCheckUser({ memberId: v.memberId, comparedMemberId: writerId });

    const [isEdit, setIsEdit] = useState(false);
    const [curCommment, setCurComment] = useState(v.content);
    const [parentId, setParentId] = useState(0);
    const [nextComment, setNextComment] = useState("");

    const { fireToast, createToast, errorToast } = useToast();
    const { alertWhenEmptyFn } = useCheckValidValue();
    const { mutate: patchComment } = usePatchComment();
    const { mutate: deleteComment } = useDeleteComment();
    const { mutate: postCommentRe } = usePostCommentRe();

    const onChangeCurComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCurComment(e.currentTarget.value);
    };

    const onChangeNextComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNextComment(e.currentTarget.value);
    };

    const onSubmitHanlder = () => {
        const inputs = [{ name: "댓글", content: curCommment }];
        const emptyNames = alertWhenEmptyFn(inputs);

        if (emptyNames.length === 0) {
            patchComment(
                { board: "information", boardId, commentId: v.commentId, content: curCommment },
                {
                    onSuccess: () => {
                        fireToast({
                            content: "댓글이 수정되었습니다!",
                            isConfirm: false,
                        });
                        refetchComment();
                    },
                    // TODO: 에러 분기
                    onError: (err) => {
                        console.log(err);
                        errorToast();
                    },
                    onSettled: () => setIsEdit(false),
                },
            );
        }
    };

    const onDeleteHanlder = () => {
        createToast({
            content: "해당 댓글을 삭제하시겠습니까?",
            isConfirm: true,
            callback: () => {
                deleteComment(
                    { board: "information", boardId, commentId: v.commentId },
                    {
                        onSuccess: () => {
                            fireToast({
                                content: "댓글이 삭제되었습니다!",
                                isConfirm: false,
                            });
                            refetchComment();
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

    const onSubmitReHanlder = () => {
        const inputs = [{ name: "댓글", content: nextComment }];
        const emptyNames = alertWhenEmptyFn(inputs);

        if (emptyNames.length === 0) {
            postCommentRe(
                { board: "information", boardId, commentId: parentId, content: nextComment },
                {
                    onSuccess: () => {
                        fireToast({
                            content: "댓글이 등록되었습니다!",
                            isConfirm: false,
                        });
                        setNextComment("");
                        refetchComment();
                    },
                    // TODO: 에러 분기
                    onError: (err) => {
                        console.log(err);
                        errorToast();
                    },
                },
            );
        }
    };

    return (
        <>
            <div className="relative flex items-center justify-between">
                <div className="flex items-center">
                    <UserProfile profilePicture={v.profilePicture} size="sm" />
                    <Typography type="Highlight" text={v.nickname} />
                    {isSameUser && (
                        <div className="ml-12 rounded-sm border-1 border-blue-200 px-4 py-2">
                            <Typography type="SmallLabel" text="작성자" color="text-blue-500" />
                        </div>
                    )}
                </div>
                {isEdit ? (
                    <button onClick={onSubmitHanlder}>
                        <Typography
                            type="Description"
                            text="수정 완료"
                            color="text-blue-400 hover:text-blue-700 cursor-pointer"
                        />
                    </button>
                ) : (
                    <Typography
                        type="Description"
                        text={dayjs(v.modifiedAt).format("YYYY-MM-DD")}
                        color="text-gray-600"
                    />
                )}
                {isLoggedIn && !isEdit && (
                    <div className={`absolute right-0 top-32 flex w-70 ${isMine ? "justify-between" : "justify-end"}`}>
                        {isMine && (
                            <>
                                <button onClick={() => setIsEdit(true)}>
                                    <BiPencil size={"1.2rem"} />
                                </button>
                                <button onClick={onDeleteHanlder}>
                                    <RiDeleteBin5Line size={"1.2rem"} />
                                </button>
                            </>
                        )}
                        <button onClick={() => setParentId(v.commentId)}>
                            <RiReplyLine size={"1.2rem"} />
                        </button>
                    </div>
                )}
            </div>
            {isEdit ? (
                <div className="my-12">
                    <Textarea
                        name="curComment"
                        maxlength={200}
                        value={curCommment}
                        onChange={onChangeCurComment}
                        borderStyle="border-1 border-borderline shadow-md"
                    />
                </div>
            ) : (
                <div className="my-12">
                    {v.commentStatus === "COMMENT_POSTED" ? (
                        <Typography type="Body" text={curCommment} />
                    ) : (
                        <Typography type="Body" text="삭제된 댓글입니다." color="text-gray-700" />
                    )}
                </div>
            )}
            {/* <button
                className="my-8 w-fit border-1 border-borderline px-8 py-4"
                onClick={() => {
                    if (parentId) setParentId(0);
                    else setParentId(v.commentId);
                }}
            >
                <Typography text={`답글 ${v.commentList?.length || 0}개`} type="Description" />
            </button> */}
            {parentId > 0 && (
                <div className="my-12 flex-col">
                    <div className="mb-8 flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="flex rotate-180 items-end p-8">
                                <BiReply />
                            </div>
                            <UserProfile mine={true} size="sm" />
                        </div>

                        <button onClick={onSubmitReHanlder}>
                            <Typography
                                type="Description"
                                text="등록"
                                color="text-blue-400 hover:text-blue-700 cursor-pointer"
                            />
                        </button>
                    </div>
                    <div className="ml-32 flex-1">
                        <Textarea
                            name="nextComment"
                            maxlength={200}
                            value={nextComment}
                            onChange={onChangeNextComment}
                            borderStyle="border-1 border-borderline shadow-md"
                        />
                    </div>
                </div>
            )}

            {Array.isArray(v.commentList) &&
                v.commentList.length > 0 &&
                v.commentList.map((v) => (
                    <div className="flex" key={`${v.boardId}-${v.memberId}`}>
                        <div className="flex rotate-180 items-end p-8">
                            <BiReply />
                        </div>
                        <div className="flex-1">
                            <OneComment v={v} writerId={writerId} boardId={boardId} refetchComment={refetchComment} />
                        </div>
                    </div>
                ))}
        </>
    );
};

export const ShowComment = ({
    comment,
    writerId,
    refetchComment,
}: {
    comment: CommentDefaultTypeWithRe;
    writerId: number;
    refetchComment: () => void;
}) => {
    return (
        <div className="mb-8 flex flex-col border-b-1 border-borderline">
            <OneComment
                v={comment}
                writerId={writerId}
                boardId={comment.boardId}
                key={`${comment.boardId}-${comment.memberId}`}
                refetchComment={refetchComment}
            />
        </div>
    );
};
