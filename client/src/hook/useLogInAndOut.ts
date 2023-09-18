import { isLoggedInAtom, isLoginFailedAtom } from "@feature/Global";
import { useSetRecoilState } from "recoil";

import { useToast } from "./useToast";
import { usePostLogin, useDeleteLogout } from "@api/sign/hook";
import { setTokenToLocalStorage } from "@util/token-helper";
import { clearStorage } from "@util/localstorage-helper";

export const useLoginInAndOut = () => {
    const { mutate: postLogin } = usePostLogin();
    const setIsLoggedIn = useSetRecoilState(isLoggedInAtom);
    const setIsFailed = useSetRecoilState(isLoginFailedAtom);

    const { fireToast } = useToast();

    const onHandleLogin = ({ email, password, routePath }: { email: string; password: string; routePath: string }) => {
        if (!email || !password) {
            fireToast({
                content: "이메일과 비밀번호를 입력해주세요.",
                isConfirm: false,
                isWarning: true,
            });
            return;
        }

        postLogin(
            { email, password },
            {
                onSuccess: (res) => {
                    const { authorization, refresh } = res.headers;
                    if (!authorization || !refresh) {
                        return Promise.reject("로그인에 실패하였습니다.");
                    }

                    setTokenToLocalStorage({
                        accessToken: authorization.split(" ")[1],
                        refreshToken: refresh || "",
                        memberId: res.data.memberId,
                    });

                    setIsLoggedIn(true);
                    window.location.href = routePath;
                },
                onError: (err) => {
                    console.log(err);
                    fireToast({
                        content: "로그인에 실패하였습니다.",
                        isConfirm: false,
                        isWarning: true,
                    });
                    setIsFailed(true);
                },
            },
        );
    };

    const { mutate: deleteLogout } = useDeleteLogout();

    const onHandleLogout = ({ email }: { email: string }) => {
        clearStorage();
        setIsLoggedIn(false);
        deleteLogout({ email });
    };

    return { onHandleLogin, onHandleLogout };
};
