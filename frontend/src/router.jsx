import { createBrowserRouter } from "react-router-dom";
import Organizer from "./organizer/layout/Organizer"
import { Bookings, Events, OrganizerDashboard, Parents } from "./organizer/components";
import Parent from "./parent/layout/Parent";
import { Dashboard } from "./parent/components";
import PublicLayout from "./publics/layout/PublicLayout";
import { Home, Login, Register } from "./publics/components";

const router = createBrowserRouter([
    {
        element: <Organizer />,
        children: [
            { path: '/organizer-dashboard', element: <OrganizerDashboard /> },
            { path: '/events', element: <Events /> },
            { path: '/bookings', element: <Bookings /> },
            { path: '/parents', element: <Parents /> },
        ]
    },
    {
        element: <Parent />,
        children: [
            { path: '/dashboard', element: <Dashboard /> }
        ]
    },
    {
        element: <PublicLayout />,
        children: [
            { path: '/login', element: <Login /> },
            { path: '/register', element: <Register /> },
            { path: '/', element: <Home /> }
        ]
    }
]);

export default router;