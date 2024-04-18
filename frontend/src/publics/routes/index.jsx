import { Navigate } from "react-router-dom";
import { Home, Login, Register } from "../components";
import PublicLayout from "../layout/PublicLayout";

export default function PublicRoutes() {
    return {
        element: <PublicLayout />,
        children: [
            { path: '/login', element: <Login /> },
            { path: '/register', element: <Register /> },
            { path: '/', element: <Home /> },
            {path: '*', element: <Navigate to="/" replace/>}
        ]
    }
}