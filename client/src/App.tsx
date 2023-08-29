import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Main from "@container/Main";
import ErrorPage from "@container/ErrorPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        errorElement: <ErrorPage />,
        children: [],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
