import { Suspense, useEffect, useRef, useState } from "react";
import { Outlet } from "react-router";

import Header from "@component/common/Header";

import { useElementWidthAndHeight } from "@hook/useElementWidthAndHeight";

function Container() {
    const headerRef = useRef(null);
    const { height } = useElementWidthAndHeight(headerRef);
    const [marginTop, setMarginTop] = useState<number>(height);

    useEffect(() => {
        setMarginTop(height);
    }, [height]);

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

export default Container;
