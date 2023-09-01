import { setItemToStorage } from "@util/localstorage-helper";
import axios from "axios";

let apiEndpoint = "";
if (import.meta.env.VITE_APP_API_ENDPOINT && typeof import.meta.env.VITE_APP_API_ENDPOINT === "string") {
    apiEndpoint = import.meta.env.VITE_APP_API_ENDPOINT;
}

// refresh token으로 access token 요청하는 함수
export const getRefreshToken = async (token: string) => {
    const baseURL = apiEndpoint;

    const response = await axios
        .request({
            baseURL,
            url: "/users/auth/renew",
            method: "post",
            headers: {},
            data: { refreshToken: token },
            timeout: 1000 * 10,
            validateStatus: () => {
                return true;
            },
        })
        .then((res) => {
            return {
                statusCode: res.status,
                body: res.data,
            };
        });

    // RefreshToken 갱신 실패
    const isRequestSuccess = Math.floor(response.statusCode / 100) < 4;
    if (!isRequestSuccess) {
        return null;
    }

    const { data } = response.body;
    const { accessToken, refreshToken } = data;

    setItemToStorage("accessToken", accessToken);
    setItemToStorage("refreshToken", refreshToken);

    return accessToken;
};
