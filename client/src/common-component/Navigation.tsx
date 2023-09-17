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

export const NavItem = ({
    item,
    onClickNavItem,
    isSelected,
}: {
    item: INavItem;
    onClickNavItem: (item: INavItem) => void;
    isSelected: boolean;
}) => {
    const navigate = useNavigate();

    return (
        <li onClick={() => navigate(item.route)}>
            <button
                className={`w-max px-40 py-10 text-18 font-medium hover:text-main/60 ${
                    isSelected ? "border-b-2 border-main" : "border-b border-transparent"
                }`}
                onClick={() => onClickNavItem(item)}
            >
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
        // eslint-disable-next-line tailwindcss/no-custom-classname
        <nav className="flex h-full w-full px-10 shadow-3xl lg:p-0">
            <ul className="flex w-full items-center justify-around overflow-x-scroll sm:overflow-hidden">
                {navItems.map((v: INavItem) => (
                    <NavItem key={v.label} item={v} onClickNavItem={onClickNavItem} isSelected={v.selected} />
                ))}
            </ul>
        </nav>
    );
}

export default Navigation;
