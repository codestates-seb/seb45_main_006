import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { useRecoilState } from "recoil";
import { isSignPageAtom } from "@feature/Global";

import IconLogo from "@assets/icon_logo.png";
import Button from "@component/Button";
import Typography from "@component/Typography";

type INavItem = {
    label: string;
    route: string;
    selected: boolean;
};
type INavItems = Array<INavItem>;

function Header() {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const [isSignPage, setIsSignPage] = useRecoilState(isSignPageAtom);

    const defaultNavItems: INavItems = [
        { label: "프로젝트", route: "/projects", selected: false },
        { label: "스터디", route: "/studies", selected: false },
        { label: "유저 리스트", route: "/members", selected: false },
        { label: "자유 게시판", route: "/infos", selected: false },
        { label: "질문 게시판", route: "/questions", selected: false },
        { label: "Todo", route: "/todos", selected: false },
    ];

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
                    <Typography type="Label" text={item.label} color={`${item.selected ? "text-main" : ""}`} />
                </button>
            </li>
        );
    };

    const AuthBtns = () => {
        return (
            <div className="flex">
                <Button type="MAIN" isFullBtn={false} onClickHandler={() => navigate("/login")}>
                    <Typography type="Body" text="로그인" color="text-white" />
                </Button>
                <Button type="MAIN" isFullBtn={false} onClickHandler={() => navigate("/signup")}>
                    <Typography type="Body" text="회원가입" color="text-white" />
                </Button>
                <Button type="WARN" isFullBtn={false} onClickHandler={() => navigate("/signup/temp")}>
                    <Typography type="Body" text="회원가입(임시)" color="text-white" />
                </Button>
            </div>
        );
    };

    return (
        <>
            <header className="flex h-70 w-full items-center justify-between border-b-1 border-borderline px-16">
                <button onClick={() => navigate("/")} className="flex items-center justify-between">
                    <img src={IconLogo} alt="DevSquad 로고" />
                    <Typography type="Logo" text="Dev Squad" color="text-main" />
                </button>
                {!isSignPage ? <AuthBtns /> : null}
            </header>
            {!isSignPage ? (
                <nav className="flex h-40 w-full border-b-1 border-borderline">
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
