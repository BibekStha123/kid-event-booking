import React from 'react';
import { Outlet } from 'react-router-dom'

function Parent(props) {
    return (
        <div>
            this is Parent
            <Outlet />
        </div>
    );
}

export default Parent;