import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Typography from "@component/Typography";
import Button from "@component/Button";

import IconPeople from "@assets/icon_people.png";

import { usePostMember } from "@api/sign/hook";

type ISignUpInput = {
    id: string;
    label: string;
    type: string;
    value: string;
    placeholder: string;
    setValue: (s: string) => void;
};

// TODO: 컴포넌트 안의 컴포넌트는 매번 렌더링될 때마다 같이 또 업데이트?!
// 링크: https://stackoverflow.com/questions/42573017/in-react-es6-why-does-the-input-field-lose-focus-after-typing-a-character
const SignUpInput = ({ id, label, type, value, setValue, placeholder }: ISignUpInput) => {
    return (
        <div className="mb-24 flex">
            <div className="w-100 p-4">
                <Typography type="Highlight" text={label} />
            </div>
            <input
                key={id}
                type={type}
                autoComplete="new-password"
                value={value}
                onChange={(e) => setValue(e.currentTarget.value)}
                placeholder={placeholder}
                className="ml-16 w-350 border-b-1 border-borderline p-4 text-sm"
            />
        </div>
    );
};

function TempSignUp() {
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
        <div className="flex h-full w-full items-center justify-center bg-background">
            <div className="relative flex h-400 w-500 flex-col rounded-xl bg-white p-10">
                <img src={IconPeople} alt="사람 도트 이미지" className="absolute -top-56 left-0" />
                <div className="my-24 text-center">
                    <Typography type="Label" text="회원가입" />
                </div>

                <SignUpInput
                    id="email"
                    label="이메일"
                    type="text"
                    value={email}
                    setValue={setEmail}
                    placeholder="이메일을 입력해주세요."
                />

                <SignUpInput
                    id="nickname"
                    label="닉네임"
                    type="text"
                    value={nickname}
                    setValue={setNickname}
                    placeholder="닉네임을 입력해주세요. (2자 ~ 10자)"
                />

                <SignUpInput
                    id="password"
                    label="비밀번호"
                    type="password"
                    value={pw}
                    setValue={setPw}
                    placeholder="비밀번호을 입력해주세요. (영문, 숫자 포함 6 ~ 12자)"
                />

                <SignUpInput
                    id="passwordRe"
                    label="비밀번호 확인"
                    type="password"
                    value={pwRe}
                    setValue={setPwRe}
                    placeholder="비밀번호을 입력해주세요."
                />

                <div className="mt-20 flex justify-center">
                    <Button
                        type="PROJECT"
                        isFullBtn={false}
                        onClickHandler={() => {
                            console.log(email, nickname, pw, pwRe);
                            createMemberHandler();
                        }}
                    >
                        <Typography type="Label" text="회원가입" />
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default TempSignUp;
