import React from 'react';

import { Play, Info } from 'lucide-react';

/**
 * Dati mock per il film in evidenza
 * In un'app reale, questi dati arriverebbero da un'API.
 */
const featuredMovie = {
  title: "Cyberpulse: Echoes of Neon",
  description: "In una metropoli distopica illuminata al neon, un hacker solitario scopre un segreto che potrebbe rovesciare il governo corporativo. Ma ogni bit di dati ha un prezzo di sangue.",
  // Immagine cinematografica da Pexels
  imageUrl: "https://images.pexels.com/photos/3137890/pexels-photo-3137890.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
};

/**
 * Il componente Hero che mostra il film in evidenza
 */
function Hero() {
  return (
    // Contenitore principale con altezza definita (80% della viewport)
    // Usiamo 'relative' per posizionare gli overlay e il contenuto al suo interno
    <div className="relative h-[80vh] min-h-[500px] w-full text-white">
      
      {/* 1. Immagine di Sfondo */}
      <img
        src={featuredMovie.imageUrl}
        alt={featuredMovie.title}
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />

      {/* 2. Overlay con Gradiente (da sinistra a destra) */}
      {/* Questo scurisce il lato sinistro per rendere il testo più leggibile */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />

      {/* 3. Overlay con Gradiente (dal basso verso l'alto) */}
      {/* Questo sfuma il fondo dell'immagine, stile Netflix */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent" />

      {/* 4. Contenuto Testuale */}
      {/* Posizionato assolutamente e centrato verticalmente a sinistra */}
      <div className="absolute inset-0 flex flex-col justify-center p-8 md:p-16 lg:p-24 w-full md:w-2/3 lg:w-1/2">
        
        {/* Titolo del Film */}
        {/* Usiamo un font grande e grassetto con un'ombra per farlo risaltare */}
        <h1 
          className="text-4xl md:text-6xl font-black uppercase tracking-wider"
          // Un'ombra del testo personalizzata dà più profondità
          style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}
        >
          {featuredMovie.title}
        </h1>
        
        {/* Descrizione */}
        <p className="mt-4 text-lg md:text-xl text-white/90 max-w-xl line-clamp-3">
          {featuredMovie.description}
        </p>

        {/* 5. Bottoni di Azione */}
        <div className="mt-6 flex flex-row gap-4">
          {/* Bottone "Play" */}
          <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-md hover:bg-white/80 transition duration-200">
            <Play className="h-6 w-6" fill="black" />
            <span>Play</span>
          </button>
          
          {/* Bottone "Altre Info" */}
          <button className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-600/70 text-white font-bold rounded-md hover:bg-gray-600/50 transition duration-200">
            <Info className="h-6 w-6" />
            <span>Altre Info</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hero;