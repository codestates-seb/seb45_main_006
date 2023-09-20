import { useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";

import { useLoginInAndOut } from "@hook/useLogInAndOut";

import Button from "@component/Button";
import Input from "@component/Input";

import Typography from "@component/Typography";
// import googleImg from "@assets/sign/login_google.png";
// import githubImg from "@assets/sign/login_github.png";
import { isLoginFailedAtom } from "@feature/Global";

// const endpoint = import.meta.env.VITE_APP_API_ENDPOINT || "";

function Login() {
    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");
    const [isFailed, setIsFailed] = useRecoilState(isLoginFailedAtom);

    const { onHandleLogin } = useLoginInAndOut();

    const onClickLoginHandler = () => {
        onHandleLogin({ email, password: pw, routePath: "/" });
    };

    const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key == "Enter" && onClickLoginHandler) {
            onClickLoginHandler();
        }
    };

    // const googleOauthHandler = () => {
    //     const oAuthURL = `${endpoint}/oauth2/authorization/google`;
    //     window.location.assign(oAuthURL);
    // };

    return (
        <div className="flex h-708 w-full items-center justify-center bg-[url('@assets/sign/login_bg.png')]">
            <div className="mb-100 ml-[600px] flex h-550 w-370 rounded-[20px] border-5 border-black bg-white selection:border-solid">
                <div className="flex-col pl-30 pt-30">
                    <div className="flex">
                        <Typography type="Logo" text="DevSquad" styles="font-bold" color="text-main" />
                        <div className="pl-3 pt-10">
                            <Typography type="Heading" text="에" styles="font-bold" color="text-black" />
                        </div>
                    </div>
                    <div>
                        <Typography type="Heading" text="오신 것을 환영합니다" styles="font-bold" color="text-black" />
                    </div>
                    <div className="mt-50 w-300 flex-col">
                        <Input
                            name="이메일"
                            value={email}
                            onChange={(e) => {
                                setIsFailed(false);
                                setEmail(e.currentTarget.value);
                            }}
                            maxlength={100}
                            onKeyDownHandler={onKeyDownHandler}
                            placeholder="이메일을 입력해주세요."
                            borderStyle={`flex-1 rounded-none border-b-3 border-buttonborder outline-none focus:outline-none ${
                                isFailed ? "border-warn" : ""
                            }`}
                        />
                        <Input
                            name="비밀번호"
                            value={pw}
                            onChange={(e) => {
                                setIsFailed(false);
                                setPw(e.currentTarget.value);
                            }}
                            onKeyDownHandler={onKeyDownHandler}
                            type="password"
                            placeholder="비밀번호을 입력해주세요."
                            borderStyle={`flex-1 rounded-none border-b-3 border-buttonborder outline-none focus:outline-none ${
                                isFailed ? "border-warn" : ""
                            }`}
                        />
                    </div>
                    <div className="flex w-full justify-end p-8">
                        <Link to={"/login/find-pw"}>
                            <Typography
                                type="SmallLabel"
                                text="비밀번호 찾기"
                                color="text-blue-700 hover:text-blue-900"
                            />
                        </Link>
                    </div>
                    <div className="mt-20 flex-col items-center justify-center">
                        <Button
                            type="BLACK"
                            styles="hover:bg-black/60"
                            isFullBtn={true}
                            onClickHandler={onClickLoginHandler}
                        >
                            <Typography type="Highlight" text="로그인" color="text-white" />
                        </Button>

                        <Link to={"/signup/1"}>
                            <div className="mt-10 flex w-300 justify-center rounded border-2 border-solid border-black p-6 hover:bg-black/10">
                                <Typography type="Highlight" text="회원가입" />
                            </div>
                        </Link>
                        {/* <div className="flex">
                            <div className="mb-10 mr-10 flex w-80 border-b-1 border-solid border-[#A9A9A9]"></div>
                            <div className="flex pt-25 text-sm text-[#555555]">소설 계정으로 로그인</div>
                            <div className="mb-10 ml-10 flex w-80 border-b-1 border-solid border-[#A9A9A9]"></div>
                        </div>
                        <div className="mt-23 flex justify-center gap-30">
                            <button>
                                <img className="flex w-50" src={githubImg} />
                            </button>
                            <button onClick={googleOauthHandler}>
                                <img className="flex w-50" src={googleImg} />
                            </button>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
