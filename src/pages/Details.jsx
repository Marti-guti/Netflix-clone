// In pages/Details.jsx
import { Navigate, useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { FavoritesContext } from '../context/FavouriteContext';

export default function Details() {
   
    const { filmId } = useParams();
    const { favorites, toggleFavorite } = useContext(FavoritesContext);
    
    const [filmDetails, setFilmDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    const BASE_URL = import.meta.env.VITE_BASE_URL
    const API_KEY = import.meta.env.VITE_TOKEN

    useEffect(() => {
        
        const fetchDetails = async () => {
            try {
                setLoading(true);
                

                const response = await fetch(
                    `${BASE_URL}/movie/${filmId}?language=it-IT`, {
                        headers: { 
                            Authorization: `Bearer ${API_KEY}`,
                            'Content-Type': "application/json",
                        }
                    }
                );
               

                if (!response.ok) {
                    throw new Error(`Errore HTTP: ${response.status}`);
                }

                const data = await response.json();
                setFilmDetails(data);
            } catch (error) {
                console.error("Errore nel caricamento dettagli:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
  
    }, [filmId, BASE_URL, API_KEY]); 

    if (loading) {
       
        return (
            <div className="flex justify-center items-center min-h-[60vh] dark:text-white">
                <div className="text-center p-10 text-xl">Caricamento...</div>
            </div>
        );
    }

    if (!filmDetails || filmDetails.success === false) { 
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="text-center p-10 text-xl text-red-500">Film non trovato.</div>
            </div>
        );
    }

    const imageUrl = filmDetails.poster_path
        ? `https://image.tmdb.org/t/p/w500${filmDetails.poster_path}`
        : "https://via.placeholder.com/500x750?text=No+Image";

    const isFavorite = favorites.some(f => f.id === filmDetails.id);

    return (
        // Aggiunto wrapper per lo sfondo coerente con HomePage
        <div className="py-12 min-h-screen">
            {/* Card centrale per contenere i dettagli */}
            <div className="container mx-auto p-6 max-w-4xl card-modern">
                <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                        <h1 className="text-4xl font-extrabold mb-1 text-white">{filmDetails.title}</h1>
                        <p className="text-sm text-gray-300">{filmDetails.tagline}</p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                    <img 
                        src={imageUrl} 
                        alt={filmDetails.title} 
                        className="w-full md:w-1/3 rounded-xl shadow-lg object-cover self-start" 
                    />
                    <div className="md:w-2/3">
                        <h2 className="text-2xl font-semibold mb-3 text-white">Trama</h2>
                        <p className="text-gray-300 leading-relaxed">{filmDetails.overview}</p>

                        <h3 className="text-xl font-semibold mt-6 mb-2 text-white">Dettagli</h3>
                        <ul className="list-inside space-y-2 text-gray-300">
                            <li><strong>Data di Rilascio:</strong> {filmDetails.release_date}</li>
                            <li><strong>Voto:</strong> {filmDetails.vote_average.toFixed(1)} / 10</li>
                            <li><strong>Generi:</strong> {filmDetails.genres.map(g => g.name).join(', ')}</li>
                        </ul>

                        <div className="mt-6 flex items-center gap-3">
                            <button
                                onClick={() => toggleFavorite(filmDetails)}
                                className="fav btn-primary text-sm px-5 py-2.5"
                            >
                                {isFavorite ? '❤️' : '🤍'} Favourite
                            </button>

                            <button
                                onClick={() => window.history.back()}
                                className="btn-ghost text-sm px-4 py-2"
                            >
                                Torna indietro
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}