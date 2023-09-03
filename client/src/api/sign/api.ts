import { commonApi } from "@api/common/commonApi";
import { GetReqNicknameDuplicated, PostReqMember } from "@type/sign/sign.req.dto";

// 회원가입 =  유저 생성하기
export const postMember = ({ nickname, email, password }: PostReqMember) => {
    const method = "POST";
    const path = "/members";
    const data = { nickname, email, password };
    return commonApi({ method, path, data });
};

// 닉네임 중복 체크
export const getNicknameDuplicated = ({ nickname }: GetReqNicknameDuplicated) => {
    const method = "GET";
    const path = "/members/checkNickname";
    const data = { nickname };
    return commonApi({ method, path, data });
};
