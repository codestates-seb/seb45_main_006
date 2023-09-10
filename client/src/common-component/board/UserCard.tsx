import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Typography from "@component/Typography";
import Modal from "@component/Modal";
import UserCardModal from "@container/user/component/UserCardModal";

import { useScrollControll } from "@hook/userScrollControl";
import { useCheckUser } from "@hook/useCheckUser";
import { useToast } from "@hook/useToast";

import { OneMember } from "@type/member/member.res.dto";

import IconGithub from "@assets/sign/icon_github.png";

export const UserImage = ({ nickname, profilePicture }: { nickname: string; profilePicture: string }) => (
    <img className="h-full w-full" src={profilePicture} alt={`${nickname}의 프로필 이미지`} />
);

export const UserNickname = ({ nickname, githubId }: { nickname: string; githubId?: string }) => (
    <figcaption className="my-10 flex max-h-40 flex-1 items-center justify-between border-b-1 border-borderline pb-10">
        <Typography type="Label" text={nickname} />
        {githubId ? (
            <a
                className="relative flex items-center"
                href={`https://github.com/${githubId}`}
                target="_blank"
                // onClick={(e) => e.preventDefault()}
            >
                <img src={IconGithub} alt="깃허브 아이콘" className="mr-8 h-16 w-16" />
                <Typography type="Highlight" text={githubId} styles="hover:text-blue-600" />
            </a>
        ) : null}
    </figcaption>
);

const UserInfo = ({ user, type }: { user: OneMember; type: "stack" | "position" }) => {
    const arr = Array.isArray(user[type]) ? user[type].slice(0, 4) : [];
    const color = type === "stack" ? "text-blue-800" : "text-teal-800";
    return (
        <div className="mb-8 flex flex-wrap">
            {arr.map((v) => (
                <Typography key={v} type="SmallLabel" text={`#${v}`} styles="mr-4" color={color} />
            ))}
            {arr.length > 2 ? <Typography type="SmallLabel" text="..." color={color} /> : null}
        </div>
    );
};

function UserCard({ user, setBlockedMemberId }: { user: OneMember; setBlockedMemberId: (v: number) => void }) {
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState<boolean>(false);
    // 열려있는 모달 위에 모달
    const [isUpperOpen, setIsUpperOpen] = useState<boolean>(false);

    const { lockScroll, openScroll } = useScrollControll();
    const { isLoggedIn, isMine } = useCheckUser({ memberId: user.memberId });
    const { reqLoginToUserToast, createToast } = useToast();

    const showModal = () => {
        if (!isLoggedIn) {
            reqLoginToUserToast();
            return;
        }

        if (isMine) {
            createToast({
                content: "내 유저 카드입니다. 마이페이지로 이동하시겠습니까?",
                isConfirm: true,
                callback: () => navigate("/members/my"),
            });
            return;
        }

        setIsOpen(true);
        lockScroll();
    };

    const closeModal = () => {
        setIsUpperOpen(false);
        setIsOpen(false);
        openScroll();
    };

    return (
        <>
            <figure
                className="m-10 flex w-240 cursor-pointer flex-col rounded-md border-1 border-borderline p-12 font-ganpan hover:bg-background"
                onClick={showModal}
            >
                <div className="h-130 w-216 overflow-hidden rounded-xl">
                    <UserImage nickname={user.nickname} profilePicture={user.profilePicture} />
                </div>
                <UserNickname nickname={user.nickname} githubId={user.githubId} />

                <UserInfo user={user} type="stack" />
                <UserInfo user={user} type="position" />
            </figure>
            {isOpen && (
                <Modal closeModal={closeModal} upperModal={isUpperOpen}>
                    <UserCardModal
                        memberId={user.memberId}
                        closeModal={closeModal}
                        isUpperOpen={isUpperOpen}
                        setIsUpperOpen={setIsUpperOpen}
                        setBlockedMemberId={setBlockedMemberId}
                    />
                </Modal>
            )}
        </>
    );
}

export default UserCard;
