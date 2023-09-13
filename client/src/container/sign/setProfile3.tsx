import { useState } from "react";

import SignLayout2 from "@container/sign/component/SignLayout2";
import Typography from "@component/Typography";
import progress from "@assets/sign/fg_3.png";
import SignButton from "@container/sign/component/SignButton";
import Git from "@assets/sign/icon_github.png";

import { useToast } from "@hook/useToast";

import { getItemFromStorage } from "@util/localstorage-helper";

function SetPro3({
    setCurStage,
    githubId,
    setGithubId,
}: {
    setCurStage: (v: number) => void;
    githubId: string;
    setGithubId: (v: string) => void;
}) {
    const nickname = getItemFromStorage("nickname");
    const [isHadGithub, setGithubState] = useState<boolean>(false);

    return (
        <SignLayout2 title={`${nickname}님의`} subTitle="GitHub 계정을 갖고 계신가요?" progressImage={progress}>
            <div className="mb-40 flex items-center justify-center">
                <img className="flex w-80" src={Git}></img>
            </div>
            <div className="mb-20 flex flex-col items-center justify-center gap-10">
                {isHadGithub ? (
                    <InputGithubAccount setCurStage={setCurStage} githubId={githubId} setGithubId={setGithubId} />
                ) : (
                    <>
                        <SignButton type="FILLED" onClickHandler={() => setGithubState(true)}>
                            <Typography type="SmallLabel" text="네 있어요" color="text-white" styles="font-bold" />
                        </SignButton>

                        <SignButton type="OUTLINED" onClickHandler={() => setCurStage(4)}>
                            <Typography type="SmallLabel" text="아니요 없어요" styles="font-bold" />
                        </SignButton>
                    </>
                )}
            </div>
        </SignLayout2>
    );
}

function InputGithubAccount({
    setCurStage,
    githubId,
    setGithubId,
}: {
    setCurStage: (v: number) => void;
    githubId: string;
    setGithubId: (v: string) => void;
}) {
    const { fireToast } = useToast();

    return (
        <>
            <Typography type="Label" text="Github ID를 입력해주세요!" styles="font-bold" />
            <input
                value={githubId}
                onChange={(e) => setGithubId(e.currentTarget.value)}
                placeholder={"Github ID"}
                className="mb-20 flex w-200 justify-center rounded border-1 border-solid border-black p-6 text-center"
            />
            <div className=" flex justify-center">
                <SignButton type="OUTLINED" styles="mr-20" onClickHandler={() => setCurStage(2)}>
                    <Typography type="SmallLabel" text="이전" styles="font-bold" />
                </SignButton>

                <SignButton
                    type="FILLED"
                    onClickHandler={() => {
                        if (!githubId) {
                            return fireToast({
                                content: "깃허브 아이디를 입력해주세요.",
                                isConfirm: false,
                                isWarning: true,
                            });
                        }
                        setCurStage(4);
                    }}
                >
                    <Typography type="SmallLabel" text="다음" color="text-white" styles="font-bold" />
                </SignButton>
            </div>
        </>
    );
}

export default SetPro3;
