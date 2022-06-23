import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IconButton } from '@mui/material';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';

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

    const eliminarPersona = (event, id) => {
        event.stopPropagation()

        fetch("http://localhost:80/app/api/person/" + id, {
            method: "DELETE",
        })
        .then((response) => response.json())
        .then((r) => {
            if (r.deleted) {
                fetchPersonList();
                console.log("deletado");
            }
        });
    }

    const onClickPersona = (id) => {
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
            <TableContainer component={Paper} sx={{ position: 'absolute', top: '8vh', bottom: '8vh', left: 0, right: 0, overflow: 'auto' }}>
                <Table sx={{ height: 'max-content' }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" sx={{ fontSize: 'x-large' }}><strong>First Name</strong></TableCell>
                            <TableCell align="center" sx={{ fontSize: 'x-large' }}><strong>Last Name</strong></TableCell>
                            <TableCell align="center" sx={{ fontSize: 'x-large' }}><strong>Email</strong></TableCell>
                            <TableCell align="center" sx={{ fontSize: 'x-large' }}><strong>Phone</strong></TableCell>
                            <TableCell align="center"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {persons.map((person, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }}
                                onClick={() => onClickPersona(person.id)}
                                hover={true}
                            >
                                <TableCell align="center" component="th" scope="person">
                                    {person.firstName}
                                </TableCell>
                                <TableCell align="center">{person.lastName}</TableCell>
                                <TableCell align="center">{person.email}</TableCell>
                                <TableCell align="center">{person.phone}</TableCell>
                                <TableCell align="left">
                                    <IconButton color="error" component="span" onClick={(event) => eliminarPersona(event, person.id)} >
                                        <MdDelete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}
