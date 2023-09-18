import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { useRecoilState } from "recoil";
import { authCodeAtom, authEmailAtom, authNicknameAtom } from "@feature/Global";

import { useToast } from "@hook/useToast";
import { useCheckValidValue } from "@hook/useCheckValidValue";
import { useAuthHelper } from "@hook/useCheckAuth";
import { useLoginInAndOut } from "@hook/useLogInAndOut";

import { usePostMember } from "@api/sign/hook";

import Typography from "@component/Typography";
import Button from "@component/Button";
import SignLayout from "@container/sign/component/SignLayout";
import SignInput from "@container/sign/component/SignInput";
import SignButton from "@container/sign/component/SignButton";
import EmailGuide from "./component/EmailGuide";

import progress from "@assets/sign/progress_bar2.png";

import { REGEX } from "@hook/useCheckValidValue";

function SignUp2() {
    const [searchParams] = useSearchParams();
    const redirectedEmail = searchParams.get("email");

    const { errorToast, fireToast } = useToast();
    const { mutate: postSignUp } = usePostMember();

    const { alertWhenEmptyFn, isPasswordVaid, isEmailValid, isNicknameVaid } = useCheckValidValue();

    // 사용자 입력값
    const [email, setEmail] = useState(redirectedEmail || "");
    const [nickname, setNickname] = useState("");
    const [authCodeValue, setAuthCodeValue] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRe, setPasswordRe] = useState("");

    // 인증된 입력값
    const [authEmail, setAuthEmail] = useRecoilState(authEmailAtom);
    const [authCode, setAuthCode] = useRecoilState(authCodeAtom);
    const [authNickname, setAuthNickname] = useRecoilState(authNicknameAtom);

    // 인증 요청 여부
    const [isRequestedAuthEmail, setIsRequestedAuthEmail] = useState(false);
    const [isRequestedAuthCode, setIsRequestedAuthCode] = useState(false);
    const [isRequestedNickname, setIsRequestedNickname] = useState(false);

    useEffect(() => {
        if (redirectedEmail) {
            setAuthEmail(redirectedEmail);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [redirectedEmail]);

    const { postCheckNickname, postCheckAuthCode, reqAuthenticateEmail } = useAuthHelper();
    const { onHandleLogin } = useLoginInAndOut();

    const onHandleSignUp = () => {
        if (!authEmail || !authCode) {
            fireToast({ content: "이메일 인증을 진행해주세요.", isConfirm: false, isWarning: true });
            return;
        }

        if (!authNickname) {
            fireToast({ content: "닉네임 중복 검사를 입력해주세요.", isConfirm: false, isWarning: true });
            return;
        }

        const signUpInputs = [
            { name: "비밀번호", content: password },
            { name: "비밀번호 확인", content: passwordRe },
        ];
        const emptyNames = alertWhenEmptyFn(signUpInputs);
        if (emptyNames.length > 0) return;

        if (!isPasswordVaid({ password, passwordRe })) {
            fireToast({
                content: "비밀번호는 영문, 숫자, 특수문자 포함 8 ~ 20자입니다.",
                isConfirm: false,
                isWarning: true,
            });
            return;
        }

        postSignUp(
            { email: email, nickname: nickname, password: password },
            {
                onSuccess: () => {
                    setAuthCode("");
                    setAuthEmail("");
                    setAuthNickname("");
                    onHandleLogin({ email, password, routePath: "/signup/3" });
                },
                onError: (err) => errorToast(err),
            },
        );
    };

    if (authEmail && !redirectedEmail) {
        return (
            <SignLayout title="이메일 인증" subTitle="" progressImage={""}>
                <EmailGuide />
            </SignLayout>
        );
    }

    return (
        <SignLayout title="회원가입" subTitle="" progressImage={progress}>
            <Typography type="Highlight" text="계정정보" styles="ml-4 mb-24" />
            <div className="flex items-center justify-between">
                <SignInput
                    label="이메일"
                    value={email}
                    onChange={(e) => setEmail(e.currentTarget.value)}
                    placeholder="이메일을 입력해주세요."
                    disabled={authEmail.length > 0}
                    regex={REGEX.EMAIL}
                    description="이메일 형식이 맞지 않습니다."
                />

                {!isRequestedAuthEmail && !authEmail && (
                    <Button
                        type="STUDY"
                        styles="px-8 py-6 rounded-sm ml-12 flex flex-col hover:font-bold"
                        onClickHandler={() => {
                            if (!email || !isEmailValid({ email })) {
                                fireToast({ content: "이메일을 형식에 맞게 입력해주세요.", isConfirm: false });
                                return;
                            }
                            setIsRequestedAuthEmail(true);
                            reqAuthenticateEmail({ email });
                        }}
                    >
                        <Typography type="Description" text="인증 요청" styles="min-w-max" color="text-gray-700" />
                    </Button>
                )}
            </div>
            {authEmail && (
                <div className="flex items-center justify-between">
                    <SignInput
                        label="인증코드"
                        value={authCodeValue}
                        onChange={(e) => setAuthCodeValue(e.currentTarget.value)}
                        placeholder="인증코드를 입력해주세요."
                        disabled={authCode.length > 0}
                    />
                    {!isRequestedAuthCode && !authCode && (
                        <Button
                            type="STUDY"
                            styles="px-8 py-6 rounded-sm ml-12 flex flex-col hover:font-bold"
                            onClickHandler={() => {
                                if (!authCodeValue) {
                                    fireToast({ content: "인증번호를 입력해주세요.", isConfirm: false });
                                    return;
                                }
                                setIsRequestedAuthCode(true);
                                postCheckAuthCode({ email: redirectedEmail || "", authCode: authCodeValue });
                            }}
                        >
                            <Typography type="Description" text="인증 확인" styles="min-w-max" color="text-gray-700" />
                        </Button>
                    )}
                </div>
            )}
            <div className="flex items-center justify-between">
                <SignInput
                    label="닉네임"
                    value={nickname}
                    placeholder="닉네임 (공백없이 2자 ~ 8자)"
                    disabled={authNickname.length > 0}
                    onChange={(e) => setNickname(e.currentTarget.value)}
                    description="닉네임 형식이 맞지 않습니다."
                />
                {!isRequestedNickname && authNickname.length === 0 && (
                    <Button
                        type="STUDY"
                        styles={`px-8 py-6 rounded-sm ml-12 flex flex-col hover:font-bold`}
                        onClickHandler={() => {
                            if (!nickname || !isNicknameVaid({ nickname })) {
                                fireToast({ content: "닉네임을 입력해주세요.", isConfirm: false });
                                return;
                            }
                            setIsRequestedNickname(true);
                            postCheckNickname({ nickname });
                        }}
                    >
                        <Typography type="Description" text="중복 확인" styles="min-w-max" color="text-gray-700" />
                    </Button>
                )}
            </div>
            <SignInput
                label="비밀번호"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
                placeholder="비밀번호 (영문, 숫자, 특수문자 포함 8 ~ 20자)"
                regex={REGEX.PASSWORD}
                description="비밀번호 형식이 맞지 않습니다."
            />
            <SignInput
                label="비밀번호 확인"
                type="password"
                value={passwordRe}
                placeholder="비밀번호를 다시 입력해주세요."
                regex={new RegExp(password)}
                onChange={(e) => setPasswordRe(e.currentTarget.value)}
                description="입력된 비밀번호와 다릅니다."
            />
            <div className="flex justify-center pt-20">
                <Link to={"/signup/1"}>
                    <SignButton type="OUTLINED" styles="mr-20">
                        <Typography type="SmallLabel" text="이전" styles="font-bold" />
                    </SignButton>
                </Link>
                <SignButton type="FILLED" onClickHandler={onHandleSignUp}>
                    <Typography type="SmallLabel" text="다음" color="text-white" styles="font-bold" />
                </SignButton>
            </div>
        </SignLayout>
    );
}

export default SignUp2;
