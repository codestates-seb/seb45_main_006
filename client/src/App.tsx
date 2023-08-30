import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";

import Main from "@container/Main";
import ErrorPage from "@container/ErrorPage";
import MyPage from "@container/MyPage";

// Header 컴포넌트가 필요할 경우 0번째 요소 children 안에 작성
// 예시) MyPage 화면
// Header 컴포넌트가 필요없을 경우 배열 요소로 작성
const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/members/1",
                element: <MyPage />,
            },
        ],
    },
]);

function App() {
    return (
        <div className="m-0 box-border flex justify-center p-0 font-sans">
            <RecoilRoot>
                <RouterProvider router={router} />
            </RecoilRoot>
        </div>
    );
}

export default App;
