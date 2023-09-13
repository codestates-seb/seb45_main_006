import { useEffect } from "react";
import { Link } from "react-router-dom";

import { useGetMyDetail } from "@api/member/hook";

import SignLayout from "@container/sign/component/SignLayout";
import Typography from "@component/Typography";

import progress from "@assets/sign/progress_bar3.png";
import { setItemToStorage } from "@util/localstorage-helper";

function SignUp3() {
    const { data: myInfo } = useGetMyDetail();

    useEffect(() => {
        if (myInfo) {
            setItemToStorage("nickname", myInfo.nickname);
            setItemToStorage("profilePicture", myInfo.profilePicture);
        }
    }, [myInfo]);

    return (
        <SignLayout
            title={`${myInfo?.nickname || ""}님의 회원가입을`}
            subTitle="축하합니다 🎉"
            progressImage={progress}
        >
            <div className="flex-col justify-center pb-50">
                <div className="flex justify-center pb-10">
                    <Typography type="Highlight" text="잠깐! 알고 계신가요?"></Typography>
                </div>
                <div className="flex justify-center">
                    <div className="flex justify-center">
                        <Typography type="Highlight" color="text-main" styles="font-bold" text="DevSquad" />
                    </div>
                    <div className="flex justify-center">
                        <Typography type="Highlight" text="에서는 간단한 프로필 입력만으로도"></Typography>
                    </div>
                </div>
                <div className="flex justify-center">
                    <Typography
                        type="Highlight"
                        text="나와 맞는 스터디와 프로젝트까지 쉽게 찾아볼 수 있어요!"
                    ></Typography>
                </div>
            </div>

            <div className="flex flex-col items-center">
                <Link to={"/setpro/1"} className="mt-25 flex w-230 justify-center rounded bg-[#888888] p-9">
                    <Typography type="Highlight" text="간단 프로필 만들러 가기" color="text-white" />
                </Link>
                <div className="pb-50">
                    <Link
                        to={"/"}
                        className="m-auto mt-25 flex w-230 justify-center rounded border-1 border-solid border-black p-9"
                    >
                        <Typography type="Highlight" text="다음에 만들어 볼래요" />
                    </Link>
                </div>
            </div>
        </SignLayout>
    );
}

export default SignUp3;
