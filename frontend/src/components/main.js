import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import AppBar from './appbar';
import FabButton from './fab';

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary">
            {'Copyright © '}
            <Link color="inherit" href="https://github.com/jlgallego99">
                Jose Luis Gallego Peña
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function Main() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
            }}
        >

            <AppBar/>
            <CssBaseline />
            <FabButton />
            <Box
                component="footer"
                sx={{
                    py: 1,
                    mt: 'auto',
                    overflow: 'hidden',
                    position: 'absolute',
                    width: '100%',
                    height: '8vh',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[200]
                            : theme.palette.grey[800],
                }}
            >
                <Container maxWidth="sm">
                    <Typography variant="body1">
                        Máster en Ingeniería Informática (UGR)
                    </Typography>
                    <Copyright />
                </Container>
            </Box>
        </Box>
    );
}