import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Table from './table';
import AppBar from './appbar';

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein, status: "No" };
}

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
    const [rows, setRows] = React.useState([
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
    ]);

    function handleChange(event, i) {
        let nuevas_rows = [...rows];
        let sta = "No";
        if (event.target.checked) {
            sta = "Si";
        }
    
        nuevas_rows[i].status = sta;
        setRows(nuevas_rows);
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
            }}
        >

            <AppBar/>
            <CssBaseline />
            <Table rows={rows} handleChange={handleChange}/>
            <Box
                component="footer"
                sx={{
                    py: 3,
                    px: 2,
                    mt: 'auto',
                    position: 'fixed',
                    width: '100%',
                    bottom: 0,
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