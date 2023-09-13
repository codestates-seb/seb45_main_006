import { AxiosError, AxiosResponse } from "axios";
import { useMutation } from "@tanstack/react-query";

import { postNickname, postMember, postLogin, deleteLogout, postNewAccessToken } from "@api/sign/api";
import { PostReqNickname, PostReqMember, PostReqLogin, DeleteReqLogout } from "@type/sign/sign.req.dto";
import {
    PostResNickname,
    PostResMember,
    PostResLogin,
    DeleteResLogout,
    PostResNewAccessToken,
} from "@type/sign/sign.res.dto";

// 회원가입 =  유저 생성하기
export const usePostMember = () => {
    return useMutation<PostResMember, AxiosError, PostReqMember>(postMember);
};

// 닉네임 중복 체크
export const usePostNickname = () => {
    return useMutation<AxiosResponse<PostResNickname>, AxiosError, PostReqNickname>(postNickname);
};

// 로그인
export const usePostLogin = () => {
    return useMutation<AxiosResponse<PostResLogin>, AxiosError, PostReqLogin>(postLogin);
};

// 로그아웃
export const useDeleteLogout = () => {
    return useMutation<DeleteResLogout, AxiosError, DeleteReqLogout>(deleteLogout);
};

// 새로운 access token 요청
export const useNewAccessToken = () => {
    return useMutation<AxiosResponse<PostResNewAccessToken>, AxiosError>(postNewAccessToken);
};
