import { useContext } from "react";
import { Link } from "react-router-dom";
import CardFilm from "../components/CardFilm";
import { FavoritesContext } from "../context/FavouriteContext"; // importa il context

export default function FavoritesPage() {
  const { favorites, toggleFavorite } = useContext(FavoritesContext); // prendi dal context

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      <div className="mx-auto px-8 py-12">
        <h1 className="text-3xl font-bold mb-6 dark:text-white">I miei Preferiti</h1>
        {favorites.length === 0 ? (
          <p className="text-gray-700 dark:text-gray-400">
            Non hai ancora aggiunto film ai preferiti. <Link to="/">Vai alla Home</Link>
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
                          lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 justify-items-center">
            {favorites.map(film => (
              <CardFilm
                key={film.id}
                film={film}
                addToFavorites={toggleFavorite}  // usa la funzione dal context
                isFavorite={true}  // qui sicuramente è preferito
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
