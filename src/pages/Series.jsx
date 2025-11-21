import { useEffect, useState, useContext } from "react";
import CardFilm from "../components/CardFilm";
import { FavoritesContext } from "../context/FavouriteContext";

export default function Series(){
    const [series, setSeries] = useState([]);
    const { favorites, toggleFavorite } = useContext(FavoritesContext);

    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const API_KEY = import.meta.env.VITE_TOKEN;

    useEffect(() => {
        // Carico le serie TV (endpoint /tv/* restituisce solo tv)
        fetch(`${BASE_URL}/tv/popular?language=it-IT&page=1`, {
            headers: {
                Authorization: `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if(!res.ok) throw new Error('Errore nella fetch delle serie');
            return res.json();
        })
        .then(data => {
            setSeries(data.results || []);
        })
        .catch(err => console.error('Error fetching series:', err));
    }, [API_KEY, BASE_URL]);

    const handleAddToWatchlist = (item) => {
        console.log('Added to watchlist:', item);
    }

    return (
        <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
            <div className="mx-auto px-8 py-12">
                <h1 className="text-3xl text-white mb-6">Serie TV</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 justify-items-center">
                    {series.map(item => (
                        <CardFilm
                            key={item.id}
                            film={item}
                            addToFavorites={toggleFavorite}
                            addToWatchlist={handleAddToWatchlist}
                            isFavorite={favorites.some(f => f.id === item.id)}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}