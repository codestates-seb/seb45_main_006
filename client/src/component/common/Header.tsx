import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import IconLogo from "@assets/icon_logo.png";
import Button from "@component/common/Button";
import Text from "@component/common/Text";

type INavItem = {
    label: string;
    route: string;
    selected: boolean;
};
type INavItems = Array<INavItem>;

function Header() {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const defaultNavItems: INavItems = [
        { label: "프로젝트", route: "/projects", selected: false },
        { label: "스터디", route: "/studies", selected: false },
        { label: "유저 리스트", route: "/members", selected: false },
        { label: "자유 게시판", route: "/infos", selected: false },
        { label: "질문 게시판", route: "/questions", selected: false },
        { label: "Todo", route: "/todos", selected: false },
    ];

    const [isSignPage, setIsSignPage] = useState<boolean>(true);
    const [navItems, setNavItems] = useState<INavItems>(defaultNavItems);

    // pathname에 따라
    useEffect(() => {
        setNavItems(
            [...navItems].map((v) => {
                return { label: v.label, route: v.route, selected: pathname.includes(v.route) };
            }),
        );

        if (pathname.includes("/signup") || pathname.includes("/login")) {
            setIsSignPage(true);
        } else {
            setIsSignPage(false);
        }

        // navItems 추가 시 exceeded update
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    const onClickNavItem = (item: INavItem) => {
        setNavItems(
            [...navItems].map((v) => {
                return {
                    label: v.label,
                    route: v.route,
                    selected: v.label === item.label ? true : false,
                };
            }),
        );
    };

    const NavItem = ({ item }: { item: INavItem }) => {
        return (
            <li
                onClick={() => {
                    navigate(item.route);
                }}
            >
                <button className="mr-16 font-spoqa text-18 font-medium" onClick={() => onClickNavItem(item)}>
                    <Text type="Label" text={item.label} color={`${item.selected ? "text-main" : ""}`} />
                </button>
            </li>
        );
    };

    const AuthBtns = () => {
        return (
            <div>
                <Button type="MAIN" label="로그인" isFullBtn={false} onClickHandler={() => navigate("/login")} />
                <Button type="MAIN" label="회원가입" isFullBtn={false} onClickHandler={() => navigate("/signup")} />
            </div>
        );
    };

    return (
        <>
            <header className="flex h-70 w-full items-center justify-between border-b-1 border-slate-200 px-16">
                <button onClick={() => navigate("/")} className="flex items-center justify-between">
                    <img src={IconLogo} alt="DevSquad 로고" />
                    <Text type="Logo" text="Dev Squad" color="text-main" />
                </button>
                {!isSignPage ? <AuthBtns /> : null}
            </header>
            {!isSignPage ? (
                <nav className="flex h-40 w-full border-b-1 border-slate-200">
                    <ul className="flex w-full items-center">
                        {navItems.map((v: INavItem) => (
                            <NavItem key={v.label} item={v} />
                        ))}
                    </ul>
                </nav>
            ) : null}
        </>
    );
}

export default Header;
