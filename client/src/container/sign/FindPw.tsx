import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { useSetRecoilState } from "recoil";
import { authEmailAtom } from "@feature/Global";

import { useToast } from "@hook/useToast";
import { usePostAuthForFindPw } from "@api/auth/hook";
import { useCheckAuth } from "@hook/useCheckAuth";

import SignLayout from "@container/sign/component/SignLayout";
import SignInput from "@container/sign/component/SignInput";
import SignButton from "@container/sign/component/SignButton";
import Typography from "@component/Typography";

// import { getRandomID } from "@util/random-helper";
// import { getItemFromStorage, setItemToStorage } from "@util/localstorage-helper";

const FindPwContent = ({ email }: { email: string }) => {
    const [inputs, setInputs] = useState({
        authCode: "",
        password: "",
        passwordRe: "",
    });

    const inputsRegex = {
        password: "^(?=.*[0-9])(?=.*[a-z])(?=.*[$@!%*#?&])[a-z0-9$@!%*#?&]{8,20}$",
        passwordRe: inputs.password,
    };

    const { getCheckAuthPw } = useCheckAuth();

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setInputs({ ...inputs, [name]: value });
    };

    const onHandleAuthCode = () => {
        getCheckAuthPw({ email: email, authCode: inputs.authCode, changePassword: inputs.password });
    };

    return (
        <div className="flex h-300 flex-col justify-between">
            <div>
                <SignInput
                    name="authCode"
                    label="인증코드"
                    value={inputs.authCode}
                    onChange={handleInput}
                    placeholder="발급된 임시 비밀번호을 입력해주세요."
                />

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
            </div>

            <div className="flex justify-center">
                <SignButton
                    type="FILLED"
                    onClickHandler={() => {
                        // const randomId = getRandomID();
                        // setItemToStorage("randomId", randomId);
                        // 1. randomId를 로컬스토리지에 저장하고 서버에 전달
                        // 2. randomId를 url 뒤 query로 리다이렉션
                        //    ex) /login/find-pw?randomId=1694008589246
                        // 3. 로컬스토리지에 저장된 randomId와 리다이렉션 url query가 일치할 경우에만
                        //    비밀번호 재설정 가능
                        onHandleAuthCode();
                    }}
                >
                    <Typography type="SmallLabel" text="비밀번호 변경" color="text-white" styles="font-bold" />
                </SignButton>
            </div>
        </div>
    );
};

const CompleteEmailAuthenticate = ({ email }: { email: string }) => {
    return (
        <div className="flex h-300 flex-col justify-between">
            <div className="flex flex-col items-center">
                <Typography type="Highlight" text={`${email}로 임시 비밀번호 발급 완료하였습니다.`} />
                <Typography type="Highlight" text="안내에 따라 비밀번호 재설정을 진행해주시기 바랍니다." />
            </div>
        </div>
    );
};

const RequestEmailAuthenticate = ({
    email,
    setEmail,
    onHandleReqAuthForFindPw,
}: {
    email: string;
    setEmail: (v: string) => void;
    onHandleReqAuthForFindPw: () => void;
}) => {
    return (
        <div className="flex h-300 flex-col justify-between">
            <div className="flex flex-col items-center">
                <Typography type="Highlight" text="비밀번호 재설정을 위해 이메일을 입력해주세요." />
                <Typography type="Highlight" text="입력하신 이메일로 임시 비밀번호를 발급해 드립니다." />
            </div>
            <SignInput
                name="email"
                label="이메일"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
                placeholder="이메일을 입력해주세요."
                regex={new RegExp("[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")}
                description="이메일 형식이 맞지 않습니다."
            />

            <div className="flex justify-center">
                <SignButton
                    type="FILLED"
                    onClickHandler={() => {
                        // const randomId = getRandomID();
                        // setItemToStorage("randomId", randomId);
                        // 1. randomId를 로컬스토리지에 저장하고 서버에 전달
                        // 2. randomId를 url 뒤 query로 리다이렉션
                        //    ex) /login/find-pw?randomId=1694008589246
                        // 3. 로컬스토리지에 저장된 randomId와 리다이렉션 url query가 일치할 경우에만
                        //    비밀번호 재설정 가능
                        onHandleReqAuthForFindPw();
                    }}
                >
                    <Typography type="SmallLabel" text="임시 비밀번호 요청" color="text-white" styles="font-bold" />
                </SignButton>
            </div>
        </div>
    );
};

function FindPw() {
    const [searchParams] = useSearchParams();
    const isRedirected = searchParams.get("isRedirected");
    const redirectedEmail = searchParams.get("email");
    // const randomId = getItemFromStorage("randomId");
    // const isAuthenticatedEmail = randomId && searchParams.get("randomId") === randomId;

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [isRequestAuthenticate, setIsRequestAuthenticate] = useState(false);
    const setAuthEmail = useSetRecoilState(authEmailAtom);

    const { fireToast, createToast } = useToast();
    const { mutate: postAuthForFindPw } = usePostAuthForFindPw();

    const onHandleReqAuthForFindPw = () => {
        const isEmailVaid = new RegExp("[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$").test(email);
        if (!email || !isEmailVaid) {
            fireToast({
                content: "이메일 형식이 옳지 않습니다.",
                isConfirm: false,
                isWarning: true,
            });
            return;
        }

        postAuthForFindPw(
            { email: email },
            {
                onSuccess: () => {
                    setIsRequestAuthenticate(true);
                    fireToast({
                        content: `${email}로 인증코드를 보냈습니다.`,
                        isConfirm: false,
                    });
                    setAuthEmail(email);
                },
                onError: () => {
                    setIsRequestAuthenticate(false);
                    createToast({
                        content: "해당 이메일을 가진 유저가 없습니다. 회원가입 페이지로 이동할까요?",
                        isConfirm: true,
                        callback: () => navigate("/signup/1"),
                    });
                    setAuthEmail("");
                },
            },
        );
    };

    if (isRedirected) {
        return (
            <SignLayout title="비밀번호 재설정">
                <FindPwContent email={redirectedEmail || ""} />
            </SignLayout>
        );
    }

    return (
        <SignLayout title="비밀번호 재설정">
            {!isRequestAuthenticate ? (
                <RequestEmailAuthenticate
                    email={email}
                    setEmail={setEmail}
                    onHandleReqAuthForFindPw={onHandleReqAuthForFindPw}
                />
            ) : (
                <CompleteEmailAuthenticate email={email} />
            )}
        </SignLayout>
    );
}

export default FindPw;
