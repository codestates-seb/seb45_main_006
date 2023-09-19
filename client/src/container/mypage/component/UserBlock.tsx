import { useGetMemberDetail, useDeleteBlockMember } from "@api/member/hook";
import Typography from "@component/Typography";

const UserBlockItem = ({ memberId }: { memberId: number }) => {
    const linkCss = "bg-tertiary px-8 py-4 hover:bg-light hover:font-bold";

    const { data: blockUser } = useGetMemberDetail({ memberId });
    const { mutate: deleteBlockMember } = useDeleteBlockMember();

    return (
        <div className="flex items-center p-10">
            {blockUser && (
                <>
                    <div className="flex w-9/12">
                        <div className="mr-8 h-36 w-36 overflow-hidden rounded border-1 border-borderline">
                            <img src={blockUser.profilePicture} alt="" />
                        </div>
                        <Typography text={blockUser.nickname} type="Body" />
                    </div>
                    <div className="flex w-3/12 justify-center">
                        <button className={linkCss} onClick={() => deleteBlockMember({ memberId })}>
                            <Typography text="차단 해제" type="Body" />
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

function UserBlock({ blockList }: { blockList: Array<number> }) {
    return (
        <div className="flex flex-1 flex-col items-center rounded-md bg-white p-12 shadow-md">
            <div className="w-full">
                {blockList.length > 0 ? (
                    blockList.map((v) => <UserBlockItem key={`block-${v}`} memberId={v} />)
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
