import { Bookings, Events, OrganizerDashboard, Parents } from "../components";
import Organizer from "../layout/Organizer";

export default function OrganizerRoutes() {
    return {
        element: <Organizer />,
        children: [
            { path: '/organizer-dashboard', element: <OrganizerDashboard /> },
            { path: '/events', element: <Events /> },
            { path: '/bookings', element: <Bookings /> },
            { path: '/parents', element: <Parents /> },
        ]
    }
}