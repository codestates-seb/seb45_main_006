import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BoardInput from "@component/board/Input";
import BoardTextarea from "@component/board/Textarea";
import Button from "@component/Button";
import Typography from "@component/Typography";
import { usePostStudy } from "@api/study/hook";
import { useToast } from "@hook/useToast";
import { useCheckValidValue } from "@hook/useCheckValidValue";

export default function Register() {
    const navigate = useNavigate();
    const { fireToast } = useToast();
    const { alertWhenEmptyFn } = useCheckValidValue();

    const [inputs, setInputs] = useState({
        title: "",
        content: "",
        // stack: "",
        recruitNum: 0,
        recruitStatus: false,
    });

    function handleInput(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
    }

    const { mutate: postStudy } = usePostStudy();

    const handleSubmit = async () => {
        const registerInputs = [
            { name: "제목", content: inputs.title },
            { name: "내용", content: inputs.content },
            { name: "모집인원", content: inputs.recruitNum },
        ];
        const emptyNames = alertWhenEmptyFn(registerInputs);
        if (emptyNames.length === 0) {
            postStudy(inputs, {
                onSuccess: () => {
                    navigate("/studies/:studyBoardId");
                    fireToast({
                        content: "게시글이 등록되었습니다!",
                        isConfirm: false,
                    });
                },
                // TODO: 에러 분기
                onError: (err) => {
                    console.log(err);
                    fireToast({
                        content: "게시글 등록 중 에러가 발생하였습니다🥹",
                        isConfirm: false,
                        // isWarning: true,
                    });
                },
            });
        }
    };

    return (
        <div className="m-80 flex justify-center">
            <div className="flex w-11/12 justify-center rounded-lg bg-study">
                <div className="flex w-11/12 flex-col">
                    <Typography type="Heading" text="어떤 스터디인가요?" styles="pt-60 pb-30 self-baseline" />
                    <BoardInput
                        name="title"
                        label="스터디명"
                        required={true}
                        placeholder="ex) 카메라 서비스 개발"
                        value={inputs.title}
                        onChange={handleInput}
                        maxlength={20}
                    />
                    <BoardTextarea
                        name="content"
                        label="스터디 상세내용"
                        required={true}
                        placeholder="ex) 카메라 서비스 개발"
                        value={inputs.content}
                        onChange={handleInput}
                        borderStyle={""}
                    />
                    {/* <BoardInput
                        name="stack"
                        label="요구스택"
                        required={true}
                        placeholder="ex) java, javascript"
                        value={inputs.stack}
                        onChange={handleInput}
                    /> */}
                    <BoardInput label="모집여부" disabled={true} placeholder="모집중" onChange={handleInput} />
                    <BoardInput
                        name="recruitNum"
                        label="모집인원"
                        required={true}
                        placeholder="ex) 6명"
                        value={inputs.recruitNum}
                        onChange={handleInput}
                    />
                    <div className="flex w-full justify-center">
                        <Button
                            type="STUDY_POINT"
                            styles="mb-20 shadow-md hover:bg-green-400"
                            isFullBtn={false}
                            onClickHandler={handleSubmit}
                        >
                            <Typography text="등록하기" type="Label" color="text-white" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
