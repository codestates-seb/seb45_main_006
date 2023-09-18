import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useRecoilValue } from "recoil";
import { defaultStackAtom } from "@feature/Global";

import BoardInput from "@component/board/Input";
import BoardTextarea from "@component/board/Textarea";
import Button from "@component/Button";
import Typography from "@component/Typography";
import DateChoice from "@container/project/component/DateChoice";

import { usePatchProject, usePostProject, usePatchCloseProject } from "@api/project/hook";
import { useToast } from "@hook/useToast";
import { useCheckValidValue } from "@hook/useCheckValidValue";
import { useCheckCurActivity } from "@hook/useCheckCurActivity";
import { GetResDetailProject } from "@type/project/project.res.dto";
import InputForNumber from "@component/project-study/InputForNumber";
import Dropdown from "@component/project-study/Dropdown";
import AutoCompletionTags from "@component/AutoCompletionTags";
import dayjs from "dayjs";

export default function Register() {
    const navigate = useNavigate();
    const location = useLocation();
    const { curActivity } = useCheckCurActivity({ location });

    const options = ["모집중", "모집완료"];
    const [selectedOption, setSelectedOption] = useState("모집중");
    const [selectedStack, setSelectedStack] = useState<Array<string>>([]);
    const [startDate, setStartDate] = useState<string>("");
    const [deadline, setDeadline] = useState<string>("");
    const [prevProjectStatus, setPrevProjectStatus] = useState("");

    const handleSelectOption = (option: string) => {
        setSelectedOption(option);
    };

    const { mutate: postProject } = usePostProject();
    const { mutate: patchProject } = usePatchProject();
    const { mutate: closeProject } = usePatchCloseProject();
    const { alertWhenEmptyFn } = useCheckValidValue();
    const { fireToast } = useToast();

    const [inputs, setInputs] = useState({
        title: "",
        content: "",
        recruitNum: 0,
    });

    useEffect(() => {
        if (curActivity === "EDIT") {
            const {
                title: prevTitle,
                content: prevContent,
                startDate: prevStartDate,
                deadline: prevDeadline,
                recruitNum: prevRecruitNum,
                stack: prevStack,
                projectStatus,
            }: GetResDetailProject = location.state;
            setInputs({
                ...inputs,
                title: prevTitle,
                content: prevContent,
                recruitNum: prevRecruitNum,
            });

            setStartDate(`${dayjs().format("YYYY")}/${prevStartDate}`);
            setDeadline(`${dayjs().format("YYYY")}/${prevDeadline}`);
            setSelectedStack(prevStack || []);
            setPrevProjectStatus(projectStatus);
            if (projectStatus === "PROJECT_POSTED") setSelectedOption("모집중");
            else setSelectedOption("모집완료");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [curActivity]);

    function handleInput(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
    }

    function handleNumberInput(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) {
        const { name, value } = e.target;
        if (!value) {
            setInputs({ ...inputs, [name]: "" });
        }
        if (parseInt(value) >= 0) {
            setInputs({ ...inputs, [name]: value });
        }
        if (parseInt(value) > 12) {
            setInputs({ ...inputs, [name]: 12 });
        }
    }

    const isEmpty = () => {
        const registerInputs = [
            { name: "제목", content: inputs.title },
            { name: "내용", content: inputs.content },
            { name: "시작날짜", content: startDate || "" },
            { name: "마감날짜", content: deadline || "" },
            { name: "모집인원", content: inputs.recruitNum },
        ];
        const emptyNames = alertWhenEmptyFn(registerInputs);
        return emptyNames.length > 0;
    };

    const onPostClickHandler = () => {
        if (isEmpty()) return;

        postProject(
            {
                ...inputs,
                stack: selectedStack,
                startDate: dayjs(startDate).format("M/D"),
                deadline: dayjs(deadline).format("M/D"),
            },
            {
                //아이디가 있어야 상세조회 가능하므로 boardId 전달
                onSuccess: (res) => {
                    navigate(`/projects/${res.boardId}`);
                    fireToast({
                        content: "게시글이 등록되었습니다!",
                        isConfirm: false,
                    });
                },

                onError: (err) => {
                    console.log(err);
                    fireToast({
                        content: "게시글 등록 중 에러가 발생하였습니다🥹",
                        isConfirm: false,
                        isWarning: true,
                    });
                },
            },
        );
    };

    const onPatchClickHandler = () => {
        if (isEmpty()) return;

        if (prevProjectStatus && prevProjectStatus === "PROJECT_CLOSED" && selectedOption === "모집중") {
            closeProject(
                { boardId: location.state.boardId },
                {
                    onSuccess: () => {
                        navigate(`/projects/${location.state.boardId}`);

                        fireToast({
                            content: "게시글이 수정되었습니다!",
                            isConfirm: false,
                        });
                    },
                },
            );
            return;
        }

        if (prevProjectStatus) {
            if (prevProjectStatus === "PROJECT_POSTED" && selectedOption === "모집완료") {
                closeProject({ boardId: location.state.boardId });
            }
        }

        patchProject(
            {
                ...inputs,
                boardId: location.state.boardId,
                // recruitStatus: selectedOption === "모집완료" ? "PROJECT_CLOSED" : "PROJECT_POSTED",
                stack: selectedStack,
                startDate: dayjs(startDate).format("M/D"),
                deadline: dayjs(deadline).format("M/D"),
            },
            {
                onSuccess: (res) => {
                    if (selectedOption === "모집완료") {
                        navigate(`/projects`);
                    } else {
                        navigate(`/projects/${res.boardId}`);
                    }
                    fireToast({
                        content: "게시글이 수정되었습니다!",
                        isConfirm: false,
                    });
                },

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

    const defaultStack = useRecoilValue(defaultStackAtom);

    return (
        <div className="m-80 flex justify-center">
            <div className="flex w-11/12 justify-center rounded-lg bg-project">
                <div className="flex w-11/12 flex-col">
                    <Typography type="Heading" text="어떤 프로젝트인가요?" styles="pt-60 pb-30 self-baseline" />
                    <BoardInput
                        name="title"
                        label="프로젝트명"
                        required={true}
                        placeholder="프로젝트명을 입력하세요."
                        value={inputs.title}
                        onChange={handleInput}
                        maxlength={20}
                        borderStyle="outline-project"
                        disabled={prevProjectStatus === "PROJECT_CLOSED"}
                    />
                    <BoardTextarea
                        name="content"
                        label="프로젝트 상세내용"
                        required={true}
                        placeholder="프로젝트를 자세히 설명해주세요."
                        value={inputs.content}
                        onChange={handleInput}
                        borderStyle="outline-project"
                        disabled={prevProjectStatus === "PROJECT_CLOSED"}
                    />
                    <div className="my-10 p-10">
                        <div className="flex">
                            <Typography text="요구 스택" type="Body" styles="mb-10" />
                            <Typography text="*" type="Body" color="text-warn" />
                        </div>
                        <AutoCompletionTags
                            type="OUTLINED"
                            placeholder="검색할 기술 스택을 입력해주세요."
                            selectedTags={selectedStack}
                            setSelectedTags={setSelectedStack}
                            defaultSuggestions={defaultStack}
                            borderColor="border-project"
                        />
                    </div>
                    {curActivity === "REGISTER" ? (
                        <Dropdown
                            label="모집여부"
                            options={options}
                            selectedOption={selectedOption}
                            onSelectOption={handleSelectOption}
                            disabled={true}
                        />
                    ) : (
                        <Dropdown
                            label="모집여부"
                            options={options}
                            selectedOption={selectedOption}
                            onSelectOption={handleSelectOption}
                            disabled={false}
                        />
                    )}
                    <DateChoice
                        startDate={startDate}
                        setStartDate={setStartDate}
                        deadline={deadline}
                        setDeadline={setDeadline}
                        borderColor="border-project"
                    />
                    <InputForNumber
                        name="recruitNum"
                        label="모집인원"
                        required={true}
                        placeholder="ex) 6"
                        value={inputs.recruitNum}
                        onChange={handleNumberInput}
                        borderStyle="outline-project"
                        disabled={prevProjectStatus === "PROJECT_CLOSED"}
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
