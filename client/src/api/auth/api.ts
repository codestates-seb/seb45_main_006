import { commonApi } from "@api/common/commonApi";
import { COMMON_API_PATH } from "@api/constant";
import {
    PostReqAuthForSignUpAUTH,
    PostReqAuthForSignUp,
    PostReqAuthForFindPwAUTH,
    PostReqAuthForFindPw,
} from "@type/auth/auth.req.dto";

// 이메일 인증 요청 - 회원가입
export const postAuthForSignUpAuth = async (requestObj: PostReqAuthForSignUpAUTH) => {
    const url = `${COMMON_API_PATH.AUTH.FOR_SIGNUP_AUTH}`;
    const { data } = await commonApi.post(url, requestObj);
    return data;
};

// 이메일 인증 확인 - 회원가입
export const postAuthForSignUp = async (requestObj: PostReqAuthForSignUp) => {
    const url = `${COMMON_API_PATH.AUTH.FOR_SIGNUP}`;
    const { data } = await commonApi.post(url, requestObj);
    return data;
};

// 이메일 인증 요청 - 비밀번호 찾기
export const postAuthForFindPwAuth = async (requestObj: PostReqAuthForFindPwAUTH) => {
    const url = `${COMMON_API_PATH.AUTH.FOR_FIND_PW}`;
    const { data } = await commonApi.post(url, requestObj);
    return data;
};

// 이메일 인증 확인 - 비밀번호 찾기
export const postAuthForFindPw = async (requestObj: PostReqAuthForFindPw) => {
    const url = `${COMMON_API_PATH.AUTH.FOR_FIND_PW_AUTH}`;
    const { data } = await commonApi.post(url, requestObj);
    return data;
};
