import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BoardInput from "@component/board/Input";
import BoardTextarea from "@component/board/Textarea";
import Button from "@component/Button";
import Typography from "@component/Typography";
import DateChoice from "@container/project/component/DateChoice";
import { usePostProject } from "@api/project/hook";
import { useToast } from "@hook/useToast";

// type IInput = {
//     projectName: string;
//     detail: string;
//     stack: string;
//     date: string;
//     group: number;
// };

export default function Register() {
    const navigate = useNavigate();
    const { fireToast } = useToast();

    const [inputs, setInputs] = useState({
        title: "",
        content: "",
        startDate: "",
        deadline: "",
        recruitNum: 0,
        recruitStatus: false,
    });
    const handleDates = (start: string, end: string): void => {
        setInputs({ ...inputs, startDate: start, deadline: end });
    };

    function handleInput(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
    }

    const { mutate: postProject } = usePostProject();

    const handleSubmit = async () => {
        try {
            postProject(inputs, {
                onSuccess: () => {
                    navigate("/infos");

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
        } catch (error) {
            console.log("errorMessage", error);
        }
    };

    // async function handleSubmit() {
    //     const path = "/projects";
    //     const body = {
    //         ...inputs,
    //     };
    //     const { code, message, data } = await axios.post(path, body); //hook으로 바꾸기

    //     if (code !== 200) {
    //         alert(message);
    //         return;
    //     }

    //     navigate("/projects/:projectsBoardId");
    // }
    return (
        <div className="m-80 flex justify-center">
            <div className="flex w-11/12 justify-center rounded-lg bg-project">
                <div className="flex w-11/12 flex-col">
                    <Typography type="Heading" text="어떤 프로젝트인가요?" styles="pt-60 pb-30 pl-60 self-baseline" />
                    <BoardInput
                        name="title"
                        label="프로젝트명"
                        required={true}
                        placeholder="ex) 카메라 서비스 개발"
                        value={inputs.title}
                        onChange={handleInput}
                        maxlength={20}
                    />
                    <BoardTextarea
                        name="content"
                        label="프로젝트 상세내용"
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
                    <DateChoice onChange={handleDates} />
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
                            type="PROJECT_POINT"
                            styles="mb-20"
                            isFullBtn={false}
                            onClickHandler={() => {
                                navigate("/projects/:projectBoardId");
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
