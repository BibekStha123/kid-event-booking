import { Navigate } from "react-router-dom";
import { Bookings, EventForm, Events, OrganizerDashboard, Parents } from "../components";
import { Layout } from "../../shared";

export default function OrganizerRoutes() {
    return {
        element: <Layout />,
        children: [
            { path: '/organizer-dashboard', element: <OrganizerDashboard /> },
            { path: '/events', element: <Events /> },
            { path: '/create-event', element: <EventForm /> },
            { path: '/event/:id', element: <EventForm /> },
            { path: '/bookings', element: <Bookings /> },
            { path: '/parents', element: <Parents /> },
            { path: '*', element: <Navigate to='/' replace /> },
        ]
    }
}