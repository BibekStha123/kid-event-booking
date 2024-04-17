import { Dashboard } from "../components";
import Parent from "../layout/Parent";

export default function ParentRoutes() {
    return {
        element: <Parent />,
        children: [
            { path: '/dashboard', element: <Dashboard /> }
        ]
    }
}