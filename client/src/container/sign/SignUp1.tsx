import { Link } from "react-router-dom";

import Typography from "@component/Typography";
import SignLayout from "@container/sign/component/SignLayout";

import progress from "@assets/sign/progress_bar1.png";
import googleImg from "@assets/sign/google.png";
// import githubImg from "@assets/sign/github.png";
import fontImg from "@assets/sign/font.png";

const endpoint = import.meta.env.VITE_APP_API_ENDPOINT || "";

function SignUpContent1() {
    const googleOauthHandler = () => {
        const oAuthURL = `${endpoint}/oauth2/authorization/google`;
        window.location.assign(oAuthURL);
    };

    return (
        <div className="mb-70">
            <img className="absolute -top-32 left-96 w-100" src={fontImg} />
            <Link to={"/signup/2"} className="m-auto flex w-320 justify-center rounded bg-black p-8">
                <Typography type="Highlight" text="DevSquad로 가입하기" color="text-white" />
            </Link>
            <button
                className="m-auto mt-25 flex w-320 justify-center rounded border-2 border-solid border-black p-6"
                onClick={googleOauthHandler}
            >
                <img className="flex w-30 pr-5" src={googleImg} />
                <Typography type="Highlight" text="Google 계정으로 가입" />
            </button>
            {/* <button
                className="m-auto mt-25 flex w-320 justify-center rounded border-2 border-solid border-black p-6"
                onClick={() => {}}
            >
                <img className="flex w-30 pr-5" src={githubImg} />
                <Typography type="Highlight" text="GitHub 계정으로 가입" />
            </button> */}
            <div className="h-40 w-320"></div>
        </div>
    );
}

function SignUp1() {
    return (
        <SignLayout title="회원가입 방법을" subTitle="선택해주세요!" progressImage={progress}>
            <SignUpContent1 />
        </SignLayout>
    );
}

export default SignUp1;
