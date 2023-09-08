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
import ProjectDetails from "@container/project/Details";
import ProjectRegister from "@container/project/Register";
import StudyBoard from "@container/study/Board";
import StudyDetails from "@container/study/Details";
import StudyRegister from "@container/study/Register";
import SignUp from "@container/sign/SignUp";
import TempProfile1 from "@container/sign/TempProfile1";
import TempProfile4 from "@container/sign/TempProfile4";
import FindPw from "@container/sign/FindPw";
import ToastList from "@component/ToastList";
import UserList from "@container/user/List";
import InfoBoard from "@container/info/Board";
import InfoRegister from "@container/info/Register";
import QuestionRegister from "@container/question/Register";

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
                path: "/projects/:projectBoardId",
                element: <ProjectDetails />,
            },
            {
                path: "/studies",
                element: <StudyBoard />,
            },
            {
                path: "/studies/register",
                element: <StudyRegister />,
            },
            {
                path: "/studies/:studyBoardId",
                element: <StudyDetails />,
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
                path: "/signup/profile/1",
                element: <TempProfile1 />,
            },
            {
                path: "/signup/profile/4",
                element: <TempProfile4 />,
            },
            {
                path: "/login/find-pw",
                element: <FindPw />,
            },
            {
                path: "/members",
                element: <UserList />,
            },
            {
                path: "/infos",
                element: <InfoBoard />,
            },
            {
                path: "/infos/add",
                element: <InfoRegister />,
            },
            {
                path: "/questions/add",
                element: <QuestionRegister />,
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
// queryClient.invalidateQueries({ queryKey: ["members"] });

function App() {
    return (
        <div className="m-0 box-border flex justify-center p-0 font-sans text-primary">
            <QueryClientProvider client={queryClient}>
                <RecoilRoot>
                    <RouterProvider router={router} />
                    <ToastList />
                </RecoilRoot>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </div>
    );
}

export default App;
