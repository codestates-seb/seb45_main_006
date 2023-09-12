import { AxiosError } from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";

import {
    PostReqAuthForSignUp,
    GetReqAuthForSignUp,
    PostReqAuthForFindPw,
    GetReqAuthForFindPw,
} from "@type/auth/auth.req.dto";
import { AuthCommonRes } from "@type/auth/auth.res.dto";
import { postAuthForSignUp, getAuthForSignUp, postAuthForFindPw, getAuthForFindPw } from "./api";

// 이메일 인증 요청 - 회원가입
export const usePostAuthForSignUp = () => {
    return useMutation<AuthCommonRes, AxiosError, PostReqAuthForSignUp>(postAuthForSignUp);
};

// 이메일 인증 확인 - 회원가입
export const useGetAuthForSignUp = ({ email, authCode }: GetReqAuthForSignUp) => {
    return useQuery<AuthCommonRes, AxiosError, AuthCommonRes, [string, GetReqAuthForSignUp]>({
        queryKey: ["auth", { email, authCode }],
        queryFn: () => getAuthForSignUp({ email, authCode }),
        enabled: !!authCode,
    });
};

// 이메일 인증 요청 - 비밀번호 찾기
export const usePostAuthForFindPw = () => {
    return useMutation<AuthCommonRes, AxiosError, PostReqAuthForFindPw>(postAuthForFindPw);
};

// 이메일 인증 확인 - 비밀번호 찾기
export const useGetAuthForFindPw = ({ email, authCode, changePassword }: GetReqAuthForFindPw) => {
    return useQuery<AuthCommonRes, AxiosError, AuthCommonRes, [string, GetReqAuthForFindPw]>({
        queryKey: ["auth", { email, authCode, changePassword }],
        queryFn: () => getAuthForFindPw({ email, authCode, changePassword }),
        enabled: !!authCode,
    });
};
