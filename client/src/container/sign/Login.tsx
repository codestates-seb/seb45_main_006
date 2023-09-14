import Typography from "@component/Typography";

import SignInput from "@container/sign/component/SignInput";
import { authCodeAtom, authEmailAtom, authNicknameAtom } from "@feature/Global";
import Button from "@component/Button";
import { useRecoilState } from "recoil";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useToast } from "@hook/useToast";

import { useAuthHelper } from "@hook/useCheckAuth";
import { usePostMember } from "@api/sign/hook";
import { Link } from "react-router-dom";
import googleImg from "@assets/sign/login_google.png";
import githubImg from "@assets/sign/login_github.png";

function Login() {
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
                    <div className="mt-50 flex-col">
                        <input
                            className="mb-30 flex w-300 border-b-2 border-buttonborder"
                            placeholder="이메일을 입력해주세요."
                        ></input>
                        <input
                            className="flex w-300 border-b-2 border-buttonborder"
                            placeholder="비밀번호를 입력해주세요."
                        ></input>
                    </div>
                    <div className="mt-30 flex-col items-center justify-center">
                        <Link to={"/"}>
                            <a className="flex w-300 justify-center rounded bg-black p-8">
                                <Typography type="Highlight" text="로그인" color="text-white" />
                            </a>
                        </Link>
                        <Link to={"/signup/1"}>
                            <a className="mt-10 flex w-300 justify-center rounded border-2 border-solid border-black p-6">
                                <Typography type="Highlight" text="회원가입" />
                            </a>
                        </Link>
                        <div className="flex">
                            <div className="mb-10 mr-10 flex w-80 border-b-1 border-solid border-[#A9A9A9]"></div>
                            <div className="flex pt-25 text-sm text-[#555555]">소설 계정으로 로그인</div>
                            <div className="mb-10 ml-10 flex w-80 border-b-1 border-solid border-[#A9A9A9]"></div>
                        </div>
                    <div className="mt-23 gap-30 flex justify-center">
                        <Link to={"/"}>
                            <img className="flex w-50" src={githubImg} />
                        </Link>
                        <Link to={"/"}>
                            <img className="flex w-50" src={googleImg} />
                        </Link>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
