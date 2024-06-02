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

function Parents(props) {
    const [parents, setParents] = useState([]);

    useEffect(() => {
        axiosClient.get('/get-parents')
            .then(({ data }) => {
                setParents(data.parents)
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
                        <TableCell><strong> Name</strong></TableCell>
                        <TableCell align="right"><strong>Email</strong></TableCell>
                        <TableCell align="right"><strong>Address</strong></TableCell>
                        <TableCell align="right"><strong>Contact Number</strong></TableCell>
                        {/* <TableCell align="right"><strong>Actions</strong></TableCell> */}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {parents.map((parent, index) => (
                        <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {parent.name}
                            </TableCell>
                            <TableCell align="right">{parent.email}</TableCell>
                            <TableCell align="right">{parent.address}</TableCell>
                            <TableCell align="right">{parent.contact_no}</TableCell>
                            {/* <TableCell align="right">
                                <Button variant="outlined" color='secondary'>
                                    Edit
                                </Button>&nbsp;
                                <Button variant="outlined" color='error'>
                                    Delete
                                </Button>
                            </TableCell> */}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default Parents;