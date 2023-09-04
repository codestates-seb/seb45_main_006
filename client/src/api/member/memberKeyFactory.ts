import { GetReqAllMembers, GetReqMemberDetail } from "@type/member/member.req.dto";

export const memberKeyFactory = {
    all: ({ page, size }: GetReqAllMembers): [string, GetReqAllMembers] => ["todos", { page, size }],
    detail: ({ memberId }: GetReqMemberDetail): [string, GetReqMemberDetail] => ["todos", { memberId }],
};
