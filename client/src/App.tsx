import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";

import { QueryClient, QueryClientProvider, QueryCache } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { isAxiosError } from "axios";

import Layout from "@container/layout/Layout";
import ErrorPage from "@container/ErrorPage";
import Main from "@container/main/Main";
import AuthUser from "@container/mypage/AuthUser";
import MyPage from "@container/mypage/MyPage";
import Attendance from "@container/mypage/component/Attendance";
import TodoList from "@container/todo/TodoList";
import TodoDetail from "@container/todo/TodoDetail";
import CreateTodo from "@container/todo/CreateTodo";
import ProjectBoard from "@container/project/Board";
import ProjectDetails from "@container/project/Details";
import ProjectRegister from "@container/project/Register";
import StudyBoard from "@container/study/Board";
import StudyDetails from "@container/study/Details";
import StudyRegister from "@container/study/Register";
import Login from "@container/sign/Login";
import SignUp1 from "@container/sign/SignUp1";
import SignUp2 from "@container/sign/SignUp2";
import SignUp3 from "@container/sign/SignUp3";
import OauthUser from "@container/sign/OauthUser";
import SetProOauth from "@container/sign/SetProOauth";
import SetPro from "@container/sign/SetPro";
import FindPw from "@container/sign/FindPw";
import ToastList from "@component/ToastList";
import UserList from "@container/user/List";
import UserDetail from "@container/user/UserDetail";
import InfoBoard from "@container/info/Board";
import InfoDetail from "@container/info/Detail";
import InfoRegister from "@container/info/Register";
import QuestionBoard from "@container/question/Board";
import QuestionDetail from "@container/question/Detail";
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
                path: "/projects/:projectBoardId/edit",
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
                path: "/studies/:studyBoardId/edit",
                element: <StudyRegister />,
            },
            {
                path: "/studies/:studyBoardId",
                element: <StudyDetails />,
            },
            {
                path: "/members/auth",
                element: <AuthUser />,
            },
            {
                path: "/members/my",
                element: <MyPage />,
            },
            {
                path: "/attendance",
                element: <Attendance />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup/1",
                element: <SignUp1 />,
            },
            {
                path: "/signup/2",
                element: <SignUp2 />,
            },
            {
                path: "/signup/3",
                element: <SignUp3 />,
            },
            {
                path: "/signup/oauth-user",
                element: <OauthUser />,
            },
            {
                path: "/setpro/oauth",
                element: <SetProOauth />,
            },
            {
                path: "/setpro",
                element: <SetPro />,
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
                path: "/login/find-pw",
                element: <FindPw />,
            },
            {
                path: "/members",
                element: <UserList />,
            },
            {
                path: "/members/:memberId",
                element: <UserDetail />,
            },
            {
                path: "/infos",
                element: <InfoBoard />,
            },
            {
                path: "/infos/:infoId",
                element: <InfoDetail />,
            },
            {
                path: "/infos/add",
                element: <InfoRegister />,
            },
            {
                path: "/infos/:infoId/edit",
                element: <InfoRegister />,
            },
            {
                path: "/questions",
                element: <QuestionBoard />,
            },
            {
                path: "/questions/add",
                element: <QuestionRegister />,
            },
            {
                path: "/questions/:questionId",
                element: <QuestionDetail />,
            },
            {
                path: "/questions/:questionId/edit",
                element: <QuestionRegister />,
            },
        ],
    },
]);

// 참고:  https://pebblepark.tistory.com/32
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnMount: true,
            refetchOnReconnect: true,
            refetchOnWindowFocus: true,
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

queryClient.invalidateQueries({ queryKey: ["members"] });
queryClient.invalidateQueries({ queryKey: ["chats"] });

function App() {
    return (
        <div className="m-0 box-border flex justify-center p-0 font-ganpan font-light text-primary">
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
