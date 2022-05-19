import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from "react";

export default function BasicTable(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [persons, setPersons] = useState(null);

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
                            <TableCell align="right">First Name</TableCell>
                            <TableCell align="right">Last Name</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {persons.map((person, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="person">
                                    {person.firstName}
                                </TableCell>
                                <TableCell align="right">{person.lastName}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}
