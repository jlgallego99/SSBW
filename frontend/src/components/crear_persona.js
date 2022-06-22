import * as React from 'react';
import { Controller, useForm } from "react-hook-form";
import { TextField, Box, Button, Select, MenuItem,  } from "@mui/material";

export default function CrearPersona() {
    const { control, handleSubmit } = useForm({
        reValidateMode: "onBlur"
    });

    const handleOnSubmit = (evt) => {
        console.log(evt);
    }

    return (
        <Box component="form" onSubmit={handleSubmit(handleOnSubmit)} sx={{ position: 'absolute', top: '8vh', bottom: '8vh', left: 0, right: 0, overflow: 'auto', display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h2>Crear persona</h2>
            <Controller
                name="Nombre"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        sx={{ width: "25%", margin: "2vh" }}
                        required
                        size="medium"
                        variant="outlined"
                        label="Nombre"
                    />
                )}
            />
            <Controller
                name="Apellidos"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        sx={{ width: "25%", margin: "2vh" }}
                        required
                        size="medium"
                        variant="outlined"
                        label="Apellidos"
                    />
                )}
            />
            <Controller
                control={control}
                name="Genero"
                defaultValue={"male"}
                render={({ field }) => (
                    <Select {...field} sx={{ width: "25%", margin: "2vh" }}>
                        <MenuItem value="male">male</MenuItem>
                        <MenuItem value="female">female</MenuItem>
                    </Select>
                )}
            />
            <Controller
                control={control}
                name="Email"
                rules={{
                    required: true,
                    pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
                }}
                render={({ field, fieldState: { error } }) => (
                    <TextField
                        {...field}
                        sx={{ width: "25%", margin: "2vh" }}
                        required
                        type="email"
                        label="Email"
                        error={error !== undefined}
                    />
                )}
            />
            <Controller
                name="Telefono"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        sx={{ width: "25%", margin: "2vh" }}
                        required
                        size="medium"
                        variant="outlined"
                        label="Telefono"
                    />
                )}
            />
            <Button type="submit" variant="contained" sx={{ margin: "2vh" }}>Submit</Button>
        </Box>
    );
};