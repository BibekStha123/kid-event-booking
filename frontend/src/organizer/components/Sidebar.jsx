import React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import OrganizerDashboard from './OrganizerDashboard';
import Events from './Events';
import { Button, List, ListItem } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Sidebar() {
    return (
        <>
            <Button component={Link} to='/organizer-dashboard'>
                Dashboard
            </Button>
            <br />
            <Button component={Link} to='/events'>
                Events
            </Button>
            <br />
            <Button component={Link} to='/bookings'>
                Bookings
            </Button>
            <br />
            <Button component={Link} to='/parents'>
                Parents
            </Button>
        </>
    )
}
