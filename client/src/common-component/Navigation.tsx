import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Typography from "@component/Typography";

type INavItem = {
    label: string;
    route: string;
    selected: boolean;
};
type INavItems = Array<INavItem>;

const defaultNavItems: INavItems = [
    { label: "프로젝트", route: "/projects", selected: false },
    { label: "스터디", route: "/studies", selected: false },
    { label: "유저 리스트", route: "/members", selected: false },
    { label: "자유 게시판", route: "/infos", selected: false },
    { label: "질문 게시판", route: "/questions", selected: false },
];

export const NavItem = ({ item, onClickNavItem }: { item: INavItem; onClickNavItem: (item: INavItem) => void }) => {
    const navigate = useNavigate();

    return (
        <li onClick={() => navigate(item.route)}>
            <button className="mr-16 w-max text-18 font-medium" onClick={() => onClickNavItem(item)}>
                <Typography type="Label" text={item.label} color={`${item.selected ? "text-main" : ""}`} />
            </button>
        </li>
    );
};

function Navigation() {
    const { pathname } = useLocation();

    const [navItems, setNavItems] = useState<INavItems>(defaultNavItems);

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

    useEffect(() => {
        setNavItems(
            [...navItems].map((v) => {
                return { label: v.label, route: v.route, selected: pathname.includes(v.route) };
            }),
        );

        // navItems 추가 시 exceeded update
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    return (
        <nav className="flex h-50 w-full border-b-1 border-borderline px-10 lg:p-0">
            <ul className="flex w-full items-center overflow-x-scroll sm:overflow-hidden">
                {navItems.map((v: INavItem) => (
                    <NavItem key={v.label} item={v} onClickNavItem={onClickNavItem} />
                ))}
            </ul>
        </nav>
    );
}

export default Navigation;
