import { useState } from "react";

import { useGetMemberDetail } from "@api/member/hook";
import {
    usePostAnswer,
    usePatchAnswer,
    useDeleteAnswer,
    usePostAnswerComment,
    useGetAnswerComment,
} from "@api/answer/hook";

import { useToast } from "@hook/useToast";
import { useCheckUser } from "@hook/useCheckUser";
import { useCheckValidValue } from "@hook/useCheckValidValue";

import dayjs from "dayjs";
import MDEditor from "@uiw/react-md-editor";
import "@component/MarkdownEditor.css";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

import MarkdownEditor from "@component/MarkdownEditor";
import Button from "@component/Button";
import Typography from "@component/Typography";
import { OneCommentAnswer } from "@component/board/AnswerComment";

import { AnswerDefaultType } from "@type/answer/answer.res.dto";

import { BiPencil, BiReply } from "react-icons/bi";
import { RiReplyLine, RiDeleteBin5Line } from "react-icons/ri";
import Temp from "@assets/temp.png";

export const EditAnswer = ({
    questionId,
    content,
    setContent,
    profilePicture,
}: {
    questionId: number;
    content: string;
    setContent: (v: string) => void;
    profilePicture: string;
}) => {
    const { mutate: postAnswer } = usePostAnswer();

    const { fireToast, errorToast } = useToast();
    const { alertWhenEmptyFn } = useCheckValidValue();

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
                        errorToast();
                    },
                },
            );
        }
    };

    return (
        <div className="flex flex-col border-b-1 border-borderline py-12">
            <div className="mb-8 flex">
                <div className="mr-8 h-36 w-36 overflow-hidden rounded border-1 border-borderline">
                    <img src={profilePicture || Temp} alt="" />
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

export const OneAnswer = ({
    v,
    writerId,
    boardId,
    profilePicture,
    nickname,
}: {
    v: AnswerDefaultType;
    writerId: number;
    boardId: number;
    profilePicture: string;
    nickname: string;
}) => {
    const { data: user } = useGetMemberDetail({ memberId: v.memberId });

    const { isLoggedIn, isMine, isSameUser } = useCheckUser({ memberId: v.memberId, comparedMemberId: writerId });

    const [isEdit, setIsEdit] = useState(false);
    const [curAnswer, setCurAnswer] = useState(v.content);
    const [answerId, setAnswerId] = useState(0);
    const [nextComment, setNextComment] = useState("");

    const [isShowComment, setIsShowComment] = useState(false);

    const { fireToast, createToast, errorToast } = useToast();
    const { alertWhenEmptyFn } = useCheckValidValue();

    const { mutate: patchAnswer } = usePatchAnswer();
    const { mutate: deleteAnswer } = useDeleteAnswer();
    const { mutate: postAnswerComment } = usePostAnswerComment();

    const { data: commentList } = useGetAnswerComment({
        page: 1,
        size: 100,
        questionId: boardId,
        answerId,
    });

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
                        errorToast();
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
                    <div className="absolute right-0 top-32">
                        <div className={`flex w-70 ${isMine ? "justify-between" : "justify-end"}`}>
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
                        <div data-color-mode="light">
                            <MDEditor.Markdown source={curAnswer} style={{ whiteSpace: "pre-wrap" }} />
                        </div>
                    ) : (
                        <Typography type="Body" text="삭제된 댓글입니다." color="text-gray-700" />
                    )}
                </div>
            )}
            <button
                className="my-8 w-fit border-1 border-borderline px-8 py-4"
                onClick={() => setIsShowComment(!isShowComment)}
            >
                <Typography text="답글" type="Description" />
            </button>
            {answerId > 0 && (
                <div className="my-12 flex-col">
                    <div className="mb-8 flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="flex rotate-180 items-end p-8">
                                <BiReply />
                            </div>
                            <div className="mr-8 h-36 w-36 overflow-hidden rounded border-1 border-borderline">
                                <img src={profilePicture || Temp} alt="" />
                            </div>
                            <Typography type="Highlight" text={nickname} />
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

            {isShowComment &&
                Array.isArray(commentList) &&
                commentList.length > 0 &&
                commentList.map((v) => (
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
                nickname={answer.nickname}
                profilePicture={answer.profilePicture}
            />
        </div>
    );
};
