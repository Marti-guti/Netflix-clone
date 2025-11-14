// In pages/Details.jsx
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Details() {
   
    const { filmId } = useParams();
    
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

    return (
        // Aggiunto wrapper per lo sfondo coerente con HomePage
        <div className="bg-gray-100 dark:bg-gray-900 py-12 min-h-screen">
            {/* Card centrale per contenere i dettagli */}
            <div className="container mx-auto p-8 max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow-xl">
                <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">{filmDetails.title}</h1>
                <p className="text-lg italic text-gray-600 dark:text-gray-400 mb-6">{filmDetails.tagline}</p>
                
                <div className="flex flex-col md:flex-row gap-8">
                    <img 
                        src={imageUrl} 
                        alt={filmDetails.title} 
                        className="w-full md:w-1/3 rounded-lg shadow-lg object-cover self-start" // self-start per allineare in alto
                    />
                    <div className="md:w-2/3">
                        <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">Trama</h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{filmDetails.overview}</p>
                        
                        <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-900 dark:text-white">Dettagli</h3>
                        <ul className="list-inside space-y-2 text-gray-700 dark:text-gray-300">
                            <li><strong>Data di Rilascio:</strong> {filmDetails.release_date}</li>
                            <li><strong>Voto:</strong> {filmDetails.vote_average.toFixed(1)} / 10</li>
                            {/* Aggiunti i generi, che sono utili */}
                            <li><strong>Generi:</strong> {filmDetails.genres.map(g => g.name).join(', ')}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}