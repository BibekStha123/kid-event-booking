import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axiosClient from '../../api/axios';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';


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
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell><strong> User Name</strong></TableCell>
                        <TableCell align="right"><strong>Event Name</strong></TableCell>
                        <TableCell align="right"><strong>Childe Name</strong></TableCell>
                        <TableCell align="right"><strong>Child Age</strong></TableCell>
                        <TableCell align="right"><strong>Special Needs</strong></TableCell>
                        <TableCell align="right"><strong>Emergency Contact</strong></TableCell>
                        <TableCell align="right"><strong>Uploaded File</strong></TableCell>
                        <TableCell align="right"><strong>Actions</strong></TableCell>
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
                            <TableCell align="right">{booking.child_name}</TableCell>
                            <TableCell align="right">{booking.child_age}</TableCell>
                            <TableCell align="right">{booking.special_needs}</TableCell>
                            <TableCell align="right">{booking.emergency_contact_no}</TableCell>
                            <TableCell align="right">
                                <a className='btn btn-outline-primary' href={`${import.meta.env.VITE_API_BASE_URL}${booking.file}`} target='_blank'>
                                    View File
                                </a>
                            </TableCell>
                            <TableCell align="right">
                                <Button variant="outlined" color='secondary'>
                                    Edit
                                </Button>&nbsp;
                                <Button variant="outlined" color='error'>
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default Bookings;

