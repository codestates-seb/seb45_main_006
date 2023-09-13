// 이메일 인증 요청 - 회원가입
export type PostReqAuthForSignUpAUTH = {
    email: string;
};

// 이메일 인증 확인 - 회원가입
export type PostReqAuthForSignUp = {
    email: string;
    authCode: string;
};

// 이메일 인증 요청 - 비밀번호 찾기
export type PostReqAuthForFindPwAUTH = {
    email: string;
};

// 이메일 인증 확인 - 비밀번호 찾기
export type PostReqAuthForFindPw = {
    email: string;
    authCode: string;
    changePassword: string;
};
