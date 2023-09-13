import { useSetRecoilState } from "recoil";
import { authNicknameAtom, authCodeAtom, authCodeForPwAtom, authEmailAtom, authEmailForPwAtom } from "@feature/Global";

import { useToast } from "@hook/useToast";

import { usePostNickname } from "@api/sign/hook";
import { usePostAuthForFindPw, usePostAuthForSignUp, usePostAuthForSignUpAuth } from "@api/auth/hook";
import { useCheckValidValue } from "./useCheckValidValue";

export const useAuthHelper = () => {
    const { fireToast, createToast } = useToast();
    const { isNicknameVaid, isEmailValid } = useCheckValidValue();

    const setAuthEmail = useSetRecoilState(authEmailAtom);
    const setAuthEmailForPw = useSetRecoilState(authEmailForPwAtom);
    const setAuthNickname = useSetRecoilState(authNicknameAtom);
    const setAuthCode = useSetRecoilState(authCodeAtom);
    const setAuthCodeForPw = useSetRecoilState(authCodeForPwAtom);

    const { mutate: postNickname } = usePostNickname();

    // 닉네임 중복 검사 GET 요청 api
    const postCheckNickname = ({ nickname }: { nickname: string }) => {
        if (!nickname || !isNicknameVaid({ nickname })) {
            fireToast({
                content: "닉네임은 2자 이상 8자 이하 공백없는 문자입니다.",
                isConfirm: false,
                isWarning: true,
            });
            setAuthNickname("");
            return;
        }
        postNickname(
            { nickname },
            {
                onSuccess: () => {
                    fireToast({
                        content: `사용 가능한 닉네임입니다!`,
                        isConfirm: false,
                    });
                    setAuthNickname(nickname);
                },
                onError: () => {
                    fireToast({
                        content: `이미 사용하고 있는 닉네임입니다🥹`,
                        isConfirm: false,
                        isWarning: true,
                    });

                    setAuthNickname("");
                },
            },
        );
    };

    const { mutate: postAuthForSignUpAuth } = usePostAuthForSignUpAuth();

    // 이메일 인증 POST 요청 api
    const reqAuthenticateEmail = ({ email }: { email: string }) => {
        if (!email || !isEmailValid({ email })) {
            fireToast({
                content: "이메일 형식이 옳지 않습니다.",
                isConfirm: false,
                isWarning: true,
            });
            return;
        }

        postAuthForSignUpAuth(
            { email: email },
            {
                onSuccess: () => {
                    setAuthEmail(email);
                    fireToast({
                        content: `${email}로 인증코드를 보냈습니다.`,
                        isConfirm: false,
                    });
                },
                onError: () => {
                    createToast({
                        content: "해당 이메일을 가진 유저가 존재합니다. 로그인 화면으로 이동할까요?",
                        isConfirm: true,
                        callback: () => (window.location.href = "/login"),
                    });
                },
            },
        );
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

            return;
        }

        if (!authCode) {
            fireToast({
                content: "인증 코드를 입력해주세요.",
                isConfirm: false,
                isWarning: true,
            });

            return;
        }

        postAuthForSignUp(
            { email, authCode },
            {
                onSuccess: () => {
                    fireToast({
                        content: `이메일 인증에 성공하셨습니다!`,
                        isConfirm: false,
                    });
                    setAuthEmail(email);
                    setAuthCode(authCode);
                },
                onError: () => {
                    fireToast({
                        content: `인증에 실패하였습니다. 다시 입력해주세요!`,
                        isConfirm: false,
                        isWarning: true,
                    });

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

            return;
        }

        if (!authCode) {
            fireToast({
                content: "인증 코드를 입력해주세요.",
                isConfirm: false,
                isWarning: true,
            });

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
                    setAuthEmailForPw(email);
                    setAuthCodeForPw(authCode);
                    window.location.href = "/";
                },
                onError: () => {
                    fireToast({
                        content: `인증에 실패하였습니다. 다시 입력해주세요!`,
                        isConfirm: false,
                        isWarning: true,
                    });

                    setAuthCodeForPw("");
                },
            },
        );
    };

    return { postCheckNickname, reqAuthenticateEmail, postCheckAuthCode, postCheckAuthPw };
};
