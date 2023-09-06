import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { usePostMember } from "@api/sign/hook";

import Typography from "@component/Typography";
import SignLayout from "@container/sign/component/SignLayout";
import SignInput from "@container/sign/component/SignInput";
import SignButton from "@container/sign/component/SignButton";

import progress from "@assets/sign/progress_bar2.png";

const SignUpContent2 = () => {
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        email: "",
        nickname: "",
        password: "",
        passwordRe: "",
    });

    function handleInput(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) {
        const { name, value } = e.target;

        setInputs({ ...inputs, [name]: value });
    }

    const { mutate: postMember } = usePostMember();

    const createMemberHandler = () => {
        postMember(
            { nickname: inputs.nickname, email: inputs.email, password: inputs.password },
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
                    name="email"
                    label="이메일"
                    type="text"
                    value={inputs.email}
                    onChange={handleInput}
                    placeholder="이메일을 입력해주세요."
                    regex={new RegExp("[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")}
                    description="이메일 형식이 맞지 않습니다."
                />

                <SignInput
                    name="nickname"
                    label="닉네임"
                    type="text"
                    value={inputs.nickname}
                    onChange={handleInput}
                    placeholder="닉네임을 입력해주세요. (2자 ~ 10자)"
                    regex={new RegExp("^[가-힣a-zA-Z0-9].{1,9}$")}
                    description="닉네임 형식이 맞지 않습니다."
                />

                <SignInput
                    name="password"
                    label="비밀번호"
                    type="password"
                    value={inputs.password}
                    onChange={handleInput}
                    placeholder="비밀번호을 입력해주세요. (영문, 숫자 포함 6 ~ 12자)"
                    regex={new RegExp("^(?=.*[a-zA-Z])(?=.*[0-9]).{6,12}$")}
                    description="비밀번호 형식이 맞지 않습니다."
                />

                <SignInput
                    name="passwordRe"
                    label="비밀번호 확인"
                    type="password"
                    value={inputs.passwordRe}
                    placeholder="비밀번호을 입력해주세요."
                    regex={new RegExp(`^${inputs.password}$`)}
                    onChange={handleInput}
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
