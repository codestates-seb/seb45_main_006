import { commonApi } from "@api/common/commonApi";

// 기술스택 리스트
export const getDefaultStack = async () => {
    const url = `/tags`;
    const { data } = await commonApi.get(url);
    return data;
};

// 포지션 리스트
export const getDefaultPostion = async () => {
    const url = `/positions`;
    const { data } = await commonApi.get(url);
    return data;
};
