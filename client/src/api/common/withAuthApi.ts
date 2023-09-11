import axios from "axios";
import { getItemFromStorage, clearStorage } from "@util/localstorage-helper";
import { isValidToken, setTokenToLocalStorage } from "@util/token-helper";

const apiEndpoint = import.meta.env.VITE_APP_API_ENDPOINT || "";
// TODO: 로그인 api 연동 후에 삭제할 코드
const tempAccessToken = import.meta.env.VITE_APP_TEMP_ACCESS_TOKEN || "";

export const withAuthApi = axios.create({
    baseURL: apiEndpoint,
    headers: {
        "Content-Type": "application/json",
    },
});

// TODO: authorization으로 보내야 하는지, Authorization으로 보내야 하는지
// TODO: authorization으로 받아야 하는지, Authorization으로 받아야 하는지

withAuthApi.interceptors.request.use(async (config) => {
    const accessToken = getItemFromStorage("accessToken");
    const isLoggedIn = getItemFromStorage("isLoggedIn");

    if (isLoggedIn) {
        config.headers.authorization = `bearer ${accessToken}`;
    }
    return config;
});

// 토큰 관련 정책
// 1. 회원가입, 로그인, 비밀번호 찾기, 닉네임 중복 검사 - access token 없이 요청
//    - 그 외 요청 access token이 있을 경우 담아서 요청
// 2. 만료된 access token을 보낼 경우
//    - 백엔드에서 DB에 저장된 refresh token으로 access token을 발급
// 3. 응답으로 받은 access token 유효할 경우 로컬스토리지에 저장
withAuthApi.interceptors.response.use(async (config) => {
    // TODO: 로그인 api 연동 후에 삭제할 코드
    const isLoggedIn = getItemFromStorage("isLoggedIn");
    if (isLoggedIn) {
        config.headers.Authorization = `bearer ${tempAccessToken}`;

        const newAccessToken = config.headers.Authorization;
        if (newAccessToken && typeof newAccessToken === "string" && isValidToken(newAccessToken.split(" ")[1])) {
            setTokenToLocalStorage(newAccessToken.split(" ")[1]);
        } else {
            clearStorage();
        }
    }

    return config;
});

// 리프레시 토큰을 브라우저에서 관리할 경우
// // 요청 전 interceptor에서 토큰 확인
// withAuthApi.interceptors.request.use(async (config) => {
//     if (!config.headers) return config;

//     // 1. accessToken이 존재하고 유효하면 accessToken 사용
//     if (accessToken !== null && isValidToken(accessToken)) {
//         config.headers.Authorization = `Bearer ${accessToken}`;
//         return config;
//     }

//     // 2. accessToken이 유효하지 않을 때
//     //    refreshToken이 존재하고 유효하면 refreshToken으로 새로운 accessToken 요청
//     if (refreshToken !== null && isValidToken(refreshToken)) {
//         accessToken = await getRefreshToken(refreshToken);

//         // 요청에 실패하면 accessToken null 이므로 에러
//         if (!accessToken) {
//             return Promise.reject("토큰이 유효하지 않습니다.");
//         }

//         config.headers.Authorization = `Bearer ${accessToken}`;
//         return config;
//     }

//     // accessToken과 refreshToken이 모두 유효하지 않으면 에러
//     return Promise.reject("토큰이 유효하지 않습니다.");
// });
