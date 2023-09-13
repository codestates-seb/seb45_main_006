import axios from "axios";
import { getItemFromStorage } from "@util/localstorage-helper";

const apiEndpoint = import.meta.env.VITE_APP_API_ENDPOINT || "";
// const tempAccessToken = import.meta.env.VITE_APP_TEMP_ACCESS_TOKEN || "";
// const tempRefreshToken = import.meta.env.VITE_APP_TEMP_REFRESH_TOKEN || "";

export const commonApi = axios.create({
    baseURL: apiEndpoint,
    headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "69420",
    },
});

commonApi.interceptors.request.use(async (config) => {
    const accessToken = getItemFromStorage("accessToken") || "";
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
        return config;
    }

    return config;
});

// mock 환경에서만 주석해제하여 로그인 버튼 사용
// commonApi.interceptors.response.use(async (config) => {
//     config.headers.authorization = tempAccessToken;
//     config.headers.refresh = tempRefreshToken;

//     return config;
// });
