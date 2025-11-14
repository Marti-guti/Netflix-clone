import { Link } from 'react-router-dom';

export default function CardFilm({ film, addToFavorites, addToWatchlist }) {

    const imageUrl = film.poster_path
        ? `https://image.tmdb.org/t/p/w500${film.poster_path}`
        : "https://via.placeholder.com/500x750?text=No+Image";

    const title = film.title || film.name || "Titolo non disponibile";

    // --- Logica per troncare il testo ---
    const overview = film.overview || "Nessuna descrizione disponibile.";
    const maxChars = 100; // Imposta il limite di caratteri
    const isTruncated = overview.length > maxChars;

    // Tronca il testo solo se necessario
    const truncatedOverview = isTruncated
        ? overview.substring(0, maxChars) + '...'
        : overview;
    // --- Fine logica troncamento ---

return (
        // --- MODIFICHE QUI ---
        // Ho cambiato w-72 con w-64 per rimpicciolire la card
        <div className="w-64 bg-white border border-gray-200 rounded-lg shadow-md 
                        dark:bg-gray-800 dark:border-gray-700
                        flex flex-col overflow-hidden">
            
            {/* // Ho cambiato h-96 con h-80 per adattare l'immagine alla nuova larghezza */}
            <img 
                className="rounded-t-lg w-full h-80 object-cover" // <-- MODIFICA QUI
                src={imageUrl} 
                alt={title} 
            />
            
            {/* Il resto del file rimane invariato... */}
            <div className="p-5 flex-grow">
                <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {title}
                </h2>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {truncatedOverview}
                    {isTruncated && (
                        <Link 
                            to={`/details/${film.id}`}
                            className="ml-1 inline-block font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                            Continua a leggere
                        </Link>
                    )}
                </p>
            </div>
            
            {/* BOTTONI (Wrapper) */}
            {/* Questo div non ha flex-grow, quindi viene spinto in fondo */}
            <div className="px-5 pb-5 flex gap-3">
                <button 
                    onClick={() => addToFavorites(film)}
                    className="fav flex-1 text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-800"
                >
                    Favourite
                </button>
                <button 
                    onClick={() => addToWatchlist(film)}
                    className="watch flex-1 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
                >
                    Watchlist
                </button>
            </div>
        </div>
    )
}