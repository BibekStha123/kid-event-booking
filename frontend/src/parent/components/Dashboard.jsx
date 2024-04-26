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

function Dashboard(props) {

  const [bookingsCount, setBookingsCount] = useState([]);
  const [eventsCount, setEventsCount] = useState([]);

  useEffect(() => {
    axiosClient.get('/count')
      .then(({ data }) => {
        // setBookings(data.bookings)
        setBookingsCount(data.bookings_count);
        setEventsCount(data.events_count);
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xl={4}>
          <Item>Total Bookings - <strong>{bookingsCount}</strong>
            <Button component={Link} to='/my-bookings'>
              View
            </Button>
          </Item>
        </Grid>
        <Grid item xl={4}>
          <Item>Upcoming Events - <strong>{eventsCount}</strong>
            <Button component={Link} to='/upcoming-events'>
              View
            </Button>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;