// 회원가입 =  유저 생성하기  - status code: 200
export type PostResMember = Record<string, never>; // empty object

// 닉네임 중복 체크  - status code: 200
export type PostResNickname = Record<string, never>; // empty object

// 로그인
export type PostResLogin = {
    memberId: number;
};

// 로그아웃
export type DeleteResLogout = Record<string, never>; // empty object

// 새로운 access token 요청
export type PostResNewAccessToken = Record<string, never>; // empty object
