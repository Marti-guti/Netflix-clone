import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Homepage';
import ResearchResult from './pages/ResearchResult.jsx';
import FavoritesPage from './pages/Prefer.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
// 1. Importa il nuovo componente Details
import Details from './pages/Details.jsx';
import { FavoritesProvider } from './context/FavouriteContext.jsx';

function App() {
  return (
    <FavoritesProvider>
    <BrowserRouter>
      <div className="App min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
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