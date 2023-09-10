// 회원가입 =  유저 생성하기
export type PostReqMember = {
    nickname: string;
    email: string;
    password: string;
};

// 닉네임 중복 체크
export type GetReqNicknameDuplicated = {
    nickname: string;
};

// 로그인
export type PostReqLogin = {
    email: string;
    password: string;
};

// 로그아웃
export type DeleteReqLogout = {
    email: string;
};

// 새로운 access token 요청
// - 빈 객체
