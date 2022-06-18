import * as React from 'react';
import Fab from '@mui/material/Fab';
import { GrAdd } from 'react-icons/gr';

const fabStyle = {
    position: 'absolute',
    bottom: 16,
    right: 16,
};

export default function FabButton(props) {
    return (
        <Fab sx={fabStyle} color="primary" aria-label="add">
            <GrAdd sx={{ color: 'white' }} />         
        </Fab>
    )
}