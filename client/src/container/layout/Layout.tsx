import { Suspense, useEffect, useRef, useState } from "react";
import { Outlet } from "react-router";

import { useRecoilValue } from "recoil";
import { isSignPageAtom } from "@feature/Global";

import Header from "@component/Header";

const HEIGHT = {
    SIGN_HEADER: 70,
    MAIN_HEADER: 110,
} as const;

function Layout() {
    const headerRef = useRef(null);
    const isSignPage = useRecoilValue(isSignPageAtom);

    const [marginTop, setMarginTop] = useState<number>(HEIGHT.MAIN_HEADER);

    useEffect(() => {
        if (isSignPage) {
            setMarginTop(HEIGHT.SIGN_HEADER);
        } else {
            setMarginTop(HEIGHT.MAIN_HEADER);
        }
    }, [isSignPage]);

    return (
        <>
            <div className="fixed z-10 flex w-full max-w-screen-xl flex-col bg-white" ref={headerRef}>
                <Header />
            </div>
            <main
                className={`w-full max-w-screen-xl`}
                style={{ minHeight: `calc(100vh - ${marginTop}px)`, marginTop: `${marginTop}px` }}
            >
                <Suspense fallback={<div>Loading...</div>}>
                    <Outlet />
                </Suspense>
            </main>
        </>
    );
}

export default Layout;
