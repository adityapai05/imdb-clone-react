import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { to: "/movies/popular", text: "Popular" },
    { to: "/movies/top_rated", text: "Top-Rated" },
    { to: "/movies/now_playing", text: "In Cinemas" },
    { to: "/movies/upcoming", text: "Upcoming" },
    { to: "/watchlist", text: "Watchlist" },
  ];

  return (
    <nav className="relative border-b border-white w-full">
      <div className="px-4 pt-5 py-4 h-[9vh]">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/">
            <img
              className="w-[75px] hover:scale-110 duration-300"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/863px-IMDB_Logo_2016.svg.png?20200406194337"
              alt="IMDb Logo"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.text}
                to={link.to}
                className="text-lg lg:text-xl hover:text-gray-400 transition-colors"
              >
                {link.text}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white focus:outline-none"
            >
              {isMenuOpen ? (
                <i class="fa-solid fa-xmark"></i>
              ) : (
                <i class="fa-solid fa-bars"></i>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-[12vh] left-0 right-0 bg-black border-b border-white z-50">
          <div className="flex flex-col items-center space-y-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.text}
                to={link.to}
                className="text-lg hover:text-gray-400 transition-colors w-full text-center py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.text}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
