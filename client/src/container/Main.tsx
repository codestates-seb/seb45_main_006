import { Suspense } from "react";
import { Outlet } from "react-router";
import Header from "@component/common/Header";

function Main() {
    return (
        <>
            <Header />
            <main className="mt-110">
                <Suspense fallback={<div>Loading...</div>}>
                    <Outlet />
                </Suspense>
            </main>
        </>
    );
}

export default Main;
