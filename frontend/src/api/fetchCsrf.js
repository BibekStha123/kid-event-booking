import axios from 'axios';

const getCsrfToken = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/sanctum/csrf-cookie`, { withCredentials: true });
        // Optionally, handle the response if needed
        console.log('CSRF token fetched');
    } catch (error) {
        console.error('Error fetching CSRF token', error);
    }
};

const initializeAxiosClient = async () => {
    await getCsrfToken();
    
    // Now, you can use axiosClient for making API requests
    // Example:
    // axiosClient.get('/some-endpoint').then(response => console.log(response));
};

export default initializeAxiosClient;
