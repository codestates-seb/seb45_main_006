import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { usePostMember } from "@api/sign/hook";

import Typography from "@component/Typography";
import SignInput from "@container/sign/component/SignInput";
import SignButton from "@container/sign/component/SignButton";

import progress from "@assets/sign/progress_bar2.png";
import SignLayout from "./component/SignLayout";

const SignUpContent2 = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState<string>("");
    const [nickname, setNickname] = useState<string>("");
    const [pw, setPw] = useState<string>("");
    const [pwRe, setPwRe] = useState<string>("");

    const { mutate: postMember } = usePostMember();

    const createMemberHandler = () => {
        postMember(
            { nickname, email, password: pw },
            {
                onSuccess: () => {
                    alert("회원가입 완료되었습니다. 로그인 후 서비스를 이용해주세요!");
                    navigate("/logins");
                },
                onError: (err) => {
                    alert(err.message);
                },
            },
        );
    };

    return (
        <>
            <div>
                <Typography type="Highlight" text="계정정보" styles="ml-4 mb-24" />
                <SignInput
                    id="email"
                    label="이메일"
                    type="text"
                    value={email}
                    setValue={setEmail}
                    placeholder="이메일을 입력해주세요."
                    regex={new RegExp("[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")}
                    description="이메일 형식이 맞지 않습니다."
                />

                <SignInput
                    id="nickname"
                    label="닉네임"
                    type="text"
                    value={nickname}
                    setValue={setNickname}
                    placeholder="닉네임을 입력해주세요. (2자 ~ 10자)"
                    regex={new RegExp("^[가-힣a-zA-Z0-9].{1,9}$")}
                    description="닉네임 형식이 맞지 않습니다."
                />

                <SignInput
                    id="password"
                    label="비밀번호"
                    type="password"
                    value={pw}
                    setValue={setPw}
                    placeholder="비밀번호을 입력해주세요. (영문, 숫자 포함 6 ~ 12자)"
                    regex={new RegExp("^(?=.*[a-zA-Z])(?=.*[0-9]).{6,12}$")}
                    description="비밀번호 형식이 맞지 않습니다."
                />

                <SignInput
                    id="passwordRe"
                    label="비밀번호 확인"
                    type="password"
                    value={pwRe}
                    setValue={setPwRe}
                    placeholder="비밀번호을 입력해주세요."
                    regex={new RegExp(pw)}
                    description="입력된 비밀번호와 다릅니다."
                />
            </div>

            <div className="flex justify-center">
                <SignButton type="OUTLINED" onClickHandler={() => {}} styles="mr-20">
                    <Typography type="SmallLabel" text="이전" styles="font-bold" />
                </SignButton>
                <SignButton type="FILLED" onClickHandler={createMemberHandler}>
                    <Typography type="SmallLabel" text="다음" color="text-white" styles="font-bold" />
                </SignButton>
            </div>
        </>
    );
};

function TempSignUp() {
    return (
        <SignLayout title="회원가입" progressImage={progress}>
            <SignUpContent2 />
        </SignLayout>
    );
}

export default TempSignUp;
