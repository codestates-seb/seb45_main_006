import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { useRecoilState, useSetRecoilState } from "recoil";
import { isLoggedInAtom, isSignPageAtom } from "@feature/Global";

import { useToast } from "@hook/useToast";

import IconLogo from "@assets/icon_logo.png";
import IconLogoText from "@assets/icon_logo-text.png";
import Typography from "@component/Typography";
import SignButton from "@container/sign/component/SignButton";
import { setTokenToLocalStorage, isExistToken } from "@util/token-helper";
import { clearStorage } from "@util/localstorage-helper";

const tempAccessToken = import.meta.env.VITE_APP_TEMP_ACCESS_TOKEN || "";

type INavItem = {
    label: string;
    route: string;
    selected: boolean;
};
type INavItems = Array<INavItem>;

const NavItem = ({ item, onClickNavItem }: { item: INavItem; onClickNavItem: (item: INavItem) => void }) => {
    const navigate = useNavigate();

    return (
        <li
            onClick={() => {
                navigate(item.route);
            }}
        >
            <button className="mr-16 w-max font-spoqa text-18 font-medium" onClick={() => onClickNavItem(item)}>
                <Typography type="Label" text={item.label} color={`${item.selected ? "text-main" : ""}`} />
            </button>
        </li>
    );
};

const AuthBtns = ({ onLogoutHandler }: { onLogoutHandler: () => void }) => {
    const navigate = useNavigate();
    const { createToast } = useToast();
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInAtom);

    if (isLoggedIn) {
        return (
            <div className="flex">
                <button className="w-80 min-w-70 rounded-sm px-8" onClick={onLogoutHandler}>
                    <Typography type="Body" text="Logout" color="text-warn" />
                </button>
            </div>
        );
    }

    return (
        <div className="flex">
            <SignButton
                type="OUTLINED"
                styles="px-8 w-80 rounded-sm mr-4 min-w-70"
                onClickHandler={() => {
                    // TODO: 로그인 후 처리해야할 부분
                    // 1. 응답 headers의 authorization에서 access token을 받아온다
                    const accessToken = tempAccessToken;
                    // 2. access token과 파싱된 payload를 로컬스토리지에 저장한다.
                    setTokenToLocalStorage(accessToken);
                    // 3. isLoggedIn 전역 상태를 true로 바꿔준다.
                    setIsLoggedIn(true);
                    createToast({
                        content: (
                            <Typography
                                type="SmallLabel"
                                text={
                                    "아직 로그인 api 연동 전이라 임시 로그인 입니다!\n이제 임시적으로 로그인된 것처럼 화면 동작이 일어날 거에요!\nㅤ\n혹시 정말 로그인 화면으로 이동하고 싶으셨다면 예 버튼을 눌러주세요!"
                                }
                            />
                        ),
                        isConfirm: true,
                        callback: () => navigate("/login"),
                    });
                }}
            >
                <Typography type="Body" text="로그인" />
            </SignButton>
            <SignButton
                type="FILLED"
                styles="px-8 w-80 rounded-sm min-w-70"
                onClickHandler={() => navigate("/signup/1")}
            >
                <Typography type="Body" text="회원가입" color="text-white" />
            </SignButton>
        </div>
    );
};

function Header() {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const [isSignPage, setIsSignPage] = useRecoilState(isSignPageAtom);
    const setIsLoggined = useSetRecoilState(isLoggedInAtom);

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

        if (pathname.includes("/signup/1") || pathname.includes("/login")) {
            setIsSignPage(true);
            onLogoutHandler();
        } else {
            setIsSignPage(false);
            if (isExistToken()) {
                setIsLoggined(true);
            } else {
                setIsLoggined(false);
            }
        }

        // navItems 추가 시 exceeded update
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    const onLogoutHandler = () => {
        // 회원가입 / 로그인 페이지로 이동할 경우 로그인 풀리도록 설정
        clearStorage();
        setIsLoggined(false);
        // TODO: 로그아웃 api 요청
    };

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

    return (
        <>
            <header className="flex h-60 w-full items-center justify-between px-10 lg:p-0">
                <button onClick={() => navigate("/")} className="flex items-center justify-between">
                    <img src={IconLogo} alt="DevSquad 로고" width={50} />
                    {/* <Typography type="Logo" text="Dev Squad" color="text-main" /> */}
                    <img src={IconLogoText} width={200} alt="DevSquad" className="hidden sm:block" />
                </button>

                {!isSignPage ? <AuthBtns onLogoutHandler={onLogoutHandler} /> : null}
            </header>
            {!isSignPage ? (
                <nav className="flex h-50 w-full border-b-1 border-borderline px-10 lg:p-0">
                    <ul className="flex w-full items-center overflow-x-scroll sm:overflow-hidden">
                        {navItems.map((v: INavItem) => (
                            <NavItem key={v.label} item={v} onClickNavItem={onClickNavItem} />
                        ))}
                    </ul>
                </nav>
            ) : null}
        </>
    );
}

export default Header;
