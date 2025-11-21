import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Info } from 'lucide-react';

function Hero() {
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMovie() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_URL}/trending/movie/day?language=it-IT`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
              'Content-Type': 'application/json',
            },
          }
        );

        const data = await res.json();

        if (!data.results || data.results.length === 0) {
          throw new Error("Nessun film disponibile");
        }

        // Film random dai trending
        const randomMovie =
          data.results[Math.floor(Math.random() * data.results.length)];

        // Preferisco backdrop, poi poster, altrimenti uso placeholder
        const imagePath = randomMovie.backdrop_path || randomMovie.poster_path;
        const imageUrl = imagePath
          ? `https://image.tmdb.org/t/p/original${imagePath}`
          : "https://via.placeholder.com/1280x720?text=No+Image";

        if (!imagePath) console.warn('Hero: film senza immagine:', randomMovie.id, randomMovie.title || randomMovie.name);

        setFeaturedMovie({
          id: randomMovie.id,
          title: randomMovie.title || randomMovie.name || 'Titolo non disponibile',
          description: randomMovie.overview || 'Nessuna descrizione disponibile.',
          imageUrl,
        });
      } catch (err) {
        console.error("Errore API TMDB:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchMovie();
  }, []);

  if (loading) {
    return (
      <div className="h-[80vh] flex items-center justify-center text-white">
        Caricamento...
      </div>
    );
  }

  if (!featuredMovie) {
    return (
      <div className="h-[80vh] flex items-center justify-center text-red-500">
        Nessun film disponibile
      </div>
    );
  }

  console.log('Immagine filmL:', featuredMovie.imageUrl);

  return (
    <div
      className="relative h-[80vh] min-h-[500px] w-full text-white bg-center bg-cover"
      style={{ backgroundImage: `url(${featuredMovie.imageUrl})` }}
    >

      {/* Gradienti */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/70 to-transparent" />

      {/* Contenuto */}
      <div className="absolute inset-0 flex flex-col justify-center p-8 md:p-16 lg:p-24 w-full md:w-2/3 lg:w-1/2">

        <h1
          className="text-4xl md:text-6xl font-black uppercase tracking-wider"
          style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}
        >
          {featuredMovie.title}
        </h1>

        <p className="mt-4 text-lg md:text-xl text-white/90 max-w-xl line-clamp-3">
          {featuredMovie.description}
        </p>

        <div className="mt-6 flex flex-row gap-4">
          <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-md hover:bg-white/80 transition duration-200">
            <Play className="h-6 w-6" fill="black" />
            <span>Play</span>
          </button>

          <InfoButton featuredMovie={featuredMovie} />
        </div>
      </div>
    </div>
  );
}

function InfoButton({ featuredMovie }){
  const navigate = useNavigate();

  if(!featuredMovie) return (
    <button className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-600/50 text-white font-bold rounded-md" disabled>
      <Info className="h-6 w-6" />
      <span>Altre Info</span>
    </button>
  );

  return (
    <button
      onClick={() => navigate(`/details/${featuredMovie.id}`)}
      className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-600/70 text-white font-bold rounded-md hover:bg-gray-600/50 transition duration-200"
    >
      <Info className="h-6 w-6" />
      <span>Altre Info</span>
    </button>
  )
}

export default Hero;
