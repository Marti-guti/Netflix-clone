import { useEffect, useState, useContext } from "react";
import CardFilm from "../components/CardFilm";
import Hero from "../components/Hero.jsx";
import { FavoritesContext } from "../context/FavouriteContext"; // importa il contesto

export default function HomePage() {
    const [films, setFilms] = useState([]);
    const { favorites, toggleFavorite } = useContext(FavoritesContext); // prendi favorites e la funzione dal context

    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const API_KEY = import.meta.env.VITE_TOKEN;

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

    const handleAddToWatchlist = (film) => {
        console.log("Added to watchlist:", film);
    };

return (
        // Wrapper per lo sfondo
        <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
            
            {/* --- MODIFICHE QUI --- */}
            {/* 1. Ho rimosso la classe 'container' per la piena larghezza */}
            {/* 2. Ho aggiunto 'px-8' (al posto di 'p-8') per avere solo padding 
                  orizzontale e 'py-12' per quello verticale */}
            <div className="mx-auto px-8 py-12"> 

                {/* --- MODIFICHE QUI --- */}
                {/* 3. Ho aggiunto '2xl:grid-cols-6' per mostrare 6 colonne 
                      su schermi molto grandi (sopra 1536px) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
                            lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 
                            gap-8 justify-items-center">

                    {films.map(film => (
                        <CardFilm
                            key={film.id}
                            film={film}
                            addToFavorites={toggleFavorite}   // usa la funzione del context
                            addToWatchlist={handleAddToWatchlist}
                            isFavorite={favorites.some(f => f.id === film.id)}  // usa favorites dal context
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
