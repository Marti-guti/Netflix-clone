import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavouriteContext'; 


export default function CardFilm({ film, addToWatchlist }) {

   
    const { favorites, toggleFavorite } = useFavorites();

   
    const isFavorite = favorites.some(fav => fav.id === film.id);

    const imageUrl = film.poster_path
        ? `https://image.tmdb.org/t/p/w500${film.poster_path}`
        : "https://via.placeholder.com/500x750?text=No+Image";

    const title = film.title || film.name || "Titolo non disponibile";

    const overview = film.overview || "Nessuna descrizione disponibile.";
    const maxChars = 100;
    const isTruncated = overview.length > maxChars;

    const truncatedOverview = isTruncated
        ? overview.substring(0, maxChars) + '...'
        : overview;

    return (
        <div className="w-64 bg-white border border-gray-200 rounded-lg shadow-md 
                        dark:bg-gray-800 dark:border-gray-700
                        flex flex-col overflow-hidden">

            <img
                className="rounded-t-lg w-full h-80 object-cover"
                src={imageUrl}
                alt={title}
            />

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

            <div className="px-5 pb-5 flex gap-3">
                <button
                   
                    onClick={() => toggleFavorite(film)} 
                    className="fav flex-1 text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-800"
                >
                  
                    {isFavorite ? '❤️' : '🤍'} Favourite
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