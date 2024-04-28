import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import OrganizerRoutes from "../organizer/routes";
import ParentRoutes from "../parent/routes";
import PublicRoutes from "../publics/routes";
import { Login } from "../publics/components";
import { isAuthenticated, isOrganizer } from "../helpers";

const Routes = () => {

    const route = createBrowserRouter([
        isAuthenticated() ? (isOrganizer() ? OrganizerRoutes() : ParentRoutes()) : {},
        PublicRoutes()
    ]);
    return <RouterProvider router={route} />;
};

export default Routes;