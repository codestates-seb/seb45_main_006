import { useState } from "react";
import { useNavigate } from "react-router-dom";

import BoardInput from "@component/board/Input";
import BoardTextarea from "@component/board/Textarea";
import Button from "@component/Button";
import Typography from "@component/Typography";

export default function Register() {
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        studyName: "",
        detail: "",
        stack: "",
        date: "",
        group: 0,
    });

    function handleInput(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) {
        const { name, value } = e.target;

        setInputs({ ...inputs, [name]: value });
    }

    // async function handleSubmit() {
    //     const path = "/studies";
    //     const body = {
    //         ...inputs,
    //     };
    //     const { code, message, data } = await axios.post(path, body); //hook으로 바꾸기

    //     if (code !== 200) {
    //         alert(message);
    //         return;
    //     }

    //     navigate("/todos/register");
    // }
    return (
        <div className="m-80 flex justify-center">
            <div className="flex w-11/12 justify-center rounded-lg bg-study">
                <div className="flex w-11/12 flex-col">
                    <Typography type="Heading" text="어떤 스터디인가요?" styles="pt-60 pb-30 pl-10 self-baseline" />
                    <BoardInput
                        name="studyName"
                        label="스터디명"
                        required={true}
                        placeholder="ex) 카메라 서비스 개발"
                        value={inputs.studyName}
                        onChange={handleInput}
                        maxlength={20}
                    />
                    <BoardTextarea
                        name="detail"
                        label="스터디 상세내용"
                        required={true}
                        placeholder="ex) 카메라 서비스 개발"
                        value={inputs.detail}
                        onChange={handleInput}
                    />
                    <BoardInput
                        name="stack"
                        label="요구스택"
                        required={true}
                        placeholder="ex) java, javascript"
                        value={inputs.stack}
                        onChange={handleInput}
                    />
                    <BoardInput label="모집여부" disabled={true} placeholder="모집중" onChange={handleInput} />
                    <BoardInput
                        name="date"
                        label="스터디 기간"
                        required={true}
                        placeholder="ex) 2023-09-22"
                        value={inputs.date}
                        onChange={handleInput}
                    />
                    <BoardInput
                        name="group"
                        label="모집인원"
                        required={true}
                        placeholder="ex) 6명"
                        value={inputs.group}
                        onChange={handleInput}
                    />
                    <div className="flex w-full justify-center">
                        <Button
                            type="STUDY_POINT"
                            styles="mb-20"
                            isFullBtn={false}
                            onClickHandler={() => {
                                navigate("/studies/:studyBoardId");
                            }}
                        >
                            <Typography text="등록하기" type="Label" color="text-white" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
