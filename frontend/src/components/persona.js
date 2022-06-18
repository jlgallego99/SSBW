import * as React from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Container } from '@mui/material';

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
                console.log(p);
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
            <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Card sx={{ margin: '5vh', width: "auto" }}>
                <CardMedia
                    component="img"
                    height="140"
                    image="./public/logo512.png"
                    alt="Persona"
                />
                <CardContent sx={{  }}>
                    <Typography gutterBottom variant="h5" component="div">
                        {person.firstName} {person.lastName} ({person.gender})
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {person.email} - {person.phone}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                         
                    </Typography>
                </CardContent>
                </Card>
            </Container>

            /*<Box>
                <Typography variant="body1">
                    {person.firstName} {person.lastName}
                </Typography>
            </Box>*/
        )
    }
}
