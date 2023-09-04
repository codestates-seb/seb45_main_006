import { AxiosError, AxiosResponse } from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";

import { getNicknameDuplicated, postMember } from "@api/sign/api";
import { signKeyFactory } from "@api/sign/signKeyFactory";
import { GetReqNicknameDuplicated, PostReqMember } from "@type/sign/sign.req.dto";
import { GetResNicknameDuplicated, PostResMember } from "@type/sign/sign.res.dto";

// 회원가입 =  유저 생성하기
export const usePostMember = () => {
    return useMutation<AxiosResponse<PostResMember>, AxiosError, PostReqMember>(postMember);
};

// 닉네임 중복 체크
export const useGetNicknameDuplicated = ({ nickname }: GetReqNicknameDuplicated) => {
    return useQuery<
        AxiosResponse<GetResNicknameDuplicated>,
        AxiosError,
        GetResNicknameDuplicated,
        [string, GetReqNicknameDuplicated]
    >({
        queryKey: signKeyFactory.nicknameDuplicated({ nickname }),
        queryFn: () => getNicknameDuplicated({ nickname }),
    });
};
