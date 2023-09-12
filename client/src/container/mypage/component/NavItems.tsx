import { ReactNode, useEffect, useState } from "react";
import { useMatches, useSearchParams } from "react-router-dom";

import Typography from "@component/Typography";
import { GetResMemberDetail } from "@type/member/member.res.dto";

export type INav = "grade" | "edit" | "editPw" | "chat" | "management" | "bookmarks" | "likes" | "block";

type INavItem = {
    oauth: boolean;
    label: string;
    nav: INav;
    selected: boolean;
};
type INavItems = Array<INavItem>;

const defaultNavItems: INavItems = [
    { oauth: true, label: "나의 등급", nav: "grade", selected: false },
    { oauth: true, label: "회원정보 수정", nav: "edit", selected: true },
    { oauth: false, label: "비밀번호 수정", nav: "editPw", selected: true },
    { oauth: true, label: "채팅 관리", nav: "chat", selected: false },
    { oauth: true, label: "게시글 관리", nav: "management", selected: false },
    { oauth: true, label: "북마크 관리", nav: "bookmarks", selected: false },
    { oauth: true, label: "좋아요 관리", nav: "likes", selected: false },
    { oauth: true, label: "차단 관리", nav: "block", selected: false },
];

export const NavItem = ({
    item,
    onClickNavItem,
    oauth,
}: {
    item: INavItem;
    onClickNavItem: (item: INavItem) => void;
    oauth: boolean;
}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const auth = searchParams.get("auth") || "";
    const tab = searchParams.get("tab") || "project";

    if (oauth && item.label === "비밀번호 수정") {
        return <></>;
    }

    return (
        <li
            onClick={() => {
                setSearchParams({ auth, nav: item.nav, tab });
            }}
        >
            <button
                className={`mr-16 w-max p-8 font-spoqa text-18 font-medium hover:font-bold ${
                    item.selected ? "border-l-3 border-warn" : ""
                }`}
                onClick={() => onClickNavItem(item)}
            >
                {item.label === "비밀번호 수정" ? (
                    <Typography
                        type="SmallLabel"
                        text={`- ${item.label}`}
                        color={`${item.selected ? "font-bold" : ""}`}
                        styles="ml-16"
                    />
                ) : (
                    <Typography type="SmallLabel" text={item.label} color={`${item.selected ? "font-bold" : ""}`} />
                )}
            </button>
        </li>
    );
};

const SideBar = ({ children, nickname }: { children: ReactNode; nickname: string }) => {
    return (
        <div className="left-0 top-130 mr-32 h-fit w-200 rounded-md bg-white p-10">
            <div className="mb-20">
                <Typography type="Label" text="안녕하세요." />
                <Typography type="Highlight" text={`${nickname}님!`} />
            </div>
            <ol>{children}</ol>
        </div>
    );
};

function NavItems({ user }: { user: GetResMemberDetail }) {
    const match = useMatches();
    const [searchParams] = useSearchParams();
    const curNav = searchParams.get("nav");

    const [navItems, setNavItems] = useState<INavItems>(defaultNavItems);

    const onClickNavItem = (item: INavItem) => {
        setNavItems(
            [...navItems].map((v) => {
                return {
                    label: v.label,
                    nav: v.nav,
                    selected: v.nav === item.nav ? true : false,
                    oauth: v.oauth,
                };
            }),
        );
    };

    useEffect(() => {
        if (curNav) {
            setNavItems(
                [...navItems].map((v) => {
                    return { label: v.label, nav: v.nav, selected: v.nav === curNav, oauth: v.oauth };
                }),
            );
        } else {
            setNavItems(
                [...navItems].map((v) => {
                    return { label: v.label, nav: v.nav, selected: v.nav === "edit", oauth: v.oauth };
                }),
            );
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [match[1].params]);

    return (
        <>
            {user && (
                <SideBar nickname={user.nickname}>
                    {navItems.map((v) => (
                        <NavItem key={v.label} item={v} onClickNavItem={onClickNavItem} oauth={user.oauthUser} />
                    ))}
                </SideBar>
            )}
        </>
    );
}

export default NavItems;
