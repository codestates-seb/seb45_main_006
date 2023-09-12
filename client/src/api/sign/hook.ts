import { AxiosError, AxiosResponse } from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";

import { getNicknameDuplicated, postMember, postLogin, deleteLogout, postNewAccessToken } from "@api/sign/api";
import { signKeyFactory } from "@api/sign/signKeyFactory";
import {
    GetReqNicknameDuplicated as GetReqNickname,
    PostReqMember,
    PostReqLogin,
    DeleteReqLogout,
} from "@type/sign/sign.req.dto";
import {
    GetResNicknameDuplicated as GetResNickname,
    PostResMember,
    PostResLogin,
    DeleteResLogout,
    PostResNewAccessToken,
} from "@type/sign/sign.res.dto";

// 회원가입 =  유저 생성하기
export const usePostMember = () => {
    return useMutation<AxiosResponse<PostResMember>, AxiosError, PostReqMember>(postMember);
};

// 닉네임 중복 체크
export const useGetNicknameDuplicated = ({ nickname }: GetReqNickname) => {
    return useQuery<AxiosResponse<GetResNickname>, AxiosError, GetResNickname, [string, GetReqNickname]>({
        queryKey: signKeyFactory.nicknameDuplicated({ nickname }),
        queryFn: () => getNicknameDuplicated({ nickname }),
        enabled: !!nickname,
    });
};

// 로그인
export const usePostLogin = () => {
    return useMutation<AxiosResponse<PostResLogin>, AxiosError, PostReqLogin>(postLogin);
};

// 로그아웃
export const useDeleteLogout = () => {
    return useMutation<AxiosResponse<DeleteResLogout>, AxiosError, DeleteReqLogout>(deleteLogout);
};

// 새로운 access token 요청
export const useNewAccessToken = () => {
    return useMutation<AxiosResponse<PostResNewAccessToken>, AxiosError>(postNewAccessToken);
};
