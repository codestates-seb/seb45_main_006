import { Link, useNavigate } from "react-router-dom";

import Typography from "@component/Typography";
import SignLayout from "@container/sign/component/SignLayout";

import progress from "@assets/sign/progress_bar1.png";
import googleImg from "@assets/sign/google.png";
import githubImg from "@assets/sign/github.png";
import fontImg from "@assets/sign/font.png";

const CLIENT_ID = import.meta.env.VITE_APP_GOOGLE_OUATH_CLIENT_ID || "";
const REDIRECTION_URL = import.meta.env.VITE_APP_GOOGLE_OAUTH_REDIRECTION_URL || "";

function SignUpContent1() {
    const navigate = useNavigate();
    const oAuthURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${REDIRECTION_URL}&scope=https://www.googleapis.com/auth/userinfo.email`;

    const oAuthHandler = () => {
        window.location.assign(oAuthURL);
        navigate("/signup/oauth-user");
    };

    return (
        <div className="mb-70">
            <img className="absolute -top-32 left-96 w-100" src={fontImg} />
            <Link to={"/signup/2"} className="m-auto flex w-320 justify-center rounded bg-black p-8">
                <Typography type="Highlight" text="DevSquad로 가입하기" color="text-white" />
            </Link>
            <button
                className="m-auto mt-25 flex w-320 justify-center rounded border-2 border-solid border-black p-6"
                onClick={oAuthHandler}
            >
                <img className="flex w-30 pr-5" src={googleImg} />
                <Typography type="Highlight" text="Google 계정으로 가입" />
            </button>
            <button
                className="m-auto mt-25 flex w-320 justify-center rounded border-2 border-solid border-black p-6"
                onClick={() => {}}
            >
                <img className="flex w-30 pr-5" src={githubImg} />
                <Typography type="Highlight" text="GitHub 계정으로 가입" />
            </button>
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
