import React from 'react';
import { Outlet } from 'react-router-dom'

function Organizer(props) {
    return (
        <div>
            this is organizer
            <Outlet />
        </div>
    );
}

export default Organizer;