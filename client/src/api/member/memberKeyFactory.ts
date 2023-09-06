import { GetReqAllMembers, GetReqMemberDetail } from "@type/member/member.req.dto";

export const memberKeyFactory = {
    all: ({ page, stacks, posiions }: GetReqAllMembers): [string, GetReqAllMembers] => [
        "members",
        { page, stacks, posiions },
    ],
    detail: ({ memberId }: GetReqMemberDetail): [string, GetReqMemberDetail] => ["members", { memberId }],
    my: () => ["members", { memberId: "my" }],
};
