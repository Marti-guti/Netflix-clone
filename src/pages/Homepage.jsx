import { useEffect, useState } from "react";
import CardFilm from "../components/CardFilm";

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
    }, []);

    const handleAddToFavorites = (film) => {
        console.log("Added to favourites:", film);
    };

    const handleAddToWatchlist = (film) => {
        console.log("Added to watchlist:", film);
    };

    return (
        <div className="film-list  grid grid-cols-3 gap-4">
            {films.map(film => (
                <CardFilm
                    key={film.id}
                    film={film}
                    addToFavorites={handleAddToFavorites}
                    addToWatchlist={handleAddToWatchlist}
                />
            ))}
        </div>
    );
}
