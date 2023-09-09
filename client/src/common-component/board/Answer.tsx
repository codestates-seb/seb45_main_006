import { useState } from "react";

import { useGetMemberDetail } from "@api/member/hook";
import { usePostAnswer, usePatchAnswer, useDeleteAnswer, usePostAnswerComment } from "@api/answer/hook";

import { useToast } from "@hook/useToast";
import { useCheckUser } from "@hook/useCheckUser";
import { useCheckEmptyInput } from "@hook/useCheckEmptyInput";

import dayjs from "dayjs";

import MarkdownEditor from "@component/MarkdownEditor";
import Button from "@component/Button";
import Typography from "@component/Typography";
import { OneCommentAnswer } from "@component/board/AnswerComment";

import { AnswerDefaultType } from "@type/answer/answer.res.dto";

import { BiPencil, BiReply } from "react-icons/bi";
import { RiReplyLine, RiDeleteBin5Line } from "react-icons/ri";

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

export const EditAnswer = ({
    questionId,
    content,
    setContent,
}: {
    questionId: number;
    content: string;
    setContent: (v: string) => void;
}) => {
    const { mutate: postAnswer } = usePostAnswer();

    const { fireToast } = useToast();
    const { alertWhenEmptyFn } = useCheckEmptyInput();

    const onSubmitHanlder = () => {
        const inputs = [{ name: "답변", content }];
        const emptyNames = alertWhenEmptyFn(inputs);

        if (emptyNames.length === 0) {
            postAnswer(
                { questionId, content },
                {
                    onSuccess: () => {
                        fireToast({
                            content: "답변이 등록되었습니다!",
                            isConfirm: false,
                        });
                        setContent("");
                        // TODO: 답변 리스트 조회
                    },
                    // TODO: 에러 분기
                    onError: (err) => {
                        console.log(err);
                        fireToast({
                            content: "답변 등록 중 에러가 발생하였습니다. 새로 고침하여 다시 시도해주세요🥹",
                            isConfirm: false,
                            isWarning: true,
                        });
                    },
                },
            );
        }
    };

    return (
        <div className="flex flex-col border-b-1 border-borderline py-12">
            <div className="mb-8 flex">
                <div className="mr-8 h-36 w-36 overflow-hidden rounded border-1 border-borderline">
                    <img src={dummyUser.profilePicture} alt="" />
                </div>
                <div className="flex-1">
                    <MarkdownEditor content={content} setContent={setContent} height={200} maxlength={1000} />
                </div>
            </div>
            <div className="flex justify-end">
                <Button type="PROJECT_POINT" onClickHandler={onSubmitHanlder}>
                    <Typography type="Highlight" text="답변 등록" color="text-white" />
                </Button>
            </div>
        </div>
    );
};

export const OneAnswer = ({ v, writerId, boardId }: { v: AnswerDefaultType; writerId: number; boardId: number }) => {
    const { data: user } = useGetMemberDetail({ memberId: v.memberId });
    const { isLoggedIn, isMine, isSameUser } = useCheckUser({ memberId: v.memberId, comparedMemberId: writerId });

    const [isEdit, setIsEdit] = useState(false);
    const [curAnswer, setCurAnswer] = useState(v.content);
    const [answerId, setAnswerId] = useState(0);
    const [nextComment, setNextComment] = useState("");

    const { fireToast, createToast } = useToast();
    const { alertWhenEmptyFn } = useCheckEmptyInput();
    const { mutate: patchAnswer } = usePatchAnswer();
    const { mutate: deleteAnswer } = useDeleteAnswer();
    const { mutate: postAnswerComment } = usePostAnswerComment();

    const onSubmitHanlder = () => {
        const inputs = [{ name: "댓글", content: curAnswer }];
        const emptyNames = alertWhenEmptyFn(inputs);

        if (emptyNames.length === 0) {
            patchAnswer(
                { questionId: boardId, answerId: v.answerId, content: curAnswer },
                {
                    onSuccess: () => {
                        fireToast({
                            content: "답변이 수정되었습니다!",
                            isConfirm: false,
                        });
                    },
                    // TODO: 에러 분기
                    onError: (err) => {
                        console.log(err);
                        fireToast({
                            content: "답변 수정 중 에러가 발생하였습니다. 새로 고침하여 다시 시도해주세요🥹",
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
            content: "해당 답변을 삭제하시겠습니까?",
            isConfirm: true,
            callback: () => {
                deleteAnswer(
                    { questionId: boardId, answerId: v.answerId },
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

    const onSubmitReHanlder = () => {
        const inputs = [{ name: "댓글", content: nextComment }];
        const emptyNames = alertWhenEmptyFn(inputs);

        if (emptyNames.length === 0) {
            postAnswerComment(
                { questionId: boardId, answerId, content: nextComment },
                {
                    onSuccess: () => {
                        fireToast({
                            content: "답변에 대한 댓글이 등록되었습니다!",
                            isConfirm: false,
                        });
                        setNextComment("");
                        // TODO: 질문 리스트 조회
                    },
                    // TODO: 에러 분기
                    onError: (err) => {
                        console.log(err);
                        fireToast({
                            content: "댓글 등록 중 에러가 발생하였습니다. 새로 고침하여 다시 시도해주세요🥹",
                            isConfirm: false,
                            isWarning: true,
                        });
                    },
                },
            );
        }
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
                        <button onClick={() => setAnswerId(v.answerId)}>
                            <RiReplyLine size={"1.2rem"} />
                        </button>
                    </div>
                )}
            </div>
            {isEdit ? (
                <div className="my-12">
                    <MarkdownEditor content={curAnswer} setContent={setCurAnswer} height={400} maxlength={1000} />
                </div>
            ) : (
                <div className="my-12">
                    {v.answerStatus === "ANSWER_POSTED" ? (
                        <Typography type="Body" text={curAnswer} />
                    ) : (
                        <Typography type="Body" text="삭제된 댓글입니다." color="text-gray-700" />
                    )}
                </div>
            )}
            {answerId > 0 && (
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

                        <button onClick={onSubmitReHanlder}>
                            <Typography
                                type="Description"
                                text="등록"
                                color="text-blue-400 hover:text-blue-700 cursor-pointer"
                            />
                        </button>
                    </div>
                    <div className="ml-32 flex-1">
                        <MarkdownEditor
                            content={nextComment}
                            setContent={setNextComment}
                            height={200}
                            maxlength={1000}
                        />
                    </div>
                </div>
            )}

            {Array.isArray(v.commentList) &&
                v.commentList.length > 0 &&
                v.commentList.map((v) => (
                    <div className="flex" key={`${v.commentId}-${v.memberId}`}>
                        <div className="flex rotate-180 items-end p-8">
                            <BiReply />
                        </div>
                        <div className="flex-1">
                            <OneCommentAnswer
                                v={v}
                                writerId={writerId}
                                questionId={boardId}
                                answerId={v.answerId || 0}
                            />
                        </div>
                    </div>
                ))}
        </>
    );
};

export const ShowAnswer = ({ answer, writerId }: { answer: AnswerDefaultType; writerId: number }) => {
    return (
        <div className="mb-8 flex flex-col border-b-1 border-borderline">
            <OneAnswer
                v={answer}
                writerId={writerId}
                boardId={answer.boardId}
                key={`${answer.answerId}-${answer.memberId}`}
            />
        </div>
    );
};
