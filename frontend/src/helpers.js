import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';

export const isAuthenticated = () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
        return false;
    }

    return true;
}

export const isOrganizer = () => {
    const token = localStorage.getItem("access_token");
    const userType = jwtDecode(token).user_type
    if (userType === "organizer") {
        return true;
    } else {
        return false;
    }
}

export const checkTokenTime = () => {
    const token = localStorage.getItem("access_token");
    if (token) {
        const decodedToken = jwtDecode(token)
        if (decodedToken.exp) {
            const expiryTime = decodedToken.exp
            const currentTime = Date.now() / 1000;

            if (currentTime > expiryTime) {
                localStorage.removeItem('access_token')
                toast.success("Token Expired")
                window.location.href = '/'
            }
        }
    }
}

export const getDateTime = (date_time) => {

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const date = new Date(date_time)
    const year = date.getFullYear()
    const monthIndex = date.getMonth();
    const monthName = monthNames[monthIndex]
    const day = date.getDate();

    let hour = date.getHours();
    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12;
    hour = hour ? hour : 12;
    hour = hour < 10 ? '0' + hour : hour
    let minutes = date.getMinutes()
    minutes = minutes < 10 ? '0' + minutes : minutes

    return day + ' ' + monthName + ' ' + year + ', ' + hour + ':' + minutes + ' ' + ampm
}