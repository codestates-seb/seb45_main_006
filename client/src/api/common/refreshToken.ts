import { commonApi } from "./commonApi";
import { setItemToStorage } from "@util/localstorage-helper";

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
        headers: { Refresh: token },
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

    const { authorization } = response.headers;

    console.log(authorization);

    // if (!authorization || !refresh) {
    //     return Promise.reject("로그인 세션 유지에 실패하였습니다.");
    // }

    setItemToStorage("accessToken", authorization);
    return authorization;
};
