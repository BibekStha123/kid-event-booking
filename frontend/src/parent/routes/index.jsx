import { Navigate } from "react-router-dom";
import { Bookings, Children, ChildrenForm, Dashboard, UpcomingEvents, UpdateProfile } from "../components";
import { Layout } from "../../shared";

export default function ParentRoutes() {
    return {
        element: <Layout />,
        children: [
            { path: '/dashboard', element: <Dashboard /> },
            { path: '/my-bookings', element: <Bookings /> },
            { path: '/upcoming-events', element: <UpcomingEvents /> },
            { path: '/children', element: <Children /> },
            { path: '/add-children', element: <ChildrenForm /> },
            {path: '/update-profile', element: <UpdateProfile />},
            { path: '*', element: <Navigate to='/' replace /> },
        ]
    }
}