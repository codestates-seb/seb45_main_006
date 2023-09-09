import { commonApi } from "@api/common/commonApi";
import { COMMON_API_PATH } from "@api/constant";
import {
    PostReqAuthForFindPw,
    PostReqAuthForSignUp,
    GetReqAuthForFindPw,
    GetReqAuthForSignUp,
} from "@type/auth/auth.req.dto";

// 이메일 인증 요청 - 회원가입
export const postAuthForSignUp = async (requestObj: PostReqAuthForSignUp) => {
    const url = `${COMMON_API_PATH.AUTH.FOR_SIGNUP}`;
    const { data } = await commonApi.post(url, requestObj);
    return data;
};

// 이메일 인증 확인 - 회원가입
export const getAuthForSignUp = async (requestObj: GetReqAuthForSignUp) => {
    const url = `${COMMON_API_PATH.AUTH.FOR_SIGNUP}`;
    const { data } = await commonApi.get(url, { data: requestObj });
    return data;
};

// 이메일 인증 요청 - 비밀번호 찾기
export const postAuthForFindPw = async (requestObj: PostReqAuthForFindPw) => {
    const url = `${COMMON_API_PATH.AUTH.FOR_FIND_PW}`;
    const { data } = await commonApi.post(url, requestObj);
    return data;
};

// 이메일 인증 확인 - 비밀번호 찾기
export const getAuthForFindPw = async (requestObj: GetReqAuthForFindPw) => {
    const url = `${COMMON_API_PATH.AUTH.FOR_FIND_PW}`;
    const { data } = await commonApi.get(url, { data: requestObj });
    return data;
};
