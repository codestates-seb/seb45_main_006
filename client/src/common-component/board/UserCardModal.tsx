import Typography from "@component/Typography";
import { UserNickname, UserImage } from "./UserCard";

import { useGetMemberDetail } from "@api/member/hook";
import { useToast } from "@hook/useToast";

import { GetResMemberDetail } from "@type/member/member.res.dto";

import { TbDeviceDesktopCode } from "react-icons/tb";
import { PiUserFocus, PiBookOpenTextDuotone } from "react-icons/pi";
import { GoProjectRoadmap } from "react-icons/go";
import { BiBookmark } from "react-icons/bi";

import Button from "@component/Button";

const UserBtns = () => {
    return (
        <div className="mb-20 flex w-full justify-end">
            <Button type="PROJECT_POINT">
                <Typography type="Highlight" text="채팅하기" color="text-white" />
            </Button>
            <Button type="WARN">
                <Typography type="Highlight" text="차단하기" color="text-white" />
            </Button>
        </div>
    );
};

const UserInfo = ({ user, type }: { user: GetResMemberDetail; type: "stack" | "position" }) => {
    const arr = Array.isArray(user[type]) ? user[type] : [];
    const background = type === "stack" ? "bg-project" : "bg-study";

    return (
        <li className="my-6 flex w-full items-center">
            {type === "stack" ? <TbDeviceDesktopCode size={"1.5rem"} /> : <PiUserFocus size={"1.5rem"} />}
            <div className="ml-4 min-w-50">
                <Typography type="Highlight" text={type === "stack" ? "스택" : "포지션"} styles="font-bold" />
            </div>
            <div className="flex flex-wrap items-center">
                {arr.map((v) => (
                    <div key={v} className={`m-4 h-fit rounded-md p-4 ${background}`}>
                        <Typography type="Highlight" text={v} styles="font-bold" />
                    </div>
                ))}
            </div>
        </li>
    );
};

const TempProject = () => (
    <div className="my-10 w-full max-w-700 rounded-md border-1 border-borderline p-10">
        <div className="flex justify-between">
            <Typography type="Label" text="[Java/JavaScript] 카메라 서비스 개발" />
            <BiBookmark size={"1.5rem"} />
        </div>
        <div className="my-10 flex">
            <div className="mr-4 h-fit w-fit rounded-2xl bg-project px-8 py-4">
                <Typography type="Highlight" text="Java" styles="font-bold" />
            </div>
            <div className="h-fit w-fit rounded-2xl bg-project px-8 py-4">
                <Typography type="Highlight" text="Javascript" styles="font-bold" />
            </div>
        </div>
        <Typography type="Description" text="시작예정일:2023-08-24 ~ 마감예정일:2023-09-22" color="text-gray-600" />
    </div>
);

const TempStudy = () => (
    <div className="my-10 w-full max-w-700 rounded-md border-1 border-borderline p-10">
        <div className="flex justify-between">
            <Typography type="Label" text="홍대 스터디 모집합니다" />
            <BiBookmark size={"1.5rem"} />
        </div>
        <div className="my-10 flex">
            <div className="h-fit w-fit rounded-2xl bg-study px-8 py-4">
                <Typography type="Highlight" text="모집인원: 6명" styles="font-bold" />
            </div>
        </div>
        <Typography type="Description" text="시작예정일:2023-08-24 ~ 마감예정일:2023-09-22" color="text-gray-600" />
    </div>
);

function UserCardModal({ memberId, closeModal }: { memberId: number; closeModal: () => void }) {
    const { data: user, isError } = useGetMemberDetail({ memberId });
    const { fireToast } = useToast();

    if (isError) {
        closeModal();
        fireToast({
            content: <Typography type="Highlight" text={"삭제/차단 등의 이유로 조회할 수 없는 사용자입니다!"} />,
            isConfirm: false,
        });
        return;
    }

    if (user) {
        return (
            <>
                <div className="flex flex-col p-30 md:flex-row">
                    <div className="flex max-w-600 flex-1 flex-col justify-between">
                        <div>
                            <UserNickname nickname={user.nickname} githubId={user.githubId} />
                            <UserInfo type="stack" user={user} />
                            <UserInfo type="position" user={user} />
                        </div>
                        <UserBtns />
                    </div>
                    <div className="flex flex-1 items-center justify-center p-20">
                        <div className="max-w-300 flex-1 overflow-hidden rounded-xl border-1 border-borderline">
                            <UserImage nickname={user.nickname} profilePicture={user.profilePicture} />
                        </div>
                    </div>
                </div>
                <div className="p-20">
                    <div className="flex items-center">
                        <GoProjectRoadmap size={"1.5rem"} />
                        <Typography
                            type="Highlight"
                            text={`${user.nickname}님이 만든 프로젝트`}
                            styles="font-bold ml-8"
                        />
                    </div>
                    {user.projectList.map(() => (
                        <TempProject />
                    ))}

                    <div className="mt-32 flex items-center">
                        <PiBookOpenTextDuotone size={"1.5rem"} />
                        <Typography
                            type="Highlight"
                            text={`${user.nickname}님이 만든 스터디`}
                            styles="font-bold ml-8"
                        />
                    </div>
                    {user.studyList.map(() => (
                        <TempStudy />
                    ))}
                </div>
            </>
        );
    }
}

export default UserCardModal;
