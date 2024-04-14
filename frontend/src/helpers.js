import {jwtDecode} from 'jwt-decode';

export const isAuthenticated = () => {
    const token = localStorage.getItem("access_token");
    if(!token && isEmpty(token) ) {
        return false;
    }

    return true;
}

export const isOrganizer = () => {
    const token = localStorage.getItem("access_token");
    const userType = jwtDecode(token).user_type
    if(userType === "organizer") {
        return true;
    } else {
        return false;
    }
}