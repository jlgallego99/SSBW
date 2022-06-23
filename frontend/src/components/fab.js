import * as React from 'react';
import Fab from '@mui/material/Fab';
import { GrAdd } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';

const fabStyle = {
    position: 'fixed',
    right: 0,
    bottom: '10vh',
    marginRight: 2,
};

export default function FabButton(props) {
    const navigate = useNavigate();

    return (
        <Fab sx={fabStyle} color="primary" aria-label="add" onClick={() => {navigate('/crear');}}>
            <GrAdd />         
        </Fab>
    )
}