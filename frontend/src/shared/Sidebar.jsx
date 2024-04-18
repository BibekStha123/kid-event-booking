import React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { isOrganizer } from '../helpers';

export default function Sidebar() {
    return (
        <>
            {isOrganizer() ?
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
                :
                <>
                    <Button component={Link} to='/dashboard'>
                        Dashboard
                    </Button>
                    <br />
                    <Button component={Link} to='/my-bookings'>
                        My Bookings
                    </Button>
                    <br />
                    <Button component={Link} to='/upcoming-events'>
                        Upcoming Events
                    </Button>
                </>
            }
        </>
    )
}
