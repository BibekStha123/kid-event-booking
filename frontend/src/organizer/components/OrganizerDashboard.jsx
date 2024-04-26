import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import axiosClient from '../../api/axios';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function OrganizerDashboard(props) {

    const [bookingsCount, setBookingsCount] = useState();
    const [totalEventsCount, setTotalEventsCount] = useState();
    const [upcomingEventsCount, setUpcomingEventsCount] = useState();
    const [parentCount, setParentCount] = useState();

    useEffect(() => {
        axiosClient.get('/organizer-dashboard')
            .then(({ data }) => {
                setBookingsCount(data.bookings_count);
                setTotalEventsCount(data.total_events_count);
                setUpcomingEventsCount(data.upcoming_events_count);
                setParentCount(data.parents_count);
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xl={4}>
                    <Item>Total Parents - <strong>{parentCount}</strong>
                        <Button component={Link} to='/parents'>
                            View
                        </Button>
                    </Item>
                </Grid>
                <Grid item xl={4}>
                    <Item>Total Events - <strong>{totalEventsCount}</strong>
                        {/* <Button component={Link} to='/events'>
                            View
                        </Button> */}
                    </Item>
                </Grid>
                <Grid item xl={4}>
                    <Item>Upcoming Events - <strong>{upcomingEventsCount}</strong>
                        <Button component={Link} to='/events'>
                            View
                        </Button>
                    </Item>
                </Grid>
                <Grid item xl={4}>
                    <Item>Total Bookings - <strong>{bookingsCount}</strong>
                        <Button component={Link} to='/bookings'>
                            View
                        </Button>
                    </Item>
                </Grid>
            </Grid>
        </Box>
    );
}

export default OrganizerDashboard;