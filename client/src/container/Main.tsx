import { Suspense } from "react";
import { Outlet } from "react-router";
import Header from "@component/common/Header";
import CarouselCustomNavigation from "@component/main/CarouselCustomNavigation.jsx";

function Main() {
    return (
        <>
            <Header />
            <main className="mt-110">
                <Suspense fallback={<div>Loading...</div>}>
                    <CarouselCustomNavigation />
                    <Outlet />
                </Suspense>
            </main>
        </>
    );
}

export default Main;
