import { useToast } from "./useToast";

export const REGEX = {
    EMAIL: new RegExp("[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"),
    NICKNAME: new RegExp("^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,9}$"),
    PASSWORD: new RegExp("^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[$@!%*#?&])[a-zA-Z0-9$@!%*#?&]{8,20}$"),
} as const;

type InputSummary = {
    name: string;
    content: string | number;
};

export const useCheckValidValue = () => {
    const { fireToast } = useToast();

    const alertWhenEmptyFn = (inputs: Array<InputSummary>) => {
        const emptyNames: Array<string> = [];
        inputs.forEach((v) => {
            if (!v.content) {
                emptyNames.push(v.name);
            }
        });

        if (emptyNames.length !== 0) {
            fireToast({
                content: `${emptyNames.join(", ")}은/는 필수 입력값입니다!`,
                isConfirm: false,
                isWarning: true,
            });
        }

        return emptyNames;
    };

    const isEmailValid = ({ email }: { email: string }) => {
        return REGEX.EMAIL.test(email);
    };

    const isNicknameVaid = ({ nickname }: { nickname: string }) => {
        return REGEX.NICKNAME.test(nickname);
    };

    const isPasswordVaid = ({ password, passwordRe }: { password: string; passwordRe: string }) => {
        return REGEX.PASSWORD.test(password) && new RegExp(password).test(passwordRe);
    };

    const isAllValid = ({
        email,
        nickname,
        password,
        passwordRe,
    }: {
        email: string;
        nickname: string;
        password: string;
        passwordRe: string;
    }) => {
        return isEmailValid({ email }) && isNicknameVaid({ nickname }) && isPasswordVaid({ password, passwordRe });
    };

    return { isEmailValid, isNicknameVaid, isPasswordVaid, isAllValid, alertWhenEmptyFn };
};
