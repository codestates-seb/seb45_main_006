import jwt_decode from "jwt-decode";
import { getItemFromStorage, setItemToStorage } from "./localstorage-helper";

type USER_ROLE = "USER" | "ADMIN";

type ACCESS_TOKEN = {
    roles: Array<USER_ROLE>;
    username: string;
    memberId: number;
    sub: string;
    exp: number;
};

/**
 * token을 파싱하는 함수
 * @param {string} token access token 또는 refresh token
 * @returns {ACCESS_TOKEN} 토큰을 파싱한 객체
 */
export const parseJwt = (token: string): ACCESS_TOKEN => {
    console.log("???");
    if (!token) {
        throw Error("jwt 토큰이 유효하지 않습니다.");
    }
    const decoded: ACCESS_TOKEN = jwt_decode(token);
    return decoded;
};

/**
 * 토큰 만료 시간과 현재 시간을 비교하여 유효한 토큰인지 검증하는 함수
 * @param {string} token access token 또는 refresh token
 * @returns {boolean} 토큰 유효 여부
 */
export const isValidToken = (token: string): boolean | undefined => {
    console.log("???");
    if (!token) {
        console.log("jwt 토큰이 유효하지 않습니다.", token);
        return;
    }
    const tokenJwtData = parseJwt(token);
    // dayjs.unix(tokenJwtData.exp): unix -> 시간
    return tokenJwtData.exp > Date.now();
};

export const isExistToken = (): boolean => {
    const accessToken = getItemFromStorage("accessToken");
    const refreshToken = getItemFromStorage("refreshToken");
    const memberId = getItemFromStorage("memberId");
    const email = getItemFromStorage("email");
    if (!accessToken) {
        return false;
    }

    const tokenJwtData = parseJwt(accessToken);
    return accessToken && refreshToken && memberId && email && tokenJwtData.username === email;
};

export const setTokenToLocalStorage = ({
    accessToken,
    refreshToken,
    memberId,
}: {
    accessToken: string;
    refreshToken: string;
    memberId: number;
}): void => {
    const parsedToken = parseJwt(accessToken);
    setItemToStorage("accessToken", accessToken);
    setItemToStorage("refreshToken", refreshToken);
    setItemToStorage("memberId", memberId);
    setItemToStorage("email", parsedToken.username);
};
