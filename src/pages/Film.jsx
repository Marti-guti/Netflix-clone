import { useEffect, useState, useContext } from "react";
import CardFilm from "../components/CardFilm";
import { FavoritesContext } from "../context/FavouriteContext";

export default function Films(){
    const [films, setFilms] = useState([]);
    const { favorites, toggleFavorite } = useContext(FavoritesContext);

    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const API_KEY = import.meta.env.VITE_TOKEN;

    useEffect(() => {
        fetch(`${BASE_URL}/movie/popular?language=it-IT&page=1`, {
            headers: {
                Authorization: `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if(!res.ok) throw new Error('Errore nella fetch dei film');
            return res.json();
        })
        .then(data => setFilms(data.results || []))
        .catch(err => console.error('Error fetching films:', err));
    }, [API_KEY, BASE_URL]);

    const handleAddToWatchlist = (film) => {
        console.log('Added to watchlist:', film);
    }

    return (
        <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
            <div className="mx-auto px-8 py-12">
                <h1 className="text-3xl text-white mb-6">Film</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 justify-items-center">
                    {films.map(film => (
                        <CardFilm
                            key={film.id}
                            film={film}
                            addToFavorites={toggleFavorite}
                            addToWatchlist={handleAddToWatchlist}
                            isFavorite={favorites.some(f => f.id === film.id)}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}