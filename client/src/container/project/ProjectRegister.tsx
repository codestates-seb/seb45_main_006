import ProjectInput from "@component/project/ProjectInput";
import ProjectTextarea from "@component/project/ProjectTextarea";
import { useState } from "react";
//import { useNavigate } from "react-router-dom";

export default function ProjectRegister() {
    //const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        projectName: "",
        detail: "",
        stack: "",
        date: "",
        group: 0,
    });

    function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;

        setInputs({ ...inputs, [name]: value });
    }

    // async function handleSubmit() {
    //     const path = "/login";
    //     const body = {
    //         ...inputs,
    //     };
    //     const { code, message, data } = await axios.post(path, body);

    //     if (code !== 200) {
    //         alert(message);
    //         return;
    //     }

    //     navigate("/todos");
    // }
    return (
        <div className="flex items-center justify-center">
            <div className="w-5/6 rounded-lg bg-project">
                <h1 className="m-20 text-xl">어떤 프로젝트인가요?</h1>
                <ProjectInput
                    name="projectName"
                    label="프로젝트명"
                    required={true}
                    placeholder="ex) 카메라 서비스 개발"
                    value={inputs.projectName}
                    onChange={handleInput}
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
                    placeholder="2023-09-22"
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
            </div>
            <button onClick={() => {}}></button>
        </div>
    );
}
