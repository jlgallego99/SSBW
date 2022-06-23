import * as React from 'react';
import { Controller, useForm } from "react-hook-form";
import { TextField, Box, Button, Select, MenuItem } from "@mui/material";
import { useNavigate } from 'react-router-dom';

export default function CrearPersona() {
    const { control, handleSubmit } = useForm({
        reValidateMode: "onBlur"
    });

    const navigate = useNavigate();

    const handleOnSubmit = (evt) => {
        console.log(evt);
        fetch("http://localhost:80/app/api/person/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(evt)
        })
            .then((response) => response.json())
            .then((r) => {
                if (r.ok) {
                    console.log("BIEN");
                    navigate("/");
                } else {
                    console.log("MAL");
                    console.log(r);
                }
            })
    }

    return (
        <Box component="form" onSubmit={handleSubmit(handleOnSubmit)} sx={{ position: 'absolute', top: '8vh', bottom: '8vh', left: 0, right: 0, overflow: 'auto', display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h2>Crear persona</h2>
            <Controller
                name="firstName"
                control={control}
                defaultValue={""}
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
                name="lastName"
                control={control}
                defaultValue={""}
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
                name="gender"
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
                name="email"
                defaultValue={""}
                rules={{
                    required: true,
                    pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
                }}
                render={({ field }) => (
                    <TextField
                        {...field}
                        sx={{ width: "25%", margin: "2vh" }}
                        required
                        type="email"
                        label="Email"
                    />
                )}
            />
            <Controller
                name="phone"
                control={control}
                defaultValue={""}
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
            <Button type="submit" id="imagenPersona" variant="contained" sx={{ margin: "2vh", marginTop: "5vh" }}>Submit</Button>
        </Box>
    );
};