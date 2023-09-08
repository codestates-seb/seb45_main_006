import { useState } from "react";

import { useGetMemberDetail } from "@api/member/hook";
import { usePatchComment, useDeleteComment } from "@api/comment/hook";

import { useToast } from "@hook/useToast";
import { useCheckUser } from "@hook/useCheckUser";
import { useCheckEmptyInput } from "@hook/useCheckEmptyInput";

import dayjs from "dayjs";

import Textarea, { ITextarea } from "@component/Textarea";
import Button from "@component/Button";
import Typography from "@component/Typography";

import { CommentDefaultTypeWithRe } from "@type/comment/comment.res.dto";

import { BiPencil, BiReply } from "react-icons/bi";
import { RiReplyLine, RiDeleteBin5Line } from "react-icons/ri";

interface IComment extends ITextarea {
    onSubmitHanlder: () => void;
}

const dummyUser = {
    memberId: 5,
    profilePicture:
        "https://dszw1qtcnsa5e.cloudfront.net/community/20220519/453159ca-e328-429c-9b3f-460fc592d963/%EA%B7%80%EC%97%AC%EC%9A%B4%EB%AA%B0%EB%9D%BC%EB%AA%A8%EC%BD%94%EC%BD%94.png",
    nickname: "모코코",
    githubId: "mococo~",
    introduction: "update",
    listEnroll: true,
    position: ["Front", "Back"],
    stack: ["Javascript", "Typescript", "React.js", "Node.js", "Next.js", "BootStrap", "tailwindcss"],
};

export const EditComment = ({ value = "", onChange, onSubmitHanlder }: IComment) => {
    return (
        <div className="flex flex-col border-b-1 border-borderline py-12">
            <div className="flex">
                <div className="mr-8 h-36 w-36 overflow-hidden rounded border-1 border-borderline">
                    <img src={dummyUser.profilePicture} alt="" />
                </div>
                <div className="flex-1">
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
            <div className="flex justify-end">
                <Button type="PROJECT_POINT" onClickHandler={onSubmitHanlder}>
                    <Typography type="Highlight" text="댓글 등록" color="text-white" />
                </Button>
            </div>
        </div>
    );
};

export const OneComment = ({ v, writerId }: { v: CommentDefaultTypeWithRe; writerId: number }) => {
    const { data: user } = useGetMemberDetail({ memberId: v.memberId });
    const { isLoggedIn, isMine, isSameUser } = useCheckUser({ memberId: v.memberId, comparedMemberId: writerId });

    const [isEdit, setIsEdit] = useState(false);
    const [curCommment, setCurComment] = useState(v.content);
    const [parentId, setParentId] = useState(0);
    const [nextComment, setNextComment] = useState("");

    const { fireToast, createToast } = useToast();
    const { alertWhenEmptyFn } = useCheckEmptyInput();
    const { mutate: patchComment } = usePatchComment();
    const { mutate: deleteComment } = useDeleteComment();

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
                { board: "information", boardId: v.boardId, commentId: v.commentId, content: curCommment },
                {
                    onSuccess: () => {
                        fireToast({
                            content: "댓글이 수정되었습니다!",
                            isConfirm: false,
                        });
                    },
                    // TODO: 에러 분기
                    onError: (err) => {
                        console.log(err);
                        fireToast({
                            content: "댓글 수정 중 에러가 발생하였습니다. 새로 고침하여 다시 시도해주세요🥹",
                            isConfirm: false,
                            isWarning: true,
                        });
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
                    { board: "information", boardId: v.boardId, commentId: v.commentId },
                    {
                        onSuccess: () => {
                            fireToast({
                                content: "댓글이 삭제되었습니다!",
                                isConfirm: false,
                            });
                            // TODO: 댓글 리스트 조회
                        },
                        onError: () => {
                            fireToast({
                                content: "댓글 삭제에 실패하였습니다. 새로고침 후 다시 삭제 시도부탁드려요!🥹",
                                isConfirm: false,
                                isWarning: true,
                            });
                        },
                    },
                );
            },
        });
    };

    return (
        <>
            <div className="relative flex items-center justify-between">
                <div className="flex items-center">
                    <div className="mr-8 h-36 w-36 overflow-hidden rounded border-1 border-borderline">
                        {user && <img src={user.profilePicture} alt="" />}
                    </div>
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
            {parentId > 0 && (
                <div className="my-12 flex-col">
                    <div className="mb-8 flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="flex rotate-180 items-end p-8">
                                <BiReply />
                            </div>
                            <div className="mr-8 h-36 w-36 overflow-hidden rounded border-1 border-borderline">
                                <img src={dummyUser.profilePicture} alt="" />
                            </div>
                            <Typography type="Highlight" text={dummyUser.nickname} />
                        </div>

                        <button onClick={() => {}}>
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
                    <div className="flex">
                        <div className="flex rotate-180 items-end p-8">
                            <BiReply />
                        </div>
                        <div className="flex-1">
                            <OneComment v={v} writerId={writerId} />
                        </div>
                    </div>
                ))}
        </>
    );
};

export const ShowComment = ({ comment, writerId }: { comment: CommentDefaultTypeWithRe; writerId: number }) => {
    return (
        <div className="mb-8 flex flex-col border-b-1 border-borderline">
            <OneComment v={comment} writerId={writerId} />
        </div>
    );
};
