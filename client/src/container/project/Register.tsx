import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import BoardInput from "@component/board/Input";
import BoardTextarea from "@component/board/Textarea";
import Button from "@component/Button";
import Typography from "@component/Typography";
import DateChoice from "@container/project/component/DateChoice";

import { usePatchProject, usePostProject } from "@api/project/hook";
import { useToast } from "@hook/useToast";
import { useCheckEmptyInput } from "@hook/useCheckEmptyInput";
import { useCheckCurActivity } from "@hook/useCheckCurActivity";
import { GetResDetailProject } from "@type/project/project.res.dto";

export default function Register() {
    const navigate = useNavigate();
    const location = useLocation();
    const { curActivity } = useCheckCurActivity({ location });

    const { mutate: postProject } = usePostProject();
    const { mutate: patchProject } = usePatchProject();
    const { alertWhenEmptyFn } = useCheckEmptyInput();
    const { fireToast } = useToast();

    const [inputs, setInputs] = useState({
        title: "",
        content: "",
        startDate: "",
        deadline: "",
        recruitNum: 0,
        recruitStatus: false,
    });

    useEffect(() => {
        if (curActivity === "EDIT") {
            const {
                title: prevTitle,
                content: prevContent,
                startDate: prevStartDate,
                deadline: prevDeadline,
                recruitNum: prevRecruitNum,
            }: GetResDetailProject = location.state;
            setInputs({
                ...inputs,
                title: prevTitle,
                content: prevContent,
                startDate: prevStartDate,
                deadline: prevDeadline,
                recruitNum: prevRecruitNum,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [curActivity]);

    const handleDates = (start: string, end: string): void => {
        setInputs({ ...inputs, startDate: start, deadline: end });
    };

    function handleInput(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
    }

    const isEmpty = () => {
        const registerInputs = [
            { name: "제목", content: inputs.title },
            { name: "내용", content: inputs.content },
            { name: "시작날짜", content: inputs.startDate },
            { name: "마감날짜", content: inputs.deadline },
            { name: "모집인원", content: inputs.recruitNum },
        ];
        const emptyNames = alertWhenEmptyFn(registerInputs);
        return emptyNames.length > 0;
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const onPostClickHandler = () => {
        if (isEmpty()) return;

        if (inputs.title !== "") {
            postProject(inputs, {
                //아이디가 있어야 상세조회 가능하므로 boardId 전달
                onSuccess: (res) => {
                    console.log("1111111", res.data);
                    navigate("/projects/:projectBoardId", { state: res.data.boardId });
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
                        isWarning: true,
                    });
                },
            });
        }
    };

    const onPatchClickHandler = () => {
        if (isEmpty()) return;

        patchProject(
            { boardId: location.state.boardId, content: inputs.content },
            {
                onSuccess: (res) => {
                    console.log("2222", res.data.boardId);
                    navigate("/projects/:projectBoardId", { state: res.data.boardId });
                    fireToast({
                        content: "게시글이 수정되었습니다!",
                        isConfirm: false,
                    });
                },
                // TODO: 에러 분기
                onError: (err) => {
                    console.log(err);
                    fireToast({
                        content: "게시글 수정 중 에러가 발생하였습니다🥹",
                        isConfirm: false,
                        isWarning: true,
                    });
                },
            },
        );
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
                    {curActivity === "REGISTER" ? (
                        <BoardInput label="모집여부" disabled={true} placeholder="모집중" onChange={handleInput} />
                    ) : (
                        <BoardInput label="모집여부" disabled={false} placeholder="모집중" onChange={handleInput} />
                    )}
                    <DateChoice onChange={handleDates} />
                    <BoardInput
                        name="recruitNum"
                        label="모집인원"
                        required={true}
                        placeholder="ex) 6"
                        value={inputs.recruitNum}
                        onChange={handleInput}
                    />
                    <div className="flex w-full justify-center">
                        {curActivity === "REGISTER" ? (
                            <Button
                                type="PROJECT_POINT"
                                styles="mb-20 shadow-md hover:bg-blue-400"
                                isFullBtn={false}
                                onClickHandler={onPostClickHandler}
                            >
                                <Typography text="등록하기" type="Label" color="text-white" />
                            </Button>
                        ) : (
                            <Button
                                type="PROJECT_POINT"
                                styles="mb-20 shadow-md hover:bg-blue-400"
                                isFullBtn={false}
                                onClickHandler={onPatchClickHandler}
                            >
                                <Typography text="수정하기" type="Label" color="text-white" />
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
