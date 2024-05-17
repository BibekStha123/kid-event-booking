import { Navigate } from "react-router-dom";
import { Aboutus, BookingForm, Contactus, Event, Events, Home, Login, Register } from "../components";
import PublicLayout from "../layout/PublicLayout";
import GoogleCallback from "../components/GoogleCallback";

export default function PublicRoutes() {
    return {
        element: <PublicLayout />,
        children: [
            { path: '/login', element: <Login /> },
            { path: '/register', element: <Register /> },
            { path: '/', element: <Home /> },
            { path: '/all-events', element: <Events /> },
            { path: '/about-us', element: <Aboutus /> },
            { path: '/contact-us', element: <Contactus /> },
            { path: '/book-event/:id', element: <BookingForm /> },
            { path: '/google/callback', element: <GoogleCallback /> },
            {path: '/event/:id', element: <Event />},
            { path: '*', element: <Navigate to="/" replace /> }
        ]
    }
}