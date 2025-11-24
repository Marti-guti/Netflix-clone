import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavouriteContext'; 

export default function CardFilm({ film }) { // Rimosso 'addToWatchlist' dalle props

    // 1. Recuperiamo anche watchlist e toggleWatchlist dal context
    const { favorites, toggleFavorite, watchlist, toggleWatchlist } = useFavorites();

    const isFavorite = favorites.some(fav => fav.id === film.id);
    
    // 2. Controlliamo se il film è già nella watchlist per cambiare l'icona/testo
    const isInWatchlist = watchlist.some(w => w.id === film.id);

    const imageUrl = film.poster_path
        ? `https://image.tmdb.org/t/p/w500${film.poster_path}`
        : "https://via.placeholder.com/500x750?text=No+Image";

    const title = film.title || film.name || "Titolo non disponibile";
    const overview = film.overview || "Nessuna descrizione disponibile.";
    
    // ... logica del testo troncato (invariata) ...
    const maxChars = 80;
    const isTruncated = overview.length > maxChars;
    const truncatedOverview = isTruncated ? overview.substring(0, maxChars) + '...' : overview;

    return (
        <div className="w-full h-full bg-white border border-gray-200 rounded-xl shadow-lg 
                        dark:bg-gray-800 dark:border-gray-700
                        flex flex-col overflow-hidden transition-transform duration-200 hover:scale-[1.02]">

            <div className="relative w-full aspect-[2/3] overflow-hidden">
                <img className="w-full h-full object-cover" src={imageUrl} alt={title} loading="lazy" />
            </div>

            <div className="p-4 flex flex-col flex-grow">
                <h2 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white leading-tight">
                    {title}
                </h2>
                
                <p className="mb-4 text-sm font-normal text-gray-700 dark:text-gray-400 line-clamp-3">
                    {truncatedOverview}
                    {isTruncated && (
                        <Link to={`/details/${film.id}`} className="ml-1 inline-block font-medium text-blue-600 dark:text-blue-500 hover:underline">
                            Altro
                        </Link>
                    )}
                </p>

                <div className="mt-auto flex gap-2">
                    <button
                        onClick={() => toggleFavorite(film)} 
                        className="flex-1 flex items-center justify-center gap-1 text-white bg-red-600 hover:bg-red-700 font-medium rounded-lg text-xs px-3 py-2 text-center dark:bg-red-500 dark:hover:bg-black-600 transition-colors"
                    >
                        {isFavorite ? '❤️' : '🤍'} <span className="hidden sm:inline">Like</span>
                    </button>
                    
                    {/* 3. Colleghiamo il tasto alla funzione toggleWatchlist */}
                    <button
                        onClick={() => toggleWatchlist(film)}
                        className={`flex-1 font-medium rounded-lg text-xs px-3 py-2 text-center transition-colors flex items-center justify-center gap-1
                            ${isInWatchlist 
                                ? "bg-green-600 hover:bg-green-700 text-white" // Stile se è aggiunto
                                : "bg-blue-600 hover:bg-blue-700 text-white"   // Stile default
                            }`}
                    >
                        {isInWatchlist ? '✔ Added' : '+ Watchlist'}
                    </button>
                </div>
            </div>
        </div>
    )
}