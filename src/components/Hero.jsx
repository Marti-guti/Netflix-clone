import React from 'react';
import { Play, Info } from 'lucide-react';
 
const featuredMovie = {
  title: "Chainsaw Man",
  description: "Denji è diventato Chainsaw Man, il ragazzo con il cuore del demone Pochita, ed è entrato nella Quarta divisione speciale dei Devil Hunters.",
  imageUrl: "/assets/chainsawman-hero.png" // Usa il percorso corretto dell'immagine nella cartella public
};

function Hero() {
  return (
    <div className="relative h-[80vh] min-h-[500px] w-full text-white">
      
              <img
        src={featuredMovie.imageUrl}
        alt={featuredMovie.title}
        className="absolute inset-0 h-full w-full object-cover"
      />

              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#141414] to-transparent" />

              <div className="absolute inset-0 flex flex-col justify-center p-8 md:p-16 lg:p-24 w-full md:w-2/3 lg:w-1/2">
        <h1 
          className="text-4xl md:text-6xl font-black uppercase tracking-wider drop-shadow-lg"
        >
          {featuredMovie.title}
        </h1>
        
        <p className="mt-4 text-lg md:text-xl text-white/90 max-w-xl line-clamp-3 drop-shadow-md">
          {featuredMovie.description}
        </p>

        <div className="mt-6 flex flex-row gap-4">
          <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-md hover:bg-white/80 transition duration-200">
            <Play className="h-6 w-6" fill="black" />
            <span>Play</span>
          </button>
          
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