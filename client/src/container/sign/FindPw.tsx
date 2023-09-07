import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import SignLayout from "@container/sign/component/SignLayout";
import SignInput from "@container/sign/component/SignInput";
import SignButton from "@container/sign/component/SignButton";
import Typography from "@component/Typography";

import { getRandomID } from "@util/random-helper";
import { getItemFromStorage, setItemToStorage } from "@util/localstorage-helper";

const FindPwContent = () => {
    // const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        tempPassword: "",
        password: "",
        passwordRe: "",
    });

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setInputs({ ...inputs, [name]: value });
    };

    return (
        <div className="flex h-300 flex-col justify-between">
            <div>
                <SignInput
                    name="tempPassword"
                    label="임시 비밀번호"
                    type="password"
                    value={inputs.password}
                    onChange={handleInput}
                    placeholder="발급된 임시 비밀번호을 입력해주세요."
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
                <SignButton
                    type="FILLED"
                    onClickHandler={() => {
                        const randomId = getRandomID();
                        setItemToStorage("randomId", randomId);
                        // 1. randomId를 로컬스토리지에 저장하고 서버에 전달
                        // 2. randomId를 url 뒤 query로 리다이렉션
                        //    ex) /login/find-pw?randomId=1694008589246
                        // 3. 로컬스토리지에 저장된 randomId와 리다이렉션 url query가 일치할 경우에만
                        //    비밀번호 재설정 가능
                        console.log(randomId);
                    }}
                >
                    <Typography type="SmallLabel" text="비밀번호 변경" color="text-white" styles="font-bold" />
                </SignButton>
            </div>
        </div>
    );
};

const RequestEmailAuthenticate = () => {
    const [email, setEmail] = useState("");

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
                        const randomId = getRandomID();
                        setItemToStorage("randomId", randomId);
                        // 1. randomId를 로컬스토리지에 저장하고 서버에 전달
                        // 2. randomId를 url 뒤 query로 리다이렉션
                        //    ex) /login/find-pw?randomId=1694008589246
                        // 3. 로컬스토리지에 저장된 randomId와 리다이렉션 url query가 일치할 경우에만
                        //    비밀번호 재설정 가능
                        console.log(randomId);
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
    const randomId = getItemFromStorage("randomId");
    const isAuthenticatedEmail = randomId && searchParams.get("randomId") === randomId;

    return (
        <SignLayout title="비밀번호 재설정">
            {!isAuthenticatedEmail ? <RequestEmailAuthenticate /> : <FindPwContent />}
        </SignLayout>
    );
}

export default FindPw;
