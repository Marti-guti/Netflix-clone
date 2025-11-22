// src/context/FavoritesContext.jsx
import React, { createContext, useState, useEffect } from "react";
import { useContext } from "react";

export const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
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

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => {
  return useContext(FavoritesContext);
};