import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export default function BasicTable(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [persons, setPersons] = useState(null);
    const navigate = useNavigate();

    const fetchPersonList = () => {
        setIsLoading(true);
        fetch("http://localhost:80/app/api/person/")
            .then((response) => response.json())
            .then((p) => {
                setPersons(p);
                setIsLoading(false);
            });
    };
    useEffect(fetchPersonList, []);

    const onClickPersona = (id) => {
        console.log(id)
        navigate(`/persona/${id}`);
    }

    if (isLoading) {
        return (
            <>
                <h1>Cargando...</h1>
            </>
        )
    } else {
        return (
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" sx={{ fontSize: 'x-large' }}><strong>First Name</strong></TableCell>
                            <TableCell align="center" sx={{ fontSize: 'x-large' }}><strong>Last Name</strong></TableCell>
                            <TableCell align="center" sx={{ fontSize: 'x-large' }}><strong>Email</strong></TableCell>
                            <TableCell align="center" sx={{ fontSize: 'x-large' }}><strong>Phone</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {persons.map((person, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                onClick={() => onClickPersona(person.id)}
                                hover={true}
                            >
                                <TableCell align="center" component="th" scope="person">
                                    {person.firstName}
                                </TableCell>
                                <TableCell align="center">{person.lastName}</TableCell>
                                <TableCell align="center">{person.email}</TableCell>
                                <TableCell align="center">{person.phone}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}
