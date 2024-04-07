import { createBrowserRouter, RouterProvider } from "react-router-dom";
import OrganizerRoute from "../organizer/routes";

const Routes = () => {
    const route = createBrowserRouter([
        OrganizerRoute
    ]);

    return <RouterProvider router={route} />
}

export default Routes;