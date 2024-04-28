import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axiosClient from '../../api/axios';

function UpcomingEvents(props) {

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axiosClient.get('/upcoming-events')
            .then(({ data }) => {
                setEvents(data.bookings)
                setLoading(false)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    return (
        <>
            <h2 className="my-4">Your Upcoming Events</h2>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell><strong> User Name</strong></TableCell>
                            <TableCell align="right"><strong>Event Name</strong></TableCell>
                            <TableCell align="right"><strong>Event Date</strong></TableCell>
                            <TableCell align="right"><strong>Event Location</strong></TableCell>
                            <TableCell align="right"><strong>Child Name</strong></TableCell>
                            <TableCell align="right"><strong>Child Age</strong></TableCell>
                            <TableCell align="right"><strong>Special Needs</strong></TableCell>
                            <TableCell align="right"><strong>Emergency Contact</strong></TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {loading ?
                            <TableRow>
                                <TableCell align='center'> Loading...</TableCell>
                            </TableRow>
                            :
                            events.map((ev, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {ev.user.name}
                                    </TableCell>
                                    <TableCell align="right">{ev.event.name}</TableCell>
                                    <TableCell align="right">{ev.event.date_time}</TableCell>
                                    <TableCell align="right">{ev.event.location}</TableCell>
                                    <TableCell align="right">{ev.child_name}</TableCell>
                                    <TableCell align="right">{ev.child_age}</TableCell>
                                    <TableCell align="right">{ev.special_needs}</TableCell>
                                    <TableCell align="right">{ev.emergency_contact_no}</TableCell>
                                </TableRow>
                            ))

                        }
                    </TableBody>

                </Table>
            </TableContainer>
        </>
    );
}

export default UpcomingEvents;