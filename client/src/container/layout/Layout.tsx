import { Suspense, useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { useRecoilState } from "recoil";
import { isLoggedInAtom, isSignPageAtom } from "@feature/Global";

import Header from "@component/Header";
import Navigation from "@component/Navigation";
import ChatBot from "@container/chat/ChatBot";

import { isExistToken } from "@util/token-helper";

const HEIGHT = {
    SIGN_HEADER: 60,
    MAIN_HEADER: 110,
} as const;

function Layout() {
    const headerRef = useRef(null);
    const { pathname } = useLocation();

    const [isSignPage, setIsSignPage] = useRecoilState(isSignPageAtom);
    const [isLoggedIn, setIsLoggined] = useRecoilState(isLoggedInAtom);

    const [marginTop, setMarginTop] = useState<number>(HEIGHT.MAIN_HEADER);

    useEffect(() => {
        if (pathname.includes("/signup") || pathname.includes("/login")) {
            setIsSignPage(true);
        } else {
            setIsSignPage(false);
            if (isExistToken()) {
                setIsLoggined(true);
            } else {
                setIsLoggined(false);
            }
        }
        if (isSignPage) {
            setMarginTop(HEIGHT.SIGN_HEADER);
        } else {
            setMarginTop(HEIGHT.MAIN_HEADER);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSignPage, pathname]);

    return (
        <>
            <div className="fixed z-10 flex w-full max-w-screen-xl flex-col bg-white" ref={headerRef}>
                <Header />
                {!isSignPage && <Navigation />}
            </div>
            <main
                className={`w-full max-w-screen-xl`}
                style={{ minHeight: `calc(100vh - ${marginTop}px)`, marginTop: `${marginTop}px` }}
            >
                <Suspense fallback={<div>Loading...</div>}>
                    <Outlet />
                </Suspense>
                {isLoggedIn && <ChatBot />}
            </main>
        </>
    );
}

export default Layout;
