import { AxiosError } from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";

import { useNavigate } from "react-router-dom";

import { getNicknameDuplicated, postMember } from "@api/sign/api";
import { signKeyFactory } from "@api/sign/signKeyFactory";
import { GetReqNicknameDuplicated, PostReqMember } from "@type/sign/sign.req.dto";
import { GetResNicknameDuplicated, PostResMember } from "@type/sign/sign.res.dto";

// 회원가입 =  유저 생성하기
export const usePostMember = ({ nickname, email, password }: PostReqMember) => {
    const navigate = useNavigate();
    return useMutation<PostResMember, AxiosError>({
        mutationFn: () => postMember({ nickname, email, password }),
        onSuccess: () => {
            alert("회원가입 완료되었습니다. 로그인 후 서비스를 이용해주세요!");
            navigate("/logins");
        },
        onError: (err) => {
            alert(err.message);
        },
    });
};

// 닉네임 중복 체크
export const useGetNicknameDuplicated = ({ nickname }: GetReqNicknameDuplicated) => {
    return useQuery<GetResNicknameDuplicated, AxiosError, GetResNicknameDuplicated, [string, GetReqNicknameDuplicated]>(
        {
            queryKey: signKeyFactory.nicknameDuplicated({ nickname }),
            queryFn: () => getNicknameDuplicated({ nickname }),
        },
    );
};
