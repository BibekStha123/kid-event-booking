import Parent from "../../layout/Parent";
import { Dashboard } from "../components";

export default function ParentRoutes() {
    return {
        element: <Parent />,
        children: [
            { path: '/dashboard', element: <Dashboard /> }
        ]
    }
}