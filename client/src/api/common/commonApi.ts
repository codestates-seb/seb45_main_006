import axios from "axios";

let apiEndpoint = "";
if (import.meta.env.VITE_APP_API_ENDPOINT && typeof import.meta.env.VITE_APP_API_ENDPOINT === "string") {
    apiEndpoint = import.meta.env.VITE_APP_API_ENDPOINT;
}

export const commonApi = axios.create({
    baseURL: apiEndpoint,
    headers: {
        "Content-Type": "application/json",
    },
});

// TODO: 로그인 로직 구현 후 삭제할 코드

// 실제 요청 시 Authorization인지 / authorization 인지 확인
// 임시 accessToken
const tempAccessToken = import.meta.env.VITE_APP_TEMP_ACCESS_TOKEN || "";

commonApi.interceptors.response.use((config) => {
    config.headers.authorization = tempAccessToken;
    config.headers.Refresh = tempAccessToken;

    return config;
});
