import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CardFilm from "../components/CardFilm";

export default function ResearchResult() {
  const [films, setFilms] = useState([]);
  const location = useLocation();

  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const API_KEY = import.meta.env.VITE_TOKEN;

  // Prendi la query dai parametri
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query");

  useEffect(() => {
    if (!searchQuery) return;

    fetch(`${BASE_URL}/search/movie?query=${encodeURIComponent(searchQuery)}&language=it-IT&page=1`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
    })
      .then(res => {
        if (!res.ok) throw new Error("Errore nella fetch");
        return res.json();
      })
      .then(data => setFilms(data.results))
      .catch(err => console.error("Error fetching search results:", err));
  }, [searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      <h1 className="text-white text-xl mb-4">
        Risultati per: <span className="text-red-600">{searchQuery}</span>
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {films.length > 0 ? (
          films.map(film => (
            <CardFilm
              key={film.id}
              film={film}
              addToFavorites={() => console.log("Favorito:", film)}
              addToWatchlist={() => console.log("Watchlist:", film)}
            />
          ))
        ) : (
          <p className="text-gray-400 col-span-full">Nessun risultato trovato.</p>
        )}
      </div>
    </div>
  );
}
