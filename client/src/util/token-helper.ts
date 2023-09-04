import dayjs from "dayjs";
import jwt_decode from "jwt-decode";

type USER_ROLE = "USER" | "ADMIN";

type ACCESS_TOKEN = {
    roles: Array<USER_ROLE>;
    username: string;
    sub: string;
    exp: Date;
};

/**
 * token을 파싱하는 함수
 * @param {string} token access token 또는 refresh token
 * @returns {ACCESS_TOKEN} 토큰을 파싱한 객체
 */
export const parseJwt = (token: string): ACCESS_TOKEN => {
    const decoded: ACCESS_TOKEN = jwt_decode(token);
    return decoded;
};

/**
 * 토큰 만료 시간과 현재 시간을 비교하여 유효한 토큰인지 검증하는 함수
 * @param {string} token access token 또는 refresh token
 * @returns {boolean} 토큰 유효 여부
 */
export const isValidToken = (token: string): boolean => {
    const tokenJwtData = parseJwt(token);
    return dayjs(tokenJwtData.exp) > dayjs();
};
