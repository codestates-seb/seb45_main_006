import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";

import { QueryClient, QueryClientProvider, QueryCache } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { isAxiosError } from "axios";

import Layout from "@container/layout/Layout";
import ErrorPage from "@container/ErrorPage";
import Main from "@container/main/Main";
import MyPage from "@container/mypage/MyPage";
import TodoList from "@container/todo/TodoList";
import TodoDetail from "@container/todo/TodoDetail";
import CreateTodo from "@container/todo/CreateTodo";
import ProjectBoard from "@container/project/Board";
import ProjectRegister from "@container/project/Register";
import SignUp from "@container/sign/SignUp";
import TempSignUp from "@container/sign/TempSignUp";
import TempProfile1 from "@container/sign/TempProfile1";
import TempProfile4 from "@container/sign/TempProfile4";

// Header 컴포넌트가 필요할 경우 0번째 요소 children 안에 작성
// 예시) MyPage 화면
// Header 컴포넌트가 필요없을 경우 배열 요소로 작성
const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Main />,
            },
            {
                path: "/projects",
                element: <ProjectBoard />,
            },
            {
                path: "/projects/register",
                element: <ProjectRegister />,
            },
            {
                path: "/members/1",
                element: <MyPage />,
            },
            {
                path: "/signup",
                element: <SignUp />,
            },
            {
                path: "/todos",
                element: <TodoList />,
            },
            {
                path: "/todos/:todoId",
                element: <TodoDetail />,
            },
            {
                path: "/todos/add",
                element: <CreateTodo />,
            },
            {
                path: "/signup/temp",
                element: <TempSignUp />,
            },
            {
                path: "/signup/profile/1",
                element: <TempProfile1 />,
            },
            {
                path: "/signup/profile/4",
                element: <TempProfile4 />,
            },
        ],
    },
]);

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
            retry: 0,
        },
    },
    queryCache: new QueryCache({
        onError: (error) => {
            if (isAxiosError(error)) {
                if (error.response?.status === 500) {
                    // 서버 500 에러
                }
                // 토큰 만료 오류 체크
            }
        },
    }),
});

function App() {
    return (
        <div className="m-0 box-border flex justify-center p-0 font-sans text-primary">
            <QueryClientProvider client={queryClient}>
                <RecoilRoot>
                    <RouterProvider router={router} />
                </RecoilRoot>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </div>
    );
}

export default App;
