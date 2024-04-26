import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axiosClient from '../../api/axios';

function Bookings(props) {

    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        axiosClient.get('/bookings')
            .then(({ data }) => {
                setBookings(data.bookings)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    return (
        <>
            <h2 className="my-4">Overall Bookings</h2>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell><strong> User Name</strong></TableCell>
                            <TableCell align="right"><strong>Event Name</strong></TableCell>
                            <TableCell align="right"><strong>Event Date</strong></TableCell>
                            <TableCell align="right"><strong>Child Name</strong></TableCell>
                            <TableCell align="right"><strong>Child Age</strong></TableCell>
                            <TableCell align="right"><strong>Special Needs</strong></TableCell>
                            <TableCell align="right"><strong>Emergency Contact</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {bookings.map((booking, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {booking.user.name}
                                </TableCell>
                                <TableCell align="right">{booking.event.name}</TableCell>
                                <TableCell align="right">{booking.event.date_time}</TableCell>
                                <TableCell align="right">{booking.child_name}</TableCell>
                                <TableCell align="right">{booking.child_age}</TableCell>
                                <TableCell align="right">{booking.special_needs}</TableCell>
                                <TableCell align="right">{booking.emergency_contact_no}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default Bookings;