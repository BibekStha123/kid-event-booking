import { Navigate } from "react-router-dom";
import { Bookings, Dashboard, UpcomingEvents } from "../components";
import { Layout } from "../../shared";

export default function ParentRoutes() {
    return {
        element: <Layout />,
        children: [
            { path: '/dashboard', element: <Dashboard /> },
            { path: '/my-bookings', element: <Bookings /> },
            { path: '/upcoming-events', element: <UpcomingEvents /> },
            { path: '*', element: <Navigate to='/' replace /> },
        ]
    }
}