import React, { createContext, useState, useEffect, useContext } from "react";

export const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  // --- GESTIONE PREFERITI (esistente) ---
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (film) => {
    setFavorites(prev => {
      const isFav = prev.some(f => f.id === film.id);
      if (isFav) return prev.filter(f => f.id !== film.id);
      return [...prev, film];
    });
  };

  // --- GESTIONE WATCHLIST (nuova) ---
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem("watchlist");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  const toggleWatchlist = (film) => {
    setWatchlist(prev => {
      const isInList = prev.some(f => f.id === film.id);
      if (isInList) return prev.filter(f => f.id !== film.id);
      return [...prev, film];
    });
  };

  return (
    // Esportiamo sia favorites che watchlist (e le relative funzioni)
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, watchlist, toggleWatchlist }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => {
  return useContext(FavoritesContext);
};