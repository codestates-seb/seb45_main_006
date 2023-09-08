import dayjs from "dayjs";
import jwt_decode from "jwt-decode";
import { getItemFromStorage, setItemToStorage } from "./localstorage-helper";

type USER_ROLE = "USER" | "ADMIN";

type ACCESS_TOKEN = {
    roles: Array<USER_ROLE>;
    username: string;
    memberId: number;
    sub: string;
    exp: Date;
};

/**
 * token을 파싱하는 함수
 * @param {string} token access token 또는 refresh token
 * @returns {ACCESS_TOKEN} 토큰을 파싱한 객체
 */
export const parseJwt = (token: string): ACCESS_TOKEN => {
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
    if (!token) {
        console.log("jwt 토큰이 유효하지 않습니다.", token);
        return;
    }
    const tokenJwtData = parseJwt(token);
    console.log("실제 토큰 유효성 여부", dayjs(tokenJwtData.exp) > dayjs());
    // return dayjs(tokenJwtData.exp) > dayjs();
    // TODO: 로그인 api 연동 후에 삭제할 코드
    return true;
};

export const isExistToken = (): boolean => {
    const accessToken = getItemFromStorage("accessToken");
    if (!accessToken) {
        return false;
    }

    const tokenJwtData = parseJwt(accessToken);
    console.log("토큰에 저장된 실제 memberId", tokenJwtData.memberId);
    // TODO: 로그인 api 연동 후에 1 대신 tokenJwtData.memberId 넣기
    //       - 타입 확인 후 == 를 === 로 바꾸기
    return accessToken && getItemFromStorage("memberId") && getItemFromStorage("memberId") == 1;
};

export const setTokenToLocalStorage = (token: string): void => {
    if (!token) {
        console.log("jwt 토큰이 유효하지 않습니다.", token);
        return;
    }
    const parsedToken = parseJwt(token);
    // TODO: 로그인 api 연동 후에 삭제할 코드
    setItemToStorage("isLoggedIn", true);
    setItemToStorage("accessToken", token);
    setItemToStorage("email", parsedToken.username);
    setItemToStorage("role", parsedToken.roles);
    // TODO: 로그인 api 연동 후에 삭제할 코드 (|| 1)
    setItemToStorage("memberId", parsedToken.memberId || 1);
};
