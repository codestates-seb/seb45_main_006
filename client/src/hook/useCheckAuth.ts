import { useState, useEffect } from "react";

import { useSetRecoilState } from "recoil";
import { authNicknameAtom, authCodeAtom, authCodeForPwAtom } from "@feature/Global";

import { useGetNicknameDuplicated } from "@api/sign/hook";
import { usePostAuthForFindPw, usePostAuthForSignUp } from "@api/auth/hook";

import { useToast } from "@hook/useToast";

export const useCheckAuth = () => {
    const { fireToast } = useToast();

    const setAuthNickname = useSetRecoilState(authNicknameAtom);
    const setAuthCode = useSetRecoilState(authCodeAtom);
    const setAuthCodeForPw = useSetRecoilState(authCodeForPwAtom);

    const [authenticatedNickname, setAuthenticatedNickname] = useState("");
    const [authenticatedCode, setAuthenticatedCode] = useState("");

    const { isError: isNicknameError, isSuccess: isNicknameVaid } = useGetNicknameDuplicated({
        nickname: authenticatedNickname,
    });

    // 닉네임 중복 결과 - useEffect
    useEffect(() => {
        if (isNicknameVaid) {
            fireToast({
                content: `사용 가능한 닉네임입니다!`,
                isConfirm: false,
            });
            setAuthNickname(authenticatedNickname);
        }

        if (isNicknameError) {
            fireToast({
                content: `이미 사용하고 있는 닉네임입니다🥹`,
                isConfirm: false,
                isWarning: true,
            });
            setAuthenticatedNickname("");
            setAuthNickname("");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isNicknameError, isNicknameVaid]);

    // 닉네임 중복 검사 GET 요청 api
    const getCheckNickname = ({ nickname }: { nickname: string }) => {
        const isNicknameVaid = new RegExp("^[^s]{2,8}$").test(nickname);

        if (!nickname || !isNicknameVaid) {
            fireToast({
                content: "닉네임을 입력해주세요.",
                isConfirm: false,
                isWarning: true,
            });
            setAuthNickname("");
            return;
        }

        setAuthenticatedNickname(nickname);
    };

    const { mutate: postAuthForSignUp } = usePostAuthForSignUp();

    // 이메일 인증 요청 결과 POST 요청 api
    const postCheckAuthCode = ({ email, authCode }: { email: string; authCode: string }) => {
        if (!email) {
            fireToast({
                content: "인증 요청된 이메일이 없습니다.",
                isConfirm: false,
                isWarning: true,
            });
            setAuthenticatedCode("");
            return;
        }

        if (!authCode) {
            fireToast({
                content: "인증 코드를 입력해주세요.",
                isConfirm: false,
                isWarning: true,
            });
            setAuthenticatedCode("");
            return;
        }

        setAuthenticatedCode(authCode);

        postAuthForSignUp(
            { email, authCode },
            {
                onSuccess: () => {
                    fireToast({
                        content: `이메일 인증에 성공하셨습니다!`,
                        isConfirm: false,
                    });
                    setAuthCode(authenticatedCode);
                },
                onError: () => {
                    fireToast({
                        content: `인증에 실패하였습니다. 다시 입력해주세요!`,
                        isConfirm: false,
                        isWarning: true,
                    });
                    setAuthenticatedCode("");
                    setAuthCode("");
                },
            },
        );
    };

    const { mutate: postAuthForFindPw } = usePostAuthForFindPw();

    // 비밀번호 재설정 요청 결과 GET 요청 api
    const postCheckAuthPw = ({
        email,
        authCode,
        changePassword,
    }: {
        email: string;
        authCode: string;
        changePassword: string;
    }) => {
        if (!email) {
            fireToast({
                content: "인증 요청된 이메일이 없습니다.",
                isConfirm: false,
                isWarning: true,
            });
            setAuthenticatedCode("");
            return;
        }

        if (!authCode) {
            fireToast({
                content: "인증 코드를 입력해주세요.",
                isConfirm: false,
                isWarning: true,
            });
            setAuthenticatedCode("");
            return;
        }

        const isRawPasswordVaid = new RegExp("^(?=.*[0-9])(?=.*[a-z])(?=.*[$@!%*#?&])[a-z0-9$@!%*#?&]{8,20}$").test(
            changePassword,
        );
        if (!isRawPasswordVaid) {
            fireToast({
                content: "비밀번호는 영문, 숫자, 특수문자 포함 8자 ~ 20자로 작성부탁드립니다.",
                isConfirm: false,
                isWarning: true,
            });
            return;
        }

        postAuthForFindPw(
            { email, authCode, changePassword },
            {
                onSuccess: () => {
                    fireToast({
                        content: `비밀번호 재설정에 성공하셨습니다! 다시 로그인해주세요!`,
                        isConfirm: false,
                    });
                    setAuthCodeForPw(authenticatedCode);
                    window.location.href = "/";
                },
                onError: () => {
                    fireToast({
                        content: `인증에 실패하였습니다. 다시 입력해주세요!`,
                        isConfirm: false,
                        isWarning: true,
                    });
                    setAuthenticatedCode("");
                    setAuthCodeForPw("");
                },
            },
        );
    };

    return { getCheckNickname, postCheckAuthCode, postCheckAuthPw };
};
