import { Navigate } from "react-router-dom";
import { Aboutus, BookingForm, Contactus, Events, Home, Login, Register } from "../components";
import PublicLayout from "../layout/PublicLayout";

export default function PublicRoutes() {
    return {
        element: <PublicLayout />,
        children: [
            { path: '/login', element: <Login /> },
            { path: '/register', element: <Register /> },
            { path: '/', element: <Home /> },
            { path: '/events', element: <Events /> },
            { path: '/about-us', element: <Aboutus /> },
            { path: '/contact-us', element: <Contactus /> },
            { path: '/book-event', element: <BookingForm /> },
            { path: '*', element: <Navigate to="/" replace /> }
        ]
    }
}