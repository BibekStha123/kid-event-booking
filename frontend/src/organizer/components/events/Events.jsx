import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axiosClient from '../../../api/axios';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function Events(props) {

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true)

    const getEvents = () => {
        axiosClient.get('/events')
            .then(({ data }) => {
                setEvents(data.events)
                setLoading(false)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        getEvents()
    }, [])

    const deleteEvent = (eventId) => {
        if (confirm("Are you sure you want to delete?")) {
            axiosClient.delete('/events/' + eventId)
                .then(({ data }) => {
                    toast.success(data.message)
                    getEvents()
                })
                .catch((error) => {
                    console.error(error)
                })
        }
    }

    return (
        <>
            <Button variant="outlined" color='primary' component={Link} to="/create-event">
                Create Event
            </Button>
            <br />
            <br />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell><strong> Name</strong></TableCell>
                            <TableCell align="right"><strong>Event Time</strong></TableCell>
                            <TableCell align="right"><strong>Location</strong></TableCell>
                            <TableCell align="right"><strong>Child Age</strong></TableCell>
                            <TableCell align="right"><strong>Fees</strong></TableCell>
                            <TableCell align="right"><strong>Description</strong></TableCell>
                            <TableCell align="right"><strong>Actions</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            loading ?
                                <TableRow>
                                    <TableCell align='center'> Loading...</TableCell>
                                </TableRow>
                                :
                                events.map((event, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {event.name}
                                        </TableCell>
                                        <TableCell align="right">{event.date_time}</TableCell>
                                        <TableCell align="right">{event.location}</TableCell>
                                        <TableCell align="right">{event.age}</TableCell>
                                        <TableCell align="right">{event.amount}</TableCell>
                                        <TableCell align="right">{event.description}</TableCell>
                                        <TableCell align="right">
                                            <Button variant="outlined" color='secondary' component={Link} to={`/event/${event.id}`}>
                                                Edit
                                            </Button>&nbsp;
                                            <Button variant="outlined" color='error' onClick={() => deleteEvent(event.id)}>
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default Events;