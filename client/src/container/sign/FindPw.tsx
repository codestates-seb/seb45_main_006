import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import { useRecoilValue } from "recoil";
import { authEmailAtom } from "@feature/Global";

import { useAuthHelper } from "@hook/useCheckAuth";

import SignLayout from "@container/sign/component/SignLayout";
import SignInput from "@container/sign/component/SignInput";
import SignButton from "@container/sign/component/SignButton";
import Typography from "@component/Typography";
import EmailGuide from "./component/EmailGuide";

import { REGEX } from "@hook/useCheckValidValue";

// import { getRandomID } from "@util/random-helper";
// import { getItemFromStorage, setItemToStorage } from "@util/localstorage-helper";

const FindPwContent = ({ email }: { email: string }) => {
    const [authCodeValue, setAuthCodeValue] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRe, setPasswordRe] = useState("");

    const { postCheckAuthPw } = useAuthHelper();

    const onHandleAuthCode = () => {
        postCheckAuthPw({ email, authCode: authCodeValue, changePassword: password });
    };

    return (
        <div className="flex h-300 flex-col justify-between">
            <div>
                <SignInput
                    name="authCode"
                    type="password"
                    label="현재 비밀번호"
                    value={authCodeValue}
                    onChange={(e) => setAuthCodeValue(e.currentTarget.value)}
                    placeholder="발급된 임시 비밀번호을 입력해주세요."
                />

                <SignInput
                    name="password"
                    label="변경 비밀번호"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.currentTarget.value)}
                    placeholder="비밀번호 (영문, 숫자, 특수문자 포함 8 ~ 20자)"
                    regex={REGEX.PASSWORD}
                    description="비밀번호 형식이 맞지 않습니다."
                />

                <SignInput
                    name="passwordRe"
                    label="비밀번호 확인"
                    type="password"
                    value={passwordRe}
                    placeholder="비밀번호를 다시 입력해주세요."
                    regex={new RegExp(password)}
                    onChange={(e) => setPasswordRe(e.currentTarget.value)}
                    description="입력된 비밀번호와 다릅니다."
                />
            </div>

            <div className="flex justify-center">
                <SignButton type="FILLED" onClickHandler={() => onHandleAuthCode()}>
                    <Typography type="SmallLabel" text="비밀번호 변경" color="text-white" styles="font-bold" />
                </SignButton>
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
    const authEmail = useRecoilValue(authEmailAtom);
    // const randomId = getItemFromStorage("randomId");

    const [email, setEmail] = useState("");
    const { reqAuthenticateEmail } = useAuthHelper();

    if (isRedirected) {
        return (
            <SignLayout title="비밀번호 재설정">
                <FindPwContent email={redirectedEmail || ""} />
            </SignLayout>
        );
    }

    return (
        <SignLayout title="비밀번호 재설정">
            {!authEmail ? (
                <RequestEmailAuthenticate
                    email={email}
                    setEmail={setEmail}
                    onHandleReqAuthForFindPw={() => reqAuthenticateEmail({ email })}
                />
            ) : (
                <EmailGuide />
            )}
        </SignLayout>
    );
}

export default FindPw;
