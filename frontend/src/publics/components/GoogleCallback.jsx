import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axiosClient from '../../api/axios';

function GoogleCallback(props) {

    // const params = new URLSearchParams(window.location.search);
    // const code = params.get('code');

    const location = useLocation()
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    useEffect(() => {
        axiosClient.post(`/google/callback${location.search}`, {
            headers: {
                'X-CSRF-TOKEN': csrfToken
            }
        })
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.log(error);
            })
    })

    return (
        <div>

        </div>
    );
}

export default GoogleCallback;