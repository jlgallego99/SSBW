import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';

export default function Persona() {
    const { id } = useParams();

    return (
        <Box>
            <Typography variant="body1">
                {id}
            </Typography>
        </Box>
    )
}