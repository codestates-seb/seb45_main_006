import { Link } from "react-router-dom";
import { getItemFromStorage } from "@util/localstorage-helper";
import Temp from "@assets/temp.png";
import Typography from "@component/Typography";

type ISize = "sm" | "md" | "lg";

function UserProfile({ size, mine = false, profilePicture }: { size: ISize; mine?: boolean; profilePicture?: string }) {
    const memberId = getItemFromStorage("memberId");

    if (size === "sm") {
        return (
            <div className="flex items-center">
                <Link
                    to={mine ? `/members/auth` : `/members/${memberId}`}
                    className="mr-8 h-36 w-36 overflow-hidden rounded border-1 border-borderline"
                >
                    <img width={36} height={36} src={profilePicture || Temp} alt="" />
                </Link>
                {mine && <Typography type="Highlight" text={"내 닉네임 넣어야함"} />}
            </div>
        );
    }

    if (size === "md") {
        return (
            <Link
                to={mine ? `/members/auth` : `/members/${memberId}`}
                className="mr-8 h-50 w-50 overflow-hidden rounded border-1 border-borderline"
            >
                <img width={50} height={50} src={profilePicture || Temp} alt="" />
            </Link>
        );
    }
}

export default UserProfile;