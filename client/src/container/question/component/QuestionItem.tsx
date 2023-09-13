import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import dayjs from "dayjs";
import MDEditor from "@uiw/react-md-editor";
import "@component/MarkdownEditor.css";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

import { useGetMemberDetail } from "@api/member/hook";
import { usePostViewCount, useDeleteQuestion } from "@api/question/hook";
import { useGetAnswer } from "@api/answer/hook";

import { useCheckUser } from "@hook/useCheckUser";
import { useToast } from "@hook/useToast";

import Typography from "@component/Typography";
import CommonBtn from "@component/CommonBtn";
import { EditAnswer, ShowAnswer } from "@component/board/Answer";
import Pagination from "@component/Pagination";

import { BsSuitHeartFill, BsFillShareFill } from "react-icons/bs";
import bookmark_unfill from "@assets/bookmark_unfill.svg";
import bookmark_fill from "@assets/bookmark_fill.svg";
import { QuestionDefaultType } from "@type/question/question.res.dto";

const QuestionTitle = ({ question }: { question: QuestionDefaultType }) => {
    const navigate = useNavigate();
    const { title, viewCount, modifiedAt } = question;
    const { data: user } = useGetMemberDetail({ memberId: question.memberId });
    const { isLoggedIn, isMine } = useCheckUser({ memberId: question.memberId });

    const { fireToast, createToast, errorToast } = useToast();

    const [isLiked, setIsLiked] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);

    const { mutate: deleteQuestion } = useDeleteQuestion();

    const onClickDeleteHandler = () => {
        createToast({
            content: "해당 게시글을 삭제하시겠습니까?",
            isConfirm: true,
            callback: () => {
                deleteQuestion(
                    { questionId: question.boardId },
                    {
                        onSuccess: () => {
                            fireToast({
                                content: "질문이 삭제되었습니다!",
                                isConfirm: false,
                            });
                            navigate("/questions");
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

    const onClickEditHandler = () => navigate(`/questions/${question.boardId}/edit`, { state: question });

    return (
        <div className="flex border-b-1 border-borderline">
            <div className="flex-1 p-8">
                {isMine && (
                    <div className="flex items-center justify-end">
                        <CommonBtn size="SM" color="GRAY" onClick={onClickEditHandler}>
                            <Typography text="수정" type="Description" />
                        </CommonBtn>
                        <CommonBtn size="SM" color="GRAY" styleType="FILLED" onClick={onClickDeleteHandler}>
                            <Typography text="삭제" type="Description" color="text-white" />
                        </CommonBtn>
                    </div>
                )}

                <div className="my-8 flex items-center justify-between">
                    <Typography text={title} type="Label" />
                    {user && (
                        <div className="flex items-center">
                            <div className="mr-8 h-36 w-36 overflow-hidden rounded border-1 border-borderline">
                                <img src={user.profilePicture} alt="" />
                            </div>
                            <Typography text={user.nickname} type="Label" />
                        </div>
                    )}
                </div>
                <div className="flex">
                    <Typography
                        text={dayjs(modifiedAt).format("YYYY-MM-DD")}
                        type="SmallLabel"
                        color="text-gray-600"
                        styles="mr-8"
                    />
                    <Typography text="|" type="SmallLabel" color="text-gray-600" styles="mr-8" />
                    <Typography text={`조회수 ${viewCount}`} type="SmallLabel" color="text-gray-600" />
                </div>
            </div>
            <div className="mb-8 flex w-50 flex-col items-center justify-center border-l-1 border-borderline">
                {isLoggedIn && (
                    <>
                        <button onClick={() => setIsLiked(!isLiked)}>
                            <BsSuitHeartFill size="1.2rem" color={isLiked ? "#FF2222" : "#E2E2E2"} />
                        </button>
                        <button onClick={() => setIsBookmarked(!isBookmarked)}>
                            <img src={isBookmarked ? bookmark_fill : bookmark_unfill} className="m-10 h-28 w-28" />
                        </button>
                    </>
                )}
                <button>
                    <BsFillShareFill />
                </button>
            </div>
        </div>
    );
};

function QuestionItem({ question }: { question: QuestionDefaultType }) {
    // 페이지 필터
    const [curPage, setCurPage] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0);

    const { data: answerList } = useGetAnswer({
        page: curPage,
        size: 10,
        questionId: question.boardId,
    });

    useEffect(() => {
        if (answerList && answerList?.pageInfo.totalElements) {
            setTotalItems(answerList?.pageInfo.totalElements);
        }
    }, [answerList]);

    const { isLoggedIn } = useCheckUser({ memberId: question.memberId });

    const [isOpened, setIsOpened] = useState(false);
    const [answer, setAnswer] = useState<string>("");

    const { mutate: postViewCount } = usePostViewCount();

    const onAddViewCount = () => {
        if (!isOpened) {
            // 열기 버튼 클릭 시 - 조회수 증가 api 요청 -> 요청 성공/실패 처리 X
            postViewCount({ questionId: question.boardId });
        }
        setIsOpened(!isOpened);
    };

    return (
        <div className="mb-32 border-1 border-borderline p-8">
            <QuestionTitle question={question} />
            <div
                data-color-mode="light"
                className={`relative overflow-hidden border-b-1 border-borderline pb-32 pt-12 ${
                    isOpened ? "" : "max-h-300"
                }`}
            >
                <MDEditor.Markdown source={question.content} style={{ whiteSpace: "pre-wrap" }} />
                <button className="absolute bottom-8 right-8" onClick={onAddViewCount}>
                    <Typography
                        type="SmallLabel"
                        text={`${isOpened ? "닫기" : question.content.length < 300 ? "답변 확인" : "열기"}`}
                        color="text-blue-500 hover:text-blue-800"
                    />
                </button>
            </div>
            {isOpened && (
                <div className="p-8">
                    <Typography type="Highlight" text={`답변 ${answerList?.data.length || 0}개`} />
                    {isLoggedIn && (
                        <EditAnswer
                            questionId={question.boardId}
                            content={answer}
                            setContent={setAnswer}
                            profilePicture={question.profilePicture}
                        />
                    )}
                    <div className="my-16">
                        {answerList?.data &&
                            Array.isArray(answerList?.data) &&
                            answerList?.data.map((v) => (
                                <ShowAnswer key={v.answerId} answer={v} writerId={question.memberId} />
                            ))}
                        <Pagination curPage={curPage} setCurPage={setCurPage} totalItems={totalItems || 0} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default QuestionItem;
