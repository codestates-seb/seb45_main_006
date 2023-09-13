import { Link } from "react-router-dom";
import SignLayout from "@container/sign/component/SignLayout";
import Typography from "@component/Typography";
import progress from "@assets/sign/progress_bar3.png";

function SignUp3() {
    //컴포넌트 내부에 useState, handleInput 넣기
    return (
        <SignLayout title="설희님의 회원가입을" subTitle="축하합니다 🎉" progressImage={progress}>
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
                <Link to={"/setpro/1"}>
                    <a className="m-auto flex w-230 justify-center rounded bg-button-next p-9">
                        <Typography type="Highlight" text="간단 프로필 만들러 가기" color="text-white" />
                    </a>
                </Link>
                <div className="pb-50">
                    <Link to={"/"}>
                        <a className="m-auto mt-25 flex w-230 justify-center rounded border-1 border-solid border-black p-9">
                            <Typography type="Highlight" text="다음에 만들어 볼래요" />
                        </a>
                    </Link>
                </div>
            </div>
        </SignLayout>
    );
}

export default SignUp3;
