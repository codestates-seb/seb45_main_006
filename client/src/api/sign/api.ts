import { commonApi } from "@api/common/commonApi";
import { withAuthApi } from "@api/common/withAuthApi";
import { COMMON_API_PATH } from "@api/constant";
import { PostReqNickname, PostReqMember, PostReqLogin, DeleteReqLogout } from "@type/sign/sign.req.dto";

// 회원가입 =  유저 생성하기
export const postMember = async (requestObj: PostReqMember) => {
    const url = `${COMMON_API_PATH.SIGN.PATH}`;
    const { data } = await commonApi.post(url, requestObj);
    return data;
};

// 닉네임 중복 체크
export const postNickname = async (requestObj: PostReqNickname) => {
    const url = `${COMMON_API_PATH.SIGN.NICKNAME}`;
    const { data } = await commonApi.post(url, requestObj);
    return data;
};

// 로그인
export const postLogin = async (requestObj: PostReqLogin) => {
    const url = `${COMMON_API_PATH.SIGN.LOGIN}`;
    const data = await commonApi.post(url, requestObj);
    return data;
};

// TODO: API 헤더 - 로그아웃
export const deleteLogout = async (requestObj: DeleteReqLogout) => {
    const url = `${COMMON_API_PATH.SIGN.LOGOUT}`;
    const { data } = await withAuthApi.delete(url, { data: requestObj });
    return data;
};

// 새로운 access token 요청
export const postNewAccessToken = async () => {
    const url = `${COMMON_API_PATH.SIGN.NEW_ACCESS_TOKEN}`;
    const data = await commonApi.post(url);
    return data;
};
