import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import axiosClient from '../../../api/axios';
import { toast } from 'react-toastify';

function Children(props) {

    const [children, setChildren] = useState([]);
    const [loading, setLoading] = useState(true)

    const getChildren = () => {
        axiosClient.get('/children')
            .then(({ data }) => {
                setChildren(data.children)
                setLoading(false)
            })
            .catch((error) => {
                console.error(error)
            })
    }

    useEffect(() => {
        getChildren()
    }, [])

    const deleteChildren = (childId) => {
        if (confirm("Are you sure you want to delete?")) {
            axiosClient.delete(`/children/${childId}`)
                .then(({ data }) => {
                    toast.success(data.message)
                    getChildren()
                })
                .catch((error) => {
                    console.error(error)
                })
        }
    }

    return (
        <>
            <Button variant="outlined" color='primary' component={Link} to="/add-children">
                Add Children
            </Button>
            <br />
            <br />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell><strong> Name</strong></TableCell>
                            <TableCell align="right"><strong>Gender</strong></TableCell>
                            <TableCell align="right"><strong>Date of Birth</strong></TableCell>
                            <TableCell align="right"><strong>Age</strong></TableCell>
                            <TableCell align="right"><strong>Actions</strong></TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {loading ?
                            <TableRow>
                                <TableCell align='center'> Loading...</TableCell>
                            </TableRow>
                            :
                            children.map((ch, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {ch.name}
                                    </TableCell>
                                    <TableCell align="right">{ch.gender}</TableCell>
                                    <TableCell align="right">{ch.dob}</TableCell>
                                    <TableCell align="right">{ch.age}</TableCell>
                                    <TableCell align="right">
                                        <Button variant="outlined" color='error' onClick={() => deleteChildren(ch.id)}>
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))

                        }
                    </TableBody>

                </Table>
            </TableContainer>
        </>
    );
}

export default Children;