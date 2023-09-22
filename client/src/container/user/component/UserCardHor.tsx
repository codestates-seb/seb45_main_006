import Typography from "@component/Typography";
import UserProfile from "@component/user/UserProfile";
import { UserInfo } from "./UserCardModal";

import { GetResMemberDetail } from "@type/member/member.res.dto";

import IconGithub from "@assets/sign/icon_github.png";

function UserCardHor({ user }: { user: GetResMemberDetail }) {
    return (
        <div className="mb-32 flex flex-1 items-center rounded-md bg-white p-8 shadow-md">
            <div className="mr-20 h-150 w-250 overflow-hidden rounded-xl">
                <UserProfile size="lg" profilePicture={user.profilePicture} memberId={user.memberId} />
            </div>
            <div>
                <Typography type="Heading" text={user.nickname} styles="font-ganpan font-medium mb-16" />
                {user.githubId ? (
                    <a
                        className="relative flex items-center"
                        href={`https://github.com/${user.githubId}`}
                        target="_blank"
                        // onClick={(e) => e.preventDefault()}
                    >
                        <img src={IconGithub} alt="깃허브 아이콘" className="mr-8 h-16 w-16" />
                        <Typography type="Highlight" text="깃허브" styles="min-w-50" />
                        <Typography type="Highlight" text={user.githubId} styles="hover:text-blue-600 ml-8" />
                    </a>
                ) : null}
                <UserInfo type="stack" user={user} />
                <UserInfo type="position" user={user} />
            </div>
        </div>
    );
}

export default UserCardHor;
