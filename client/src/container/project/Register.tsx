import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BoardInput from "@component/board/Input";
import BoardTextarea from "@component/board/Textarea";
import Button from "@component/Button";
import Typography from "@component/Typography";
import DateChoice from "@container/project/component/DateChoice";
import { usePostProject } from "@api/project/hook";
import { useToast } from "@hook/useToast";

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
    const [isFormValid, setIsFormValid] = useState(false);

    const validateForm = () => {
        const { title, content, startDate, deadline, recruitNum } = inputs;
        const isTitleValid = title.trim() !== "";
        const isContentValid = content.trim() !== "";
        const isStartDateValid = startDate.trim() !== "";
        const isDeadlineValid = deadline.trim() !== "";
        const isRecruitNumValid = recruitNum > 0;

        const isValid = isTitleValid && isContentValid && isStartDateValid && isDeadlineValid && isRecruitNumValid;
        setIsFormValid(isValid);
    };

    const handleDates = (start: string, end: string): void => {
        setInputs({ ...inputs, startDate: start, deadline: end });
        validateForm();
    };

    function handleInput(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
        validateForm();
    }

    const { mutate: postProject } = usePostProject();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleSubmit = async () => {
        try {
            postProject(inputs, {
                onSuccess: () => {
                    navigate("/projects/:projectBoardId");
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

    return (
        <div className="m-80 flex justify-center">
            <div className="flex w-11/12 justify-center rounded-lg bg-project">
                <div className="flex w-11/12 flex-col">
                    <Typography type="Heading" text="어떤 프로젝트인가요?" styles="pt-60 pb-30 self-baseline" />
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
                            styles="mb-20 shadow-md hover:bg-blue-400"
                            isFullBtn={false}
                            onClickHandler={() => {
                                if (isFormValid) {
                                    handleSubmit();
                                } else {
                                    fireToast({
                                        content: "빈 칸을 채워주세요!",
                                        isConfirm: false,
                                    });
                                }
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
