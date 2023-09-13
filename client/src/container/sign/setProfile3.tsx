import SignLayout2 from "@container/sign/component/SignLayout2";
import Typography from "@component/Typography";
import { Link } from "react-router-dom";
import { useState } from "react";
import progress from "@assets/sign/fg_3.png";
import SignButton from "@container/sign/component/SignButton";
import Git from "@assets/sign/icon_github.png";

function SetPro3() {
    return (
        <SignLayout2 title="설희님!" subTitle="GitHub 계정을 갖고 계신가요?" progressImage={progress}>
            <ProfileContent1 />
        </SignLayout2>
    );
}

function InputGithubAccount() {
    const [text, setText] = useState<string>("");
    return (
        <>
            <Typography type="Label" text="Github ID를 입력해주세요!" styles="font-bold" />
            <input
                value={text}
                onChange={(e) => setText(e.currentTarget.value)}
                placeholder={"Github ID"}
                className="mb-20 flex w-200 justify-center rounded border-1 border-solid border-black p-6 text-center"
            />
            <div className=" flex justify-center">
                <Link to={"/setpro/2"}>
                    <SignButton type="OUTLINED" styles="mr-20">
                        <Typography type="SmallLabel" text="이전" styles="font-bold" />
                    </SignButton>
                </Link>
                <Link to={"/setpro/4"}>
                    <SignButton type="FILLED">
                        <Typography type="SmallLabel" text="다음" color="text-white" styles="font-bold" />
                    </SignButton>
                </Link>
            </div>
        </>
    );
}

const ProfileContent1 = () => {
    const [isHadGithub, setGithubState] = useState<boolean>(false);

    return (
        <>
            <div className="mb-40 flex items-center justify-center">
                <img className="flex w-80" src={Git}></img>
            </div>
            <div className="mb-20 flex flex-col items-center justify-center gap-10">
                {isHadGithub ? (
                    <InputGithubAccount />
                ) : (
                    <>
                        <SignButton type="FILLED" onClickHandler={() => setGithubState(true)}>
                            <Typography type="SmallLabel" text="네 있어요" color="text-white" styles="font-bold" />
                        </SignButton>
                        <Link to={"/setpro/4"}>
                            <SignButton type="OUTLINED">
                                <Typography type="SmallLabel" text="아니요 없어요" styles="font-bold" />
                            </SignButton>
                        </Link>
                    </>
                )}
            </div>
        </>
    );
};
export default SetPro3;
