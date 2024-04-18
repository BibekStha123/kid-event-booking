import { Navigate } from "react-router-dom";
import { Bookings, Events, OrganizerDashboard, Parents } from "../components";
import { Layout } from "../../shared";

export default function OrganizerRoutes() {
    return {
        element: <Layout />,
        children: [
            { path: '/organizer-dashboard', element: <OrganizerDashboard /> },
            { path: '/events', element: <Events /> },
            { path: '/bookings', element: <Bookings /> },
            { path: '/parents', element: <Parents /> },
            { path: '*', element: <Navigate to='/' replace /> },
        ]
    }
}