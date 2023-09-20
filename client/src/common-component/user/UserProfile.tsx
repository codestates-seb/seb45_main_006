import { useNavigate } from "react-router-dom";
import { getItemFromStorage } from "@util/localstorage-helper";
// import Temp from "@assets/temp.png";
import DefaultUser from "@assets/default-user.jpg";
import Typography from "@component/Typography";
import { getRandomID } from "@util/random-helper";
import { useScrollControll } from "@hook/userScrollControl";
import { useToast } from "@hook/useToast";
import { useCheckUser } from "@hook/useCheckUser";
import { isModalOpenAtom, modalMemberIdAtom } from "@feature/Global";
import { useSetRecoilState } from "recoil";

type ISize = "xs" | "sm" | "md" | "lg";

function UserProfile({
    size,
    mine = false,
    profilePicture,
    memberId,
    disabled = false,
}: {
    size: ISize;
    mine?: boolean;
    profilePicture?: string;
    memberId?: number;
    disabled?: boolean;
}) {
    const navigate = useNavigate();
    const { lockScroll } = useScrollControll();
    const { reqLoginToUserToast } = useToast();
    const myId = getItemFromStorage("memberId");
    const { isLoggedIn } = useCheckUser({ memberId: myId });

    const nickname = getItemFromStorage("nickname");
    const myProfilePicture = getItemFromStorage("profilePicture");
    const memberType = getItemFromStorage("memberType");
    const randomId = getRandomID();
    const ouathUser = memberType && memberType === "OAUTH2" ? `/members/my?auth=${randomId}&nav=edit` : `/members/auth`;

    const setIsModalOpen = useSetRecoilState(isModalOpenAtom);
    const setModalMemberId = useSetRecoilState(modalMemberIdAtom);

    const onClickProfileHandler = () => {
        if (!isLoggedIn) {
            reqLoginToUserToast();
            return;
        }

        if (mine) {
            navigate(ouathUser);
            return;
        }

        setModalMemberId(memberId || 0);
        setIsModalOpen(true);
        lockScroll();
    };

    if (size === "xs") {
        return (
            <div className="flex items-center overflow-hidden rounded border-1 border-light">
                <img width={24} height={24} src={myProfilePicture || profilePicture || DefaultUser} alt="" />
            </div>
        );
    }

    if (size === "sm") {
        return (
            <div className="flex items-center">
                <button
                    onClick={onClickProfileHandler}
                    className="mr-8 h-36 w-36 overflow-hidden rounded border-1 border-borderline"
                    disabled={disabled}
                >
                    <img width={36} height={36} src={myProfilePicture || profilePicture || DefaultUser} alt="" />
                </button>
                {mine && <Typography type="Highlight" text={nickname} />}
            </div>
        );
    }

    if (size === "md") {
        return (
            <button
                onClick={onClickProfileHandler}
                className="mr-8 h-50 w-50 overflow-hidden rounded border-1 border-borderline"
                disabled={disabled}
            >
                <img width={50} height={50} src={profilePicture || DefaultUser} alt="" />
            </button>
        );
    }

    if (size === "lg") {
        return (
            <div className="mr-8 h-130 w-216 overflow-hidden rounded border-1 border-borderline">
                <img className="h-full w-full object-contain" src={profilePicture || DefaultUser} alt="" />
            </div>
        );
    }
}

export default UserProfile;
