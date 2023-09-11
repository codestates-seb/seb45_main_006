import { Link } from "react-router-dom";
import { getItemFromStorage } from "@util/localstorage-helper";
import Temp from "@assets/temp.png";

type ISize = "sm" | "md" | "lg";

function UserProfile({ size, mine = false }: { size: ISize; mine?: boolean }) {
    const memberId = getItemFromStorage("memberId");

    if (size === "sm") {
        return (
            <Link
                to={mine ? `/members/auth` : `/members/${memberId}`}
                className="mr-8 h-36 w-36 overflow-hidden rounded border-1 border-borderline"
            >
                <img width={36} height={36} src={Temp} alt="" />
            </Link>
        );
    }
}

export default UserProfile;
