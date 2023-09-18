import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import SignLayout from "@container/sign/component/SignLayout";
import { setItemToStorage } from "@util/localstorage-helper";

import { parseJwt } from "@util/token-helper";

function OauthUser() {
    const navigate = useNavigate();

    useEffect(() => {
        console.log("!!!", new URL(location.href));
        // 1. 전달받은 정보 확인 -> 존재하는 정보 로컬스토리지에 저장
        const accessToken = new URL(location.href).searchParams.get("access_token");
        const refreshToken = new URL(location.href).searchParams.get("refresh_token");
        const memberId = new URL(location.href).searchParams.get("memberId");
        const nickname = new URL(location.href).searchParams.get("nickname");

        setItemToStorage("accessToken", accessToken?.split(" ")[1]);
        setItemToStorage("refreshToken", refreshToken);
        if (accessToken) {
            setItemToStorage("email", parseJwt(accessToken).username);
        }
        if (memberId) {
            setItemToStorage("memberId", Number.parseInt(memberId));
            setItemToStorage("memberType", "OAUTH2");
        }

        if (nickname) {
            setItemToStorage("nickname", nickname);
            setTimeout(() => {
                navigate("/");
            }, 500);
        } else {
            setItemToStorage("nickname", nickname);
            setTimeout(() => {
                navigate("/setpro/oauth");
            }, 500);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <SignLayout title="Google Oauth 회원가입/로그인">
            <div className="flex h-300 items-start justify-center">
                <p>처리 중입니다 ...</p>
            </div>
        </SignLayout>
    );
}

export default OauthUser;
