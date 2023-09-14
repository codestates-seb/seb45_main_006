import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useRecoilState } from "recoil";
import { rawPasswordAtom } from "@feature/Global";

import { usePostLogin } from "@api/sign/hook";
import { useToast } from "@hook/useToast";

import Typography from "@component/Typography";
import SignInput from "@container/sign/component/SignInput";

import { getItemFromStorage, setItemToStorage } from "@util/localstorage-helper";
import { getRandomIDNotTracing } from "@util/random-helper";

function AuthUser() {
    const navigate = useNavigate();

    const [rawPassword, setRawPassword] = useRecoilState(rawPasswordAtom);
    const linkCss = "bg-tertiary px-8 py-4 hover:bg-light hover:font-bold";

    const { mutate: authUser } = usePostLogin();
    const { reqLoginToUserToast, fireToast } = useToast();

    const onClickAuth = () => {
        const email = getItemFromStorage("email");
        const password = rawPassword;

        const randomId = getRandomIDNotTracing();
        setItemToStorage("randomId", randomId);

        authUser(
            { email, password },
            {
                onSuccess: () => {
                    setRawPassword("");
                    navigate(`/members/my?auth=${randomId}&nav=edit`);
                },
                onError: () => {
                    fireToast({
                        content: "틀린 비밀번호를 입력하셨습니다. 다시 시도해주세요.",
                        isConfirm: false,
                        isWarning: true,
                    });
                },
            },
        );
    };

    useEffect(() => {
        const email = getItemFromStorage("email");

        if (!email) {
            reqLoginToUserToast();
            navigate("/");
            return;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="flex justify-center bg-background">
            <div className="flex w-11/12 justify-center p-20">
                <div className="flex w-full max-w-500 flex-col items-center bg-white p-20">
                    <Typography
                        type="Highlight"
                        text="나의 정보를 조회 / 수정하기 위해 비밀번호를 입력해주세요."
                        styles="mb-80"
                    />
                    <Typography type="SmallLabel" text="고객님의 정보를 보호하기 위한 방안입니다." styles="mb-8" />
                    <Typography
                        type="SmallLabel"
                        text="본인 확인을 위해 현재 사용하고 있는 비밀번호를 한번 더 입력해주세요."
                        styles="mb-80"
                    />

                    <div className="mb-32 max-w-300">
                        <SignInput
                            label="비밀번호"
                            type="password"
                            placeholder="비밀번호를 입력해주세요."
                            value={rawPassword}
                            onChange={(e) => setRawPassword(e.currentTarget.value)}
                        />
                    </div>

                    <button className={linkCss} onClick={onClickAuth}>
                        <Typography type="SmallLabel" text="확인하기" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AuthUser;
