import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignLayout from "@container/sign/component/SignLayout";
import Typography from "@component/Typography";
import progress from "@assets/sign/progress_bar2.png";
import SignInput from "./component/SignInput";
import SignButton from "@container/sign/component/SignButton";

function SignUp2() {
    // 컴포넌트 내부에 useState, handleInput 넣기
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
    const navigate = useNavigate();
    const handleClickSignup0 = () => {
        navigate("/signup1");
    };
    const handleClickSignup2 = () => {
        navigate("/signup/3");
    };
    return (
        <SignLayout title="회원가입" subTitle="" progressImage={progress}>
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
                regex={new RegExp(inputs.password)}
                onChange={handleInput}
                description="입력된 비밀번호와 다릅니다."
            />
            <div className="flex justify-center pt-50">
                <SignButton type="OUTLINED" onClickHandler={handleClickSignup0} styles="mr-20">
                    <Typography type="SmallLabel" text="이전" styles="font-bold" />
                </SignButton>
                {/* 다음 페이지로 이동할 수 있게 설정하기*/}
                <SignButton type="FILLED" onClickHandler={handleClickSignup2}>
                    <Typography type="SmallLabel" text="다음" color="text-white" styles="font-bold" />
                </SignButton>
            </div>
        </SignLayout>
    );
}

export default SignUp2;
