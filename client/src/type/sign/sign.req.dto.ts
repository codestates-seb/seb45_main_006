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
