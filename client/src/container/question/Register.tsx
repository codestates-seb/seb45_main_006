import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { usePostQuestion, usePatchQuestion } from "@api/question/hook";
import { useToast } from "@hook/useToast";
import { useCheckEmptyInput } from "@hook/useCheckEmptyInput";
import { useCheckCurActivity } from "@hook/useCheckCurActivity";

import Typography from "@component/Typography";
import Button from "@component/Button";
import BoardInput from "@component/board/Input";
import BoardContent from "@component/board/BoardContent";

import { QuestionDefaultType } from "@type/question/question.res.dto";

function Register() {
    const navigate = useNavigate();
    const location = useLocation();
    const { curActivity } = useCheckCurActivity({ location });

    const { mutate: postQuestion } = usePostQuestion();
    const { mutate: patchQuestion } = usePatchQuestion();
    const { alertWhenEmptyFn } = useCheckEmptyInput();
    const { fireToast } = useToast();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        if (curActivity === "EDIT") {
            const { title: prevTitle, content: prevContent }: QuestionDefaultType = location.state;

            setTitle(prevTitle);
            setContent(prevContent);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [curActivity]);

    const titleChangHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    };

    const isEmpty = () => {
        const inputs = [
            { name: "제목", content: title },
            { name: "상세내용", content },
        ];
        const emptyNames = alertWhenEmptyFn(inputs);
        return emptyNames.length > 0;
    };

    const onPostClickHandler = () => {
        if (isEmpty()) return;

        postQuestion(
            { title, content },
            {
                onSuccess: () => {
                    navigate("/questions");

                    fireToast({
                        content: "질문이 등록되었습니다!",
                        isConfirm: false,
                    });
                },
                // TODO: 에러 분기
                onError: (err) => {
                    console.log(err);
                    fireToast({
                        content: "질문 등록 중 에러가 발생하였습니다🥹",
                        isConfirm: false,
                        isWarning: true,
                    });
                },
            },
        );
    };

    const onPatchClickHandler = () => {
        if (isEmpty()) return;

        patchQuestion(
            { questionId: location.state.boardId, title, content },
            {
                onSuccess: () => {
                    navigate("/questions");

                    fireToast({
                        content: "질문이 수정되었습니다!",
                        isConfirm: false,
                    });
                },
                // TODO: 에러 분기
                onError: (err) => {
                    console.log(err);
                    fireToast({
                        content: "질문 수정 중 에러가 발생하였습니다🥹",
                        isConfirm: false,
                        isWarning: true,
                    });
                },
            },
        );
    };

    return (
        <div className="m-0 flex justify-center lg:m-80">
            <div className="flex w-full flex-col rounded-lg bg-question p-8 sm:px-30 sm:py-60 lg:w-11/12">
                <Typography
                    type="Heading"
                    text={`질문게시판 ${curActivity === "REGISTER" ? "등록" : "수정"}`}
                    styles="pl-10 self-baseline"
                />

                <BoardInput
                    name="title"
                    label="질문 제목"
                    required={true}
                    placeholder="질문 제목을 적어주세요."
                    value={title}
                    onChange={titleChangHandler}
                    maxlength={20}
                />
                <BoardContent label="질문 상세내용" required={true} content={content} setContent={setContent} />
                <div className="flex w-full justify-center">
                    {curActivity === "REGISTER" ? (
                        <Button type="INFO_POINT" styles="mt-20" isFullBtn={false} onClickHandler={onPostClickHandler}>
                            <Typography text="등록하기" type="Label" color="text-white" />
                        </Button>
                    ) : (
                        <Button type="INFO_POINT" styles="mt-20" isFullBtn={false} onClickHandler={onPatchClickHandler}>
                            <Typography text="수정하기" type="Label" color="text-white" />
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Register;
