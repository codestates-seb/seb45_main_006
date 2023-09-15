import { Link } from "react-router-dom";

import { useRecoilState, useRecoilValue } from "recoil";
import { isLoggedInAtom, isSignPageAtom } from "@feature/Global";

import { useDeleteLogout } from "@api/sign/hook";

import IconLogo from "@assets/icon_logo.png";
import IconLogoText from "@assets/icon_logo-text.png";

import Typography from "@component/Typography";
import UserProfile from "@component/user/UserProfile";
import { clearStorage, getItemFromStorage } from "@util/localstorage-helper";

// 임시 버튼 css
const outlinedCss = "w-fit min-w-80 px-12 py-8 border-1 border-[#888888] rounded-xl";
const filledCss = "w-fit min-w-80 px-12 py-8 bg-[#888888] rounded-xl";

const BtnsWithAuth = ({ onLogoutHandler }: { onLogoutHandler: () => void }) => {
    return (
        <div className="flex">
            <UserProfile size="sm" mine={true} />
            <button className="w-80 min-w-70 rounded-sm px-8" onClick={onLogoutHandler}>
                <Typography type="Body" text="Logout" color="text-warn" />
            </button>
        </div>
    );
};

const BtnsWithoutAuth = () => {
    return (
        <div className="flex w-166 justify-between text-center">
            <Link to="/login" className={outlinedCss}>
                <Typography type="Body" text="로그인" />
            </Link>
            <Link to="/signup/1" className={filledCss}>
                <Typography type="Body" text="회원가입" color="text-white" />
            </Link>
        </div>
    );
};

function Header() {
    const isSignPage = useRecoilValue(isSignPageAtom);
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInAtom);

    const { mutate: deleteLogout } = useDeleteLogout();

    const onLogoutHandler = () => {
        const email = getItemFromStorage("email");
        deleteLogout(
            { email },
            {
                onSuccess: () => {
                    clearStorage();
                    setIsLoggedIn(false);
                },
            },
        );
    };

    return (
        <header className="flex h-60 w-full items-center justify-between px-10 lg:p-0">
            <Link to="/" className="flex items-center justify-between">
                <img src={IconLogo} alt="DevSquad 로고" width={40} />
                <img src={IconLogoText} width={160} alt="DevSquad" className="hidden sm:block" />
            </Link>

            {!isSignPage && (
                <>{isLoggedIn ? <BtnsWithAuth onLogoutHandler={onLogoutHandler} /> : <BtnsWithoutAuth />}</>
            )}
        </header>
    );
}

export default Header;
