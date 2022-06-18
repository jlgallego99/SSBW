import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import RouterLink from '@mui/material/Link';

export default function ButtonAppBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
            <Toolbar>
                <Link component={RouterLink} href="/" underline="none" variant="h6" color="inherit" sx={{ flexGrow: 1 }}>Personas Falsas</Link>
                <Button color="inherit">Login</Button>
            </Toolbar>
            </AppBar>
        </Box>
    );
}