import { useParams, useNavigate } from "react-router-dom";

import { useDeleteQuestion, useGetDetailQuestion } from "@api/question/hook";
import { useToast } from "@hook/useToast";

import QuestionItem from "./component/QuestionItem";
import Typography from "@component/Typography";
import HotBoard from "@component/board/HotBoard";

function Detail() {
    const { questionId } = useParams();
    const navigate = useNavigate();
    const boardId = Number.parseInt(questionId || "0");

    const { data: question } = useGetDetailQuestion({ boardId });
    const { createToast, fireToast, errorToast } = useToast();

    const { mutate: deleteQuestion } = useDeleteQuestion();

    const onClickDeleteHandler = ({ boardId }: { boardId: number }) => {
        createToast({
            content: "해당 게시글을 삭제하시겠습니까?",
            isConfirm: true,
            callback: () => {
                deleteQuestion(
                    { questionId: boardId },
                    {
                        onSuccess: () => {
                            fireToast({
                                content: "질문이 삭제되었습니다!",
                                isConfirm: false,
                            });
                            navigate("/questions");
                        },
                        onError: (err) => errorToast(err),
                    },
                );
            },
        });
    };

    if (!question) {
        return <div>hello</div>;
    }

    return (
        <div className="mt-80 flex">
            <div className="flex flex-1 flex-col border-r-1 border-borderline">
                <div className="p-12">
                    <QuestionItem
                        question={question}
                        key={boardId}
                        onClickDeleteHandler={onClickDeleteHandler}
                        isDetail={true}
                    />
                </div>
            </div>
            <div className="hidden h-full w-300 flex-col p-8 lg:flex">
                <Typography type="Label" text="🔥 HOT 게시글" />
                <HotBoard board="question" />
            </div>
        </div>
    );
}

export default Detail;
