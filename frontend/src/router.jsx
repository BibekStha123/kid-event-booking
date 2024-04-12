import { createBrowserRouter } from "react-router-dom";
import Organizer from "./layout/Organizer"
import { OrganizerDashboard } from "./organizer/components";
import Parent from "./layout/Parent";
import { Dashboard } from "./parent/components";
import PublicLayout from "./layout/PublicLayout";
import { Login, Register } from "./publics/components";

const router = createBrowserRouter([
    {
        element: <Organizer />,
        children: [
            { path: '/organizer-dashboard', element: <OrganizerDashboard /> }
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
            { path: '/register', element: <Register /> }
        ]
    }
]);

export default router;