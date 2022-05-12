import React from "react";
import { useState, useEffect } from "react";

export default function Perro(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [imageUrl, setImageUrl] = useState(null);

    const fetchRandomDog = () => {
        setIsLoading(true);
        fetch("https://dog.ceo/api/breeds/image/random")
            .then((response) => response.json())
            .then((dog) => {
                setImageUrl(dog.message);
                setIsLoading(false);
            });
    };
    useEffect(fetchRandomDog, []);

    if (isLoading) {
        return (
            <>
                <h1>Cargando...</h1>
            </>
        )
    } else {
        return (
            <>
                <h1>Perro</h1>
                <img src={imageUrl} alt="Perro" />
                <button onClick={fetchRandomDog}>
                    MÁS PERRO
                </button>
            </>
        )
    }
}