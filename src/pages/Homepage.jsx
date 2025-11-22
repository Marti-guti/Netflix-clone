import { useEffect, useState, useContext } from "react";
import CardFilm from "../components/CardFilm";
import Hero from "../components/Hero.jsx";
import { FavoritesContext } from "../context/FavouriteContext";

export default function HomePage() {
    // 1. Rinominiamo 'films' in 'popularFilms' per chiarezza e aggiungiamo 'topRatedFilms'
    const [popularFilms, setPopularFilms] = useState([]);
    const [topRatedFilms, setTopRatedFilms] = useState([]);
    
    const { favorites, toggleFavorite } = useContext(FavoritesContext);

    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const API_KEY = import.meta.env.VITE_TOKEN;

    // Funzione di fetch riutilizzabile per non scrivere codice doppio
    const fetchMovies = async (endpoint, setState) => {
        try {
            const response = await fetch(`${BASE_URL}${endpoint}?language=it-IT&page=1`, {
                headers: {
                    Authorization: `Bearer ${API_KEY}`,
                    'Content-Type': "application/json",
                },
            });
            if (!response.ok) throw new Error("Errore nella fetch");
            const data = await response.json();
            setState(data.results);
        } catch (error) {
            console.error(`Error fetching ${endpoint}:`, error);
        }
    };

    useEffect(() => {
        // 2. Chiamiamo entrambe le API
        fetchMovies('/movie/popular', setPopularFilms);
        fetchMovies('/movie/top_rated', setTopRatedFilms);
    }, [API_KEY, BASE_URL]);

    const handleAddToWatchlist = (film) => {
        console.log("Added to watchlist:", film);
    };

    // Componente interno per evitare di duplicare tutto l'HTML della griglia
    // Questo rende il codice sotto molto più pulito
    const MovieSection = ({ title, movies }) => (
        <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 pl-4 border-l-4 border-red-600">
                {title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
                            lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 
                            gap-8 justify-items-center">
                {movies.map(film => (
                    <CardFilm
                        key={film.id}
                        film={film}
                        // Nota: CardFilm usa già il context internamente per i preferiti, 
                        // ma li passo comunque per coerenza col tuo codice precedente
                        addToFavorites={toggleFavorite}
                        addToWatchlist={handleAddToWatchlist}
                        isFavorite={favorites.some(f => f.id === film.id)}
                    />
                ))}
            </div>
        </div>
    );

    return (
        <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
            <Hero />

            <div className="mx-auto px-8 py-12">
                
                {/* 3. Renderizziamo le due sezioni usando il componente creato sopra */}
                
                {/* Sezione Popolari */}
                <MovieSection title="I più popolari su Bedflix" movies={popularFilms} />

                {/* Sezione Top Rated */}
                <MovieSection title="I più votati dalla critica" movies={topRatedFilms} />

            </div>
        </div>
    );
}