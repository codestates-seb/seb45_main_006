import { useGetMemberDetail, useDeleteBlockMember } from "@api/member/hook";
import { useToast } from "@hook/useToast";

import Typography from "@component/Typography";
import UserProfile from "@component/user/UserProfile";

const UserBlockItem = ({ memberId, refetch }: { memberId: number; refetch: () => void }) => {
    const linkCss = "bg-tertiary px-8 py-4 hover:bg-light hover:font-bold";

    const { data: blockUser } = useGetMemberDetail({ memberId });
    const { mutate: deleteBlockMember } = useDeleteBlockMember();
    const { fireToast, errorToast } = useToast();

    const onClickUnblockHandler = () => {
        deleteBlockMember(
            { memberId },
            {
                onSuccess: () => {
                    fireToast({
                        content: "사용자가 차단 해제되었습니다.",
                        isConfirm: true,
                    });
                    refetch();
                },
                onError: (err) => errorToast(err),
            },
        );
    };

    return (
        <div className="flex items-center p-10">
            {blockUser && (
                <>
                    <div className="flex w-9/12 items-center">
                        <UserProfile size="sm" disabled={true} />
                        <Typography text={blockUser.nickname} type="Body" />
                    </div>
                    <div className="flex w-3/12 justify-center">
                        <button className={linkCss} onClick={onClickUnblockHandler}>
                            <Typography text="차단 해제" type="Body" />
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

function UserBlock({ blockList, refetch }: { blockList: Array<number>; refetch: () => void }) {
    return (
        <div className="flex flex-1 flex-col items-center rounded-md bg-white p-12 shadow-md">
            <div className="w-full">
                {blockList.length > 0 ? (
                    blockList.map((v) => <UserBlockItem key={`block-${v}`} memberId={v} refetch={refetch} />)
                ) : (
                    <div className="flex h-full flex-col items-center justify-center">
                        <Typography text="차단된 유저가 없습니다." type="Description" styles="mb-8" />
                    </div>
                )}
            </div>
        </div>
    );
}

export default UserBlock;
