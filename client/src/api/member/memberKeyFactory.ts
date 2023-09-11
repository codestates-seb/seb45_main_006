import { GetReqAllMembers, GetReqMemberDetail } from "@type/member/member.req.dto";

export const memberKeyFactory = {
    all: ({ page, stacks, posiions, blockedMemberId }: GetReqAllMembers): [string, GetReqAllMembers] => [
        "members",
        { page, stacks, posiions, blockedMemberId },
    ],
    detail: ({ memberId }: GetReqMemberDetail): [string, GetReqMemberDetail] => ["members", { memberId }],
    my: () => ["members", { memberId: "my" }],
};
