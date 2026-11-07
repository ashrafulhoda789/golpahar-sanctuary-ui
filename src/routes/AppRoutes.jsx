import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/homepage/HomePage";
import HomePage2 from "../pages/homepage/HomePage2";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: '/home2',
                element: <HomePage2 />
            }
        ]
    }
])