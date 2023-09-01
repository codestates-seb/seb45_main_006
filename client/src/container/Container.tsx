import { Suspense } from "react";
import { Outlet } from "react-router";
import Header from "@component/common/Header";

function Container() {
    return (
        <>
            <Header />
            <main className="mt-110 w-full max-w-screen-xl">
                <Suspense fallback={<div>Loading...</div>}>
                    <Outlet />
                </Suspense>
            </main>
        </>
    );
}

export default Container;
