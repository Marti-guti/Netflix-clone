import { useEffect, useState, useContext } from "react";
import CardFilm from "../components/CardFilm";
import Hero from "../components/Hero.jsx";
import { FavoritesContext } from "../context/FavouriteContext";

export default function HomePage() {
    const [popularFilms, setPopularFilms] = useState([]);
    const [topRatedFilms, setTopRatedFilms] = useState([]);
    
    const { toggleFavorite, favorites } = useContext(FavoritesContext);

    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const API_KEY = import.meta.env.VITE_TOKEN;

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
        fetchMovies('/movie/popular', setPopularFilms);
        fetchMovies('/movie/top_rated', setTopRatedFilms);
    }, []);

    const handleAddToWatchlist = (film) => {
        console.log("Added to watchlist:", film);
    };

    const MovieSection = ({ title, movies }) => (
        <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 border-l-4 border-red-600 pl-4">
                {title}
            </h2>
            {/* Griglia responsive corretta */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-items-center">
                {movies.map(film => (
                    <CardFilm
                        key={film.id}
                        film={film}
                        addToWatchlist={handleAddToWatchlist}
                    />
                ))}
            </div>
        </div>
    );

    return (
        <div className="bg-[#141414] min-h-screen flex flex-col">
            {/* Hero Section in alto */}
            <Hero />

            {/* Contenitore principale delle liste */}
            {/* z-10 e relative assicurano che il contenuto stia SOPRA lo sfondo, se mai ci fossero sovrapposizioni */}
            <div className="relative z-10 container mx-auto px-4 mt-8 pb-10">
                <MovieSection title="Popolari su Bedflix" movies={popularFilms} />
                <MovieSection title="I più votati" movies={topRatedFilms} />
            </div>
        </div>
    );
}   