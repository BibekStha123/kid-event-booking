import Layouts from "./layouts/Layouts";
import { Login } from "../components";

export default function OrganizerRoute() {
    return {
        element: <Layouts />,
        children: [
            { path: '/organizer/login', element: <Login /> }
        ]
    }
}