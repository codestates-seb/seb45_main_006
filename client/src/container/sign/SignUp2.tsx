/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import { useToast } from "@hook/useToast";
import { useCheckEmptyInput } from "@hook/useCheckEmptyInput";

import { usePostMember, useGetNicknameDuplicated } from "@api/sign/hook";
import { usePostAuthForSignUp, useGetAuthForSignUp } from "@api/auth/hook";

import Typography from "@component/Typography";
import Button from "@component/Button";
import SignLayout from "@container/sign/component/SignLayout";
import SignInput from "@container/sign/component/SignInput";
import SignButton from "@container/sign/component/SignButton";

import progress from "@assets/sign/progress_bar2.png";

function SignUp2() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const redirectedEmail = searchParams.get("email");

    useEffect(() => {
        if (redirectedEmail) {
            setIsRequestAuthenticate(true);
            setAuthenticatedEmail(redirectedEmail);
        }
    }, [redirectedEmail])

    const { errorToast, fireToast, createToast } = useToast();
    const { mutate: postSignUp } = usePostMember();
    const { mutate: postAuthForSignUp } = usePostAuthForSignUp();
    const { alertWhenEmptyFn } = useCheckEmptyInput();

    // 컴포넌트 내부에 useState, handleInput 넣기
    const [inputs, setInputs] = useState({
        email: "",
        nickname: "",
        authCode: "",
        password: "",
        passwordRe: "",
    });

    const inputsRegex = {
        email: "[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$",
        nickname: "^[^s]{2,8}$",
        password: "^(?=.*[0-9])(?=.*[a-z])(?=.*[$@!%*#?&])[a-z0-9$@!%*#?&]{8,20}$",
        passwordRe: inputs.password,
    };

    const [isRequestAuthenticate, setIsRequestAuthenticate] = useState(false);
    const [authenticatedEmail, setAuthenticatedEmail] = useState("");
    const [authenticatedNickname, setAuthenticatedNickname] = useState("");

    const {
        refetch: getAuthForSignUp,
        isFetched: isSuccessGetAuthForSignUp,
        isError: isErrorGetAuthForSignUp,
    } = useGetAuthForSignUp({ email: inputs.email, authCode: inputs.authCode });

    const {
        refetch: getNicknameDuplicated,
        isFetched: isSuccessGetNicknameDuplicated,
        isError: isErrorGetNicknameDuplicated,
    } = useGetNicknameDuplicated({ nickname: inputs.nickname });

    const handleInput = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
    };

    const onHandleSignUp = () => {
        if (!isRequestAuthenticate) {
            fireToast({
                content: "이메일 인증을 진행해주세요.",
                isConfirm: false,
                isWarning: true,
            });
            return;
        }

        if (!authenticatedEmail) {
            fireToast({
                content: "이메일 인증코드를 입력해주세요.",
                isConfirm: false,
                isWarning: true,
            });
            return;
        }

        if (!authenticatedNickname) {
            fireToast({
                content: "닉네임 중복 검사를 입력해주세요.",
                isConfirm: false,
                isWarning: true,
            });
            return;
        }

        const isEmailVaid = new RegExp(inputsRegex.email).test(inputs.email);
        const isNicknameVaid = new RegExp(inputsRegex.nickname).test(inputs.nickname);
        const isPasswordVaid = new RegExp(inputsRegex.password).test(inputs.password);
        const isPasswordReVaid = new RegExp(inputsRegex.passwordRe).test(inputs.passwordRe);

        if (!isEmailVaid || !isNicknameVaid || !isPasswordVaid || !isPasswordReVaid) {
            fireToast({
                content: "형식에 맞지 않는 입력값이 존재합니다.",
                isConfirm: false,
                isWarning: true,
            });
            return;
        }

        const signUpInputs = [
            { name: "이메일", content: inputs.email },
            { name: "인증코드", content: inputs.authCode },
            { name: "닉네임", content: inputs.nickname },
            { name: "비밀번호", content: inputs.password },
            { name: "비밀번호 확인", content: inputs.passwordRe },
        ];
        const emptyNames = alertWhenEmptyFn(signUpInputs);

        if (emptyNames.length === 0) {
            postSignUp(
                { email: inputs.email, nickname: inputs.nickname, password: inputs.password },
                {
                    onSuccess: () => {
                        navigate("/signup/3");
                    },
                    onError: (err) => {
                        console.log(err);
                        errorToast();
                    },
                },
            );
        }
    };

    const onHandleReqAuthForSignUp = () => {
        const isEmailVaid = new RegExp(inputsRegex.email).test(inputs.email);
        if (!inputs.email || !isEmailVaid) {
            fireToast({
                content: "이메일 형식이 옳지 않습니다.",
                isConfirm: false,
                isWarning: true,
            });
            return;
        }

        postAuthForSignUp(
            { email: inputs.email },
            {
                onSuccess: () => {
                    setIsRequestAuthenticate(true);
                    fireToast({
                        content: `${inputs.email}로 인증코드를 보냈습니다.`,
                        isConfirm: false,
                    });
                },
                onError: () => {
                    setIsRequestAuthenticate(false);
                    createToast({
                        content: "해당 이메일을 가진 유저가 존재합니다. 로그인 화면으로 이동할까요?",
                        isConfirm: true,
                        callback: () => navigate("/login"),
                    });
                },
            },
        );
    };

    const onHandleAuthCode = () => {
        if (!inputs.authCode) {
            fireToast({
                content: "인증코드를 입력해주세요.",
                isConfirm: false,
                isWarning: true,
            });
            return;
        }

        getAuthForSignUp();

        if (isSuccessGetAuthForSignUp) {
            setAuthenticatedEmail(inputs.email);
            fireToast({
                content: `인증에 성공하였습니다!`,
                isConfirm: false,
            });
        }

        if (isErrorGetAuthForSignUp) {
            setAuthenticatedEmail("");
            fireToast({
                content: `인증에 실패하였습니다. 다시 입력해주세요!`,
                isConfirm: false,
                isWarning: true,
            });
        }
    };

    const onHandleNicknameDuplicated = () => {
        const isNicknameVaid = new RegExp(inputsRegex.nickname).test(inputs.nickname);

        if (!inputs.nickname || !isNicknameVaid) {
            fireToast({
                content: "닉네임을 입력해주세요.",
                isConfirm: false,
                isWarning: true,
            });
            return;
        }

        getNicknameDuplicated();

        if (isSuccessGetNicknameDuplicated) {
            setAuthenticatedNickname(inputs.email);
            fireToast({
                content: `사용 가능한 닉네임입니다!`,
                isConfirm: false,
            });
        }

        if (isErrorGetNicknameDuplicated) {
            setAuthenticatedNickname("");
            fireToast({
                content: `이미 사용하고 있는 닉네임입니다🥹`,
                isConfirm: false,
                isWarning: true,
            });
        }
    };

    return (
        <SignLayout title="회원가입" subTitle="" progressImage={progress}>
            <Typography type="Highlight" text="계정정보" styles="ml-4 mb-24" />
            <div className="flex items-center justify-between">
                <SignInput
                    name="email"
                    label="이메일"
                    type="text"
                    value={inputs.email}
                    onChange={handleInput}
                    placeholder="이메일을 입력해주세요."
                    disabled={isRequestAuthenticate}
                    regex={new RegExp(inputsRegex.email)}
                    description="이메일 형식이 맞지 않습니다."
                />

                <Button
                    type={isRequestAuthenticate ? "DISABLED" : "STUDY"}
                    styles={`px-8 py-6 rounded-sm ml-12 flex flex-col ${
                        authenticatedEmail.length > 0 ? "" : "hover:font-bold"
                    }`}
                    onClickHandler={onHandleReqAuthForSignUp}
                >
                    <Typography type="Description" text="인증 요청" styles="min-w-max" color="text-gray-700" />
                </Button>
            </div>
            {isRequestAuthenticate && (
                <>
                    <div className="mb-4 ml-90 flex items-center justify-between">
                        <Typography
                            type="Description"
                            text="혹시 이메일을 잘못 입력하셨다면?"
                            styles="min-w-max"
                            color="text-gray-700"
                        />
                        <button
                            onClick={() => {
                                setIsRequestAuthenticate(false);
                                setAuthenticatedEmail("");
                            }}
                        >
                            <Typography
                                type="Description"
                                text="이메일 재입력"
                                styles="min-w-max"
                                color="text-blue-500 hover:text-blue-700"
                            />
                        </button>
                    </div>
                    <div className="flex items-center justify-between">
                        <SignInput
                            name="authCode"
                            label="인증코드"
                            type="text"
                            value={inputs.authCode}
                            onChange={handleInput}
                            placeholder="인증코드를 입력해주세요."
                            disabled={authenticatedEmail.length > 0}
                        />
                        <Button
                            type={authenticatedEmail.length > 0 ? "DISABLED" : "STUDY"}
                            styles={`px-8 py-6 rounded-sm ml-12 flex flex-col ${
                                authenticatedEmail.length > 0 ? "" : "hover:font-bold"
                            }`}
                            onClickHandler={onHandleAuthCode}
                        >
                            <Typography type="Description" text="인증 확인" styles="min-w-max" color="text-gray-700" />
                        </Button>
                    </div>
                </>
            )}
            <div className="flex items-center justify-between">
                <SignInput
                    name="nickname"
                    label="닉네임"
                    type="text"
                    value={inputs.nickname}
                    onChange={handleInput}
                    placeholder="닉네임 (공백없이 2자 ~ 8자)"
                    disabled={authenticatedNickname.length > 0}
                    regex={new RegExp(inputsRegex.nickname)}
                    description="닉네임 형식이 맞지 않습니다."
                />
                <Button
                    type={authenticatedNickname.length > 0 ? "DISABLED" : "STUDY"}
                    styles={`px-8 py-6 rounded-sm ml-12 flex flex-col ${
                        authenticatedEmail.length > 0 ? "" : "hover:font-bold"
                    }`}
                    onClickHandler={onHandleNicknameDuplicated}
                >
                    <Typography type="Description" text="중복 확인" styles="min-w-max" color="text-gray-700" />
                </Button>
            </div>
            <SignInput
                name="password"
                label="비밀번호"
                type="password"
                value={inputs.password}
                onChange={handleInput}
                placeholder="비밀번호 (영문, 숫자, 특수문자 포함 8 ~ 20자)"
                regex={new RegExp(inputsRegex.password)}
                description="비밀번호 형식이 맞지 않습니다."
            />
            <SignInput
                name="passwordRe"
                label="비밀번호 확인"
                type="password"
                value={inputs.passwordRe}
                placeholder="비밀번호를 다시 입력해주세요."
                regex={new RegExp(inputsRegex.passwordRe)}
                onChange={handleInput}
                description="입력된 비밀번호와 다릅니다."
            />
            <div className="flex justify-center pt-20">
                <Link to = {"/signup/1"}>
                    <SignButton type="OUTLINED" styles="mr-20">
                        <Typography type="SmallLabel" text="이전" styles="font-bold" />
                    </SignButton>
                </Link>
                <Link to = {"/signup/3"}>
                    <SignButton type="FILLED">
                        <Typography type="SmallLabel" text="다음" color="text-white" styles="font-bold" />
                    </SignButton>
                </Link>
            </div>
        </SignLayout>
    );
}

export default SignUp2;
