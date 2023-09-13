import { isLoggedInAtom } from "@feature/Global";
import { useSetRecoilState } from "recoil";

import { useToast } from "./useToast";
import { usePostLogin } from "@api/sign/hook";
import { setTokenToLocalStorage } from "@util/token-helper";

export const useLoginInAndOut = () => {
    const { mutate: postLogin } = usePostLogin();
    const setIsLoggedIn = useSetRecoilState(isLoggedInAtom);

    const { errorToast } = useToast();

    const onHandleLogin = ({ email, password, routePath }: { email: string; password: string; routePath: string }) => {
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
                    errorToast();
                },
            },
        );
    };

    return { onHandleLogin };
};
