import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

// import { useRecoilValue } from "recoil";
// import { rawPasswordAtom } from "@feature/Global";

import { useGetMyDetail } from "@api/member/hook";
import { useToast } from "@hook/useToast";

import NavItems from "./component/NavItems";
import TabItems, { ITab } from "./component/TabItems";
import UserLevel from "./component/UserLevel";
import UserBlock from "./component/UserBlock";
import UserPw from "./component/UserPw";
import UserInfo from "./component/UserInfo";
import ChatRooms from "./component/ChatRooms";
import UserActivity from "@container/user/component/UserActivity";
import UserLikeActivity from "@container/user/component/UserLikeActivity";
import Typography from "@component/Typography";

import { getItemFromStorage } from "@util/localstorage-helper";

function MyPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const curTab = searchParams.get("tab");
    const curNav = searchParams.get("nav");
    const auth = searchParams.get("auth");

    const myId = getItemFromStorage("memberId");

    const { data: user, isError, refetch } = useGetMyDetail();

    const { fireToast, createToast } = useToast();

    useEffect(() => {
        refetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!auth || auth !== getItemFromStorage("randomId")) {
            createToast({
                content: "올바른 접근이 아닙니다. 메인화면으로 이동합니다.",
                isConfirm: false,
                isWarning: false,
            });
            navigate("/");
            return;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (isError) {
        fireToast({
            content: <Typography type="Highlight" text={"삭제/차단 등의 이유로 조회할 수 없는 사용자입니다!"} />,
            isConfirm: false,
        });
        navigate("/");

        return;
    }

    const checkValidTab = (tab: string | null): ITab => {
        if (tab === "project" || tab === "study" || tab === "info" || tab === "question") {
            return tab;
        }

        return "project";
    };

    return (
        <div className="flex min-h-screen justify-center bg-background">
            <div className="flex w-11/12 justify-center p-20">
                {user && (
                    <>
                        <NavItems user={user} />
                        <div className="flex-1">
                            {(curNav === "management" || curNav === "bookmarks" || curNav === "likes") && <TabItems />}
                            <div className="flex w-full justify-center">
                                {curNav === "level" && <UserLevel />}
                                {curNav === "edit" && <UserInfo user={user} />}
                                {curNav === "editPw" && <UserPw />}
                                {curNav === "management" && (
                                    <UserActivity memberId={myId} tab={checkValidTab(curTab)} />
                                )}
                                {curNav === "bookmarks" && (
                                    <UserLikeActivity memberId={myId} tab={checkValidTab(curTab)} type="bookmark" />
                                )}
                                {curNav === "likes" && (
                                    <UserLikeActivity memberId={myId} tab={checkValidTab(curTab)} type="likes" />
                                )}
                                {curNav === "block" && <UserBlock blockList={user.blockMemberList} />}
                                {curNav === "chat" && <ChatRooms />}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default MyPage;
