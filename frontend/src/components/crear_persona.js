import * as React from 'react';
import { Controller, useForm } from "react-hook-form";
import { TextField, Box, Button, Select, MenuItem, Input } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { FaImage } from 'react-icons/fa';
import { useState } from 'react';

var image = null;

export default function CrearPersona() {
    const { control, handleSubmit } = useForm({
        reValidateMode: "onBlur"
    });

    const [imageData, setImageData] = useState();
    const [filename, setFilename] = useState();
    const navigate = useNavigate();

    const handleFileUpload = (e) => {
        if (!e.target.files) {
            return;
        }
        const file = e.target.files[0];
        const { name } = file;
        setFilename(name);

        const reader = new FileReader();
        reader.onload = (evt) => {
            const { result } = evt.target;
            setImageData(result);
        };
        reader.readAsBinaryString(file);
    };

    const handleOnSubmit = (evt) => {
        console.log(evt);
        fetch("http://localhost:80/app/api/person/", {
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data"
            },
            body: JSON.stringify(evt)
        })
            .then((response) => response.json())
            .then((r) => {
                if (r.ok) {
                    console.log("BIEN");
                    console.log(r);
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
            <Controller
                name="image"
                control={control}
                defaultValue={""}
                render={({ field }) => (
                    <Input {...field} type="image" value="Subir" onChange={handleFileUpload} />
                )}
            />
            <Button type="submit" id="imagenPersona" variant="contained" sx={{ margin: "2vh", marginTop: "5vh" }}>Submit</Button>
        </Box>
    );
};