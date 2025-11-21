// src/App.jsx

import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Homepage';
import ResearchResult from './pages/ResearchResult.jsx';
import FavoritesPage from './pages/Favorite.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Details from './pages/Details.jsx';
import { FavoritesProvider } from './context/FavouriteContext.jsx';

function App() {
  return (
    <FavoritesProvider>
    <BrowserRouter>
      {/* Il tuo div 'App' e la Navbar sono corretti */}
      <div className="App min-h-screen flex flex-col">
        <Navbar />
        {/* Ho rimosso 'bg-black min-h-screen-1' da 'main'
            per lasciare che sia la pagina (HomePage) a decidere lo sfondo */}
        <main className="flex-1"> {/* MODIFICA QUI */}
          <Routes>
            {/* Queste rotte sono corrette */}
            <Route path="/" element={<HomePage />} />
            <Route path='/mylist' element={<FavoritesPage/>} />
            <Route path="/search" element={<ResearchResult />} />
            
            {/* 2. Aggiungi la rotta per i dettagli */}
            <Route path="/details/:filmId" element={<Details />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
    </FavoritesProvider>
  );
}

export default App;