import React from 'react';
import { Outlet } from 'react-router-dom'
import { Navbar, Sidebar } from '../components';

function Organizer(props) {
    return (
        <div>
            this is organizer
            <Outlet />
        </div>
    );
}

export default Organizer;