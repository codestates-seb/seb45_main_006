import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useRecoilValue } from "recoil";
import { defaultStackAtom } from "@feature/Global";

import { usePostStudy, usePatchStudy, usePatchCloseStudy } from "@api/study/hook";
import { useToast } from "@hook/useToast";
import { useCheckValidValue } from "@hook/useCheckValidValue";
import { useCheckCurActivity } from "@hook/useCheckCurActivity";

import BoardInput from "@component/board/Input";
import BoardTextarea from "@component/board/Textarea";
import Button from "@component/Button";
import Typography from "@component/Typography";
import Dropdown from "@component/project-study/Dropdown";
import AutoCompletionTags from "@component/AutoCompletionTags";
import InputForNumber from "@component/project-study/InputForNumber";
import { GetResDetailStudy } from "@type/study/study.res.dto";

export default function Register() {
    const navigate = useNavigate();
    const location = useLocation();
    const { curActivity } = useCheckCurActivity({ location });

    const options = ["모집중", "모집완료"];
    const [selectedOption, setSelectedOption] = useState("모집중");
    const [selectedStack, setSelectedStack] = useState<Array<string>>([]);

    const { mutate: postStudy } = usePostStudy();
    const { mutate: patchStudy } = usePatchStudy();
    const { mutate: closeStudy } = usePatchCloseStudy();
    const { fireToast } = useToast();
    const { alertWhenEmptyFn } = useCheckValidValue();

    const [inputs, setInputs] = useState({
        title: "",
        content: "",
        recruitNum: 0,
    });

    const [prevStudyStatus, setPrevStudyStatus] = useState("");

    useEffect(() => {
        if (curActivity === "EDIT") {
            const {
                title: prevTitle,
                content: prevContent,
                stacks: prevStack,
                recruitNum: prevRecruitNum,
                studyStatus,
            }: GetResDetailStudy = location.state;
            setInputs({
                ...inputs,
                title: prevTitle,
                content: prevContent,
                recruitNum: prevRecruitNum,
            });

            setSelectedStack(prevStack || []);
            setPrevStudyStatus(studyStatus);
            if (studyStatus === "STUDY_POSTED") setSelectedOption("모집중");
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
        if (value.length > 2) {
            setInputs({ ...inputs, [name]: value.slice(0, 2) });
        }
        if (parseInt(value) >= 0) {
            setInputs({ ...inputs, [name]: value });
        }
        if (parseInt(value) > 12) {
            setInputs({ ...inputs, [name]: 12 });
        }
    }

    const handleSelectOption = (option: string) => {
        setSelectedOption(option);
    };

    const isEmpty = () => {
        const registerInputs = [
            { name: "스터디명", content: inputs.title },
            { name: "스터디 상세내용", content: inputs.content },
            { name: "모집인원", content: inputs.recruitNum },
            { name: "요구 스택", content: selectedStack.join(", ") },
        ];
        const emptyNames = alertWhenEmptyFn(registerInputs);
        return emptyNames.length !== 0;
    };

    const onPostClickHandler = async () => {
        if (isEmpty()) return;
        const recruitNum =
            typeof inputs.recruitNum === "string" ? Number.parseInt(inputs.recruitNum) : inputs.recruitNum;
        postStudy(
            { ...inputs, stack: selectedStack, recruitNum },
            {
                onSuccess: (res) => {
                    const boardId = res.boardId;
                    navigate(`/studies/${boardId}`);
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

        if (prevStudyStatus && prevStudyStatus === "STUDY_CLOSED" && selectedOption === "모집중") {
            closeStudy(
                { boardId: location.state.boardId },
                {
                    onSuccess: () => {
                        navigate(`/studies/${location.state.boardId}`);

                        fireToast({
                            content: "게시글이 수정되었습니다!",
                            isConfirm: false,
                        });
                    },
                },
            );
            return;
        }

        if (prevStudyStatus) {
            if (prevStudyStatus === "STUDY_POSTED" && selectedOption === "모집완료") {
                closeStudy({ boardId: location.state.boardId });
            }
        }

        patchStudy(
            {
                ...inputs,
                boardId: location.state.boardId,
                // recruitStatus: selectedOption === "모집완료" ? "STUDY_CLOSED" : "STUDY_POSTED",
                stack: selectedStack,
            },
            {
                onSuccess: () => {
                    if (selectedOption === "모집완료") {
                        navigate(`/studies`);
                    } else {
                        navigate(`/studies/${location.state.boardId}`);
                    }
                    fireToast({
                        content: "게시글이 수정되었습니다!",
                        isConfirm: false,
                    });
                },

                onError: () => {
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
                    <InputForNumber
                        name="recruitNum"
                        label="모집인원"
                        required={true}
                        placeholder="ex) 6 / 최대 12명"
                        value={inputs.recruitNum}
                        onChange={handleNumberInput}
                    />
                    <div className="flex w-full justify-center">
                        {curActivity === "REGISTER" ? (
                            <Button
                                type="STUDY_POINT"
                                styles="mb-20 shadow-md hover:bg-green-400"
                                isFullBtn={false}
                                onClickHandler={onPostClickHandler}
                            >
                                <Typography text="등록하기" type="Label" color="text-white" />
                            </Button>
                        ) : (
                            <Button
                                type="STUDY_POINT"
                                styles="mb-20 shadow-md hover:bg-green-400"
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
