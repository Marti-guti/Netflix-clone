// In /pages/HomePage.jsx

import { useEffect, useState } from "react";
import CardFilm from "../components/CardFilm";
import Hero from "../components/Hero.jsx";

export default function HomePage() {
    const [films, setFilms] = useState([]);
   
    const BASE_URL = import.meta.env.VITE_BASE_URL
    const API_KEY = import.meta.env.VITE_TOKEN

    useEffect(() => {
        fetch(`${BASE_URL}/movie/popular?language=it-IT&page=1`, {
            headers: {
                Authorization: `Bearer ${API_KEY}`,
                'Content-Type': "application/json",
            },
        })
            .then(response => {
                if (!response.ok) throw new Error("Errore nella fetch");
                return response.json();
            })
            .then(data => setFilms(data.results))
            .catch(error => console.error("Error fetching films:", error));
    }, [API_KEY, BASE_URL]);

    const handleAddToFavorites = (film) => {
        console.log("Added to favourites:", film);
    };

    const handleAddToWatchlist = (film) => {
        console.log("Added to watchlist:", film);
    };

return (
        // 2. CAMBIA lo sfondo da grigio a nero per lo stile Netflix
        <div className="bg-black min-h-screen">
            
            {/* 3. AGGIUNGI il componente Hero qui! */}
            <Hero />

            {/* 4. Questa è la tua griglia di film */}
            {/* Aggiungiamo -mt-20 e z-10 per sovrapporla leggermente
                al fondo sfumato della Hero, stile Netflix */}
            <div className="mx-auto px-8 py-12 relative z-10 -mt-20"> 

                {/* Aggiungi un titolo per la sezione dei film */}
                <h2 className="text-3xl font-bold text-white mb-6">Popolari ora</h2>
                
                {/* La tua griglia di film (già corretta) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
                            lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 
                            gap-8 justify-items-center">
                    
                    {films.map(film => (
                        <CardFilm
                            key={film.id}
                            film={film}
                            addToFavorites={handleAddToFavorites}
                            addToWatchlist={handleAddToWatchlist}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}