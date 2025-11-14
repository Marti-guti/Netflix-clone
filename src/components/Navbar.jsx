import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, Search, User } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Chiudi la barra di ricerca cliccando fuori
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() === "") return;
    navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
    setSearchOpen(false);
    setSearchTerm("");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/70 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-2">
        
        {/* Logo + link a sinistra */}
        <div className="flex items-center gap-6">
          <h1 className="text-red-600 text-xl font-bold tracking-wide">Bedflix</h1>

          <ul className="hidden md:flex items-center gap-4">
            <li><a href="/" className="text-gray-300 hover:text-white text-sm">Home</a></li>
            <li><a href="/series" className="text-gray-300 hover:text-white text-sm">Serie TV</a></li>
            <li><a href="/movies" className="text-gray-300 hover:text-white text-sm">Film</a></li>
            <li><a href="/mylist" className="text-gray-300 hover:text-white text-sm">La mia lista</a></li>
          </ul>
        </div>

        {/* Icone e barra di ricerca a destra */}
        <div className="flex items-center gap-4">
          {/* Barra di ricerca */}
          <div className="relative" ref={searchRef}>
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-gray-300 hover:text-white"
            >
              <Search size={20} />
            </button>

            {searchOpen && (
              <form onSubmit={handleSearch} className="absolute right-0 top-full mt-2">
                <input
                  type="text"
                  placeholder="Cerca..."
                  className="bg-black text-white text-sm border border-gray-700 rounded px-3 py-1 w-40 focus:outline-none focus:border-red-600 transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  autoFocus
                />
              </form>
            )}
          </div>

          {/* Icona utente */}
          <button className="text-gray-300 hover:text-white">
            <User size={22} />
          </button>

          {/* Menu mobile */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      <ul
        className={`absolute md:hidden top-full left-0 w-full bg-black/90 px-6 py-4 flex flex-col gap-4 transition-all duration-200 ${
          open ? "block" : "hidden"
        }`}
      >
        <li><a href="/" className="text-gray-300 hover:text-white text-sm">Home</a></li>
        <li><a href="/series" className="text-gray-300 hover:text-white text-sm">Serie TV</a></li>
        <li><a href="/movies" className="text-gray-300 hover:text-white text-sm">Film</a></li>
        <li><a href="/mylist" className="text-gray-300 hover:text-white text-sm">La mia lista</a></li>
      </ul>
    </nav>
  );
}
