import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import dayjs from "dayjs";
import MDEditor from "@uiw/react-md-editor";
import "@component/MarkdownEditor.css";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

import { usePostViewCount } from "@api/question/hook";
import { useGetAnswer } from "@api/answer/hook";

import { useCheckUser } from "@hook/useCheckUser";
import { useToast } from "@hook/useToast";

import Typography from "@component/Typography";
import CommonBtn from "@component/CommonBtn";
import { EditAnswer, ShowAnswer } from "@component/board/Answer";
import Pagination from "@component/Pagination";
import UserProfile from "@component/user/UserProfile";

// import { BsFillShareFill } from "react-icons/bs";
import { QuestionDefaultType } from "@type/question/question.res.dto";
import Bookmark from "@component/board/Bookmark";
import LikeBtn from "@component/board/LikeBtn";

const QuestionTitle = ({
    question,
    onClickDeleteHandler,
}: {
    question: QuestionDefaultType;
    onClickDeleteHandler: ({ boardId }: { boardId: number }) => void;
}) => {
    const navigate = useNavigate();
    const { title, viewCount, modifiedAt } = question;
    const { isLoggedIn, isMine } = useCheckUser({ memberId: question.memberId });

    const [isLiked, setIsLiked] = useState(question.liked);
    const [isBookmarked, setIsBookmarked] = useState(question.bookmarked);

    const onClickEditHandler = () => navigate(`/questions/${question.boardId}/edit`, { state: question });

    return (
        <div className="flex border-b-1 border-borderline">
            <div className="flex-1 p-8">
                {isMine && (
                    <div className="flex items-center justify-end">
                        <CommonBtn size="SM" color="MAIN" onClick={onClickEditHandler}>
                            <Typography text="수정" type="Description" />
                        </CommonBtn>
                        <CommonBtn
                            size="SM"
                            color="MAIN"
                            styleType="FILLED"
                            onClick={() => onClickDeleteHandler({ boardId: question.boardId })}
                        >
                            <Typography text="삭제" type="Description" />
                        </CommonBtn>
                    </div>
                )}

                <div className="my-8 flex items-center justify-between">
                    <Typography text={title} type="Label" />

                    <div className="flex items-center">
                        <UserProfile size="sm" profilePicture={question.profilePicture} />
                        <Typography text={question.nickname} type="Label" />
                    </div>
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
                        <LikeBtn
                            board="question"
                            boardId={question.boardId}
                            isLiked={isLiked}
                            setIsLiked={setIsLiked}
                        />
                        <Bookmark
                            board="question"
                            boardId={question.boardId}
                            isBookmarked={isBookmarked}
                            setIsBookmarked={setIsBookmarked}
                            refetch={() => {}}
                        />
                    </>
                )}
                {/* <button onClick={}>
                    <BsFillShareFill />
                </button> */}
            </div>
        </div>
    );
};

function QuestionItem({
    question,
    onClickDeleteHandler,
    isDetail = false,
}: {
    question: QuestionDefaultType;
    onClickDeleteHandler: ({ boardId }: { boardId: number }) => void;
    isDetail?: boolean;
}) {
    // 페이지 필터
    const [curPage, setCurPage] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0);

    const { data: answerList, refetch: refetchAnswer } = useGetAnswer({
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
    const { reqLoginToUserToast } = useToast();

    const [isOpened, setIsOpened] = useState(isDetail);
    const [answer, setAnswer] = useState<string>("");
    const { isMine } = useCheckUser({ memberId: question.memberId });

    const { mutate: postViewCount } = usePostViewCount();

    const onAddViewCount = () => {
        if (!isLoggedIn) {
            reqLoginToUserToast();
            return;
        }
        if (!isOpened) {
            // 열기 버튼 클릭 시 - 조회수 증가 api 요청 -> 요청 성공/실패 처리 X
            postViewCount({ questionId: question.boardId });
        }
        setIsOpened(!isOpened);
    };

    return (
        <div className="mb-32 border-1 border-borderline p-8">
            <QuestionTitle question={question} onClickDeleteHandler={onClickDeleteHandler} />
            <div
                data-color-mode="light"
                className={`relative overflow-hidden border-b-1 border-borderline p-8 pb-32 ${
                    isOpened ? "" : "max-h-300"
                }`}
            >
                <MDEditor.Markdown source={question.content} style={{ whiteSpace: "pre-wrap" }} />
                <button className="absolute bottom-8 right-8" onClick={onAddViewCount}>
                    <Typography
                        type="SmallLabel"
                        text={`${isOpened ? "닫기" : "내용 열기"}`}
                        color="text-blue-500 hover:text-blue-800"
                    />
                </button>
            </div>
            {isOpened && (
                <div className="p-8">
                    {isMine && (
                        <div className="my-24 flex flex-col">
                            <Typography
                                type="SmallLabel"
                                text="Tip! 도움이 된 답변의 경우 초록색 체크 표시를 눌러 채택해주세요!"
                                styles="font-bold"
                                color="text-blue-700"
                            />
                            <Typography
                                type="SmallLabel"
                                text="비슷한 질문을 가진 분들에게 도움이 됩니다!"
                                color="text-blue-700"
                                styles="ml-28"
                            />
                        </div>
                    )}
                    <Typography type="SmallLabel" text={`답변 ${answerList?.data.length || 0}개`} />
                    {isLoggedIn && (
                        <EditAnswer
                            questionId={question.boardId}
                            content={answer}
                            setContent={setAnswer}
                            profilePicture={question.profilePicture}
                            refetchAnswer={refetchAnswer}
                        />
                    )}
                    <div className="my-16">
                        {answerList?.data &&
                            Array.isArray(answerList?.data) &&
                            answerList?.data.map((v) => (
                                <ShowAnswer
                                    key={v.answerId}
                                    answer={v}
                                    writerId={question.memberId}
                                    refetchAnswer={refetchAnswer}
                                    isAcceptExisted={answerList.data.filter((v) => v.accepted).length > 0}
                                />
                            ))}
                        <Pagination curPage={curPage} setCurPage={setCurPage} totalItems={totalItems || 0} size={10} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default QuestionItem;
