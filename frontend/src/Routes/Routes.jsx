import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import OrganizerRoutes from "../organizer/routes";
import ParentRoutes from "../parent/routes";
import PublicRoutes from "../publics/routes";
import { Login } from "../publics/components";

const Routes = () => {

    const isAuthenticated = true;
    const isOrganizer = true;

    const route = createBrowserRouter([
        PublicRoutes()
        // isAuthenticated ? (isOrganizer ? OrganizerRoutes() : ParentRoutes()) : PublicRoutes()
        // {
        //     path: '/login', element: <Login />
        // }
    ]);
    return <RouterProvider router={route} />;
};

export default Routes;