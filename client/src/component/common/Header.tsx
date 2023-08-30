import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import IconLogo from "@assets/icon_logo.png";
import Button from "@component/common/Button";

type INavItem = {
    label: string;
    route: string;
    selected: boolean;
};
type INavItems = Array<INavItem>;

function Header() {
    const navigate = useNavigate();
    const location = useLocation();

    const defaultNavItems: INavItems = [
        { label: "프로젝트", route: "/projects", selected: true },
        { label: "스터디", route: "/studies", selected: false },
        { label: "유저 리스트", route: "/users", selected: false },
        { label: "자유 게시판", route: "/infos", selected: false },
    ];

    const [isSignPage, setIsSignPage] = useState<boolean>(false);
    const [navItems, setNavItems] = useState<INavItems>(defaultNavItems);

    useEffect(() => {
        if (location.pathname === "/signup" || location.pathname === "/login") {
            setIsSignPage(true);
        } else {
            setIsSignPage(false);
        }
    }, [location.pathname]);

    const onClickNavItem = (item: INavItem) => {
        setNavItems(
            [...navItems].map((v) => {
                return { label: v.label, route: v.route, selected: v.label === item.label ? true : false };
            }),
        );
    };

    const NavItem = ({ item }: { item: INavItem }) => {
        return (
            <li onClick={() => navigate(item.route)}>
                <button
                    className={`mr-16 text-20 font-medium ${item.selected ? "text-main" : ""}`}
                    onClick={() => onClickNavItem(item)}
                >
                    {item.label}
                </button>
            </li>
        );
    };

    return (
        <div className="fixed flex w-full max-w-screen-xl flex-col px-16">
            <header className="flex h-70 w-full items-center justify-between border-b-1 border-slate-200">
                <button onClick={() => navigate("/")} className="flex items-center justify-between">
                    <img src={IconLogo} alt="DevSquad 로고" />
                    <p className="font-ganpan text-40 text-main">Dev Squad</p>
                </button>
                {!isSignPage ? (
                    <div>
                        <Button
                            type="MAIN"
                            label="로그인"
                            isFullBtn={false}
                            onClickHandler={() => navigate("/signup")}
                        />
                        <Button
                            type="MAIN"
                            label="회원가입"
                            isFullBtn={false}
                            onClickHandler={() => navigate("/login")}
                        />
                    </div>
                ) : null}
            </header>
            <nav className="flex h-40 w-full border-b-1 border-slate-200">
                <ul className="flex w-full items-center">
                    {navItems.map((v: INavItem) => (
                        <NavItem key={v.label} item={v} />
                    ))}
                </ul>
            </nav>
        </div>
    );
}

export default Header;
