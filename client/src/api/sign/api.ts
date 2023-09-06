import { commonApi } from "@api/common/commonApi";
import { COMMON_API_PATH } from "@api/constant";
import { GetReqNicknameDuplicated, PostReqMember } from "@type/sign/sign.req.dto";

// 회원가입 =  유저 생성하기
export const postMember = async (requestObj: PostReqMember) => {
    const url = `${COMMON_API_PATH.SIGN.PATH}`;
    const { data } = await commonApi.post(url, requestObj);
    return data;
};

// 닉네임 중복 체크
export const getNicknameDuplicated = async (requestObj: GetReqNicknameDuplicated) => {
    const url = `${COMMON_API_PATH.SIGN.NICKNAME}`;
    const { data } = await commonApi.get(url, { data: requestObj });
    return data;
};
