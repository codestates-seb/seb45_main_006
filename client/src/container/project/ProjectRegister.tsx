import ProjectInput from "@component/project/ProjectInput";
import ProjectTextarea from "@component/project/ProjectTextarea";
import { useState } from "react";
//import { useNavigate } from "react-router-dom";
import Button from "@component/common/Button";
import Text from "@component/common/Text";

export default function ProjectRegister() {
    //const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        projectName: "",
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
    //     const path = "/projects";
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
        <div className="m-80 flex items-center justify-center">
            <div className="flex w-11/12 flex-col items-center justify-center rounded-lg bg-project">
                <Text type="Heading" text="어떤 프로젝트인가요?" styles="pt-60 pb-30 pl-60 self-baseline"></Text>
                <ProjectInput
                    name="projectName"
                    label="프로젝트명"
                    required={true}
                    placeholder="ex) 카메라 서비스 개발"
                    value={inputs.projectName}
                    onChange={handleInput}
                    maxlength={20}
                />
                <ProjectTextarea
                    name="detail"
                    label="프로젝트 상세내용"
                    required={true}
                    placeholder="ex) 카메라 서비스 개발"
                    value={inputs.detail}
                    onChange={handleInput}
                />
                <ProjectInput
                    name="stack"
                    label="요구스택"
                    required={true}
                    placeholder="ex) java, javascript"
                    value={inputs.stack}
                    onChange={handleInput}
                />
                <ProjectInput label="모집여부" disabled={true} placeholder="모집중" onChange={handleInput} />
                <ProjectInput
                    name="date"
                    label="프로젝트 기간"
                    required={true}
                    placeholder="ex) 2023-09-22"
                    value={inputs.date}
                    onChange={handleInput}
                />
                <ProjectInput
                    name="group"
                    label="모집인원"
                    required={true}
                    placeholder="ex) 6명"
                    value={inputs.group}
                    onChange={handleInput}
                />
                <Button
                    type="PROJECT"
                    label="등록하기"
                    styles="bg-project_point text-white font-semibold px-30 mb-20"
                    isFullBtn={false}
                    onClickHandler={() => {
                        // Handle the click event for the "Create Project" button here...
                    }}
                />
            </div>
        </div>
    );
}
