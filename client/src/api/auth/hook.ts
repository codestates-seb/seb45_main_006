import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

import {
    PostReqAuthForSignUpAUTH,
    PostReqAuthForSignUp,
    PostReqAuthForFindPwAUTH,
    PostReqAuthForFindPw,
} from "@type/auth/auth.req.dto";
import { AuthCommonRes } from "@type/auth/auth.res.dto";
import { postAuthForSignUpAuth, postAuthForSignUp, postAuthForFindPwAuth, postAuthForFindPw } from "./api";

// 이메일 인증 요청 - 회원가입
export const usePostAuthForSignUpAuth = () => {
    return useMutation<AuthCommonRes, AxiosError, PostReqAuthForSignUpAUTH>(postAuthForSignUpAuth);
};

// 이메일 인증 확인 - 회원가입
export const usePostAuthForSignUp = () => {
    return useMutation<AuthCommonRes, AxiosError, PostReqAuthForSignUp>(postAuthForSignUp);
};

// 이메일 인증 요청 - 비밀번호 찾기
export const usePostAuthForFindPwAuth = () => {
    return useMutation<AuthCommonRes, AxiosError, PostReqAuthForFindPwAUTH>(postAuthForFindPwAuth);
};

// 이메일 인증 확인 - 비밀번호 찾기
export const usePostAuthForFindPw = () => {
    return useMutation<AuthCommonRes, AxiosError, PostReqAuthForFindPw>(postAuthForFindPw);
};
