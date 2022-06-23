import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Link from '@mui/material/Link';
import { Link as RouterLink } from "react-router-dom";
import { Typography } from '@mui/material';

export default function ButtonAppBar() {
    return (
        <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, overflow: 'hidden', height: '8vh' }}>
            <AppBar sx={{ height: '8vh' }}>
            <Toolbar>
                <Link component={RouterLink} to="/" underline="none" color="inherit">
                    <Typography variant="h4">
                        Personas Falsas
                    </Typography>
                </Link>
            </Toolbar>
            </AppBar>
        </Box>
    );
}