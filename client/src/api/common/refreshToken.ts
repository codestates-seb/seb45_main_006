import { commonApi } from "./commonApi";
import { getItemFromStorage } from "@util/localstorage-helper";
import { setTokenToLocalStorage } from "@util/token-helper";

let apiEndpoint = "";
if (import.meta.env.VITE_APP_API_ENDPOINT && typeof import.meta.env.VITE_APP_API_ENDPOINT === "string") {
    apiEndpoint = import.meta.env.VITE_APP_API_ENDPOINT;
}

// refresh token으로 access token 요청하는 함수
export const getRefreshToken = async (token: string) => {
    const baseURL = apiEndpoint;

    const response = await commonApi.request({
        baseURL,
        url: "/accessToken",
        method: "post",
        headers: { Refresh: `Bearer ${token}` },
        data: {},
        timeout: 1000 * 10,
        validateStatus: () => {
            return true;
        },
    });

    // RefreshToken 갱신 실패
    const isRequestSuccess = Math.floor(response.status / 100) < 4;
    if (!isRequestSuccess) {
        return null;
    }

    const { authorization, Refresh } = response.headers;

    if (!authorization || !Refresh) {
        return Promise.reject("로그인 세션 유지에 실패하였습니다.");
    }

    setTokenToLocalStorage({
        accessToken: authorization || "",
        refreshToken: Refresh || "",
        memberId: getItemFromStorage("memberId"),
    });

    return authorization;
};
