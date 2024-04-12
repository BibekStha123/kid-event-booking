import React from 'react';
import { Outlet } from 'react-router-dom'

function PublicLayout(props) {
    return (
        <div>
            This is public layout
            <Outlet />
        </div>
    );
}

export default PublicLayout;