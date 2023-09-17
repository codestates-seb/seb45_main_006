import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import { useToast } from "@hook/useToast";
import { usePatchMemberPw } from "@api/member/hook";

import SignInput from "@container/sign/component/SignInput";
import Typography from "@component/Typography";

function UserPw() {
    const [searchParams, setSearchParams] = useSearchParams();
    const auth = searchParams.get("auth") || "";
    const tab = searchParams.get("tab") || "project";

    const { fireToast, errorToast } = useToast();

    const [inputs, setInputs] = useState({
        rawPassword: "",
        password: "",
        passwordRe: "",
    });

    const inputsRegex = {
        password: "^(?=.*[0-9])(?=.*[a-z])(?=.*[$@!%*#?&])[a-z0-9$@!%*#?&]{8,20}$",
        passwordRe: inputs.password,
    };

    const { mutate: patchMemberPw } = usePatchMemberPw();

    const onHandleClick = () => {
        if (inputs.rawPassword === inputs.password) {
            fireToast({
                content: "이전 비밀번호와 변경할 비밀번호를 동일하게 입력하셨습니다.",
                isConfirm: false,
                isWarning: true,
            });
            return;
        }

        const isRawPasswordVaid = new RegExp(inputsRegex.password).test(inputs.rawPassword);
        const isPasswordVaid = new RegExp(inputsRegex.password).test(inputs.password);
        const isPasswordReVaid = new RegExp(inputsRegex.passwordRe).test(inputs.passwordRe);

        if (!isRawPasswordVaid || !isPasswordVaid || !isPasswordReVaid) {
            fireToast({
                content: "형식에 맞지 않는 입력값이 존재합니다.",
                isConfirm: false,
                isWarning: true,
            });
            return;
        }

        patchMemberPw(
            { rawPassword: inputs.rawPassword, changePassword: inputs.password },
            {
                onSuccess: () => {
                    fireToast({
                        content: `비밀번호가 변경되었습니다.`,
                        isConfirm: false,
                    });
                    setSearchParams({ auth, tab, nav: "edit" });
                },
                onError: (err) => errorToast(err),
            },
        );
    };

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setInputs({ ...inputs, [name]: value });
    };

    const linkCss = "bg-tertiary px-8 py-4 hover:bg-light hover:font-bold";

    return (
        <div className="flex flex-1 flex-col items-center rounded-md bg-white p-40 shadow-md">
            <div className="mb-32 min-w-400">
                <SignInput
                    name="rawPassword"
                    label="이전 비밀번호"
                    type="password"
                    value={inputs.rawPassword}
                    onChange={handleInput}
                    placeholder="이전 비밀번호를 입력해주세요."
                />

                <SignInput
                    name="password"
                    label="변경 비밀번호"
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
                <button className={linkCss} onClick={onHandleClick}>
                    <Typography type="SmallLabel" text="변경하기" />
                </button>
            </div>
        </div>
    );
}

export default UserPw;
