import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Persona() {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [person, setPerson] = useState(null);
    const navigate = useNavigate();

    const fetchPersonList = () => {
        setIsLoading(true);
        fetch("http://localhost:80/app/api/person/" + id)
            .then((response) => response.json())
            .then((p) => {
                setPerson(p);
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
            <Box>
                <Typography variant="body1">
                    {person.firstName} {person.lastName}
                </Typography>
            </Box>
        )
    }
}