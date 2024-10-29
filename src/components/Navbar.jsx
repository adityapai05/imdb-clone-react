import React, { useState } from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [search, setSearch] = useState("");
  const handleSearch = (e) => {
    setSearch(e.target.value);
    console.log(search);
};
  return (
    <div className="flex border-b border-white items-center px-4 py-4 h-[12vh]">
      <div className="flex items-center space-x-8 w-full">
        <Link to="/">
          <img
            className="w-[75px] hover:scale-110 duration-300"
            src={
              "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/863px-IMDB_Logo_2016.svg.png?20200406194337"
            }
            alt="IMDb Logo"
          />
        </Link>
        <Link to="/movies/popular" className="text-2xl px-3 hover:text-gray-400">
          <span>Popular</span>
        </Link>
        <Link to="/movies/top_rated" className="text-2xl px-3 hover:text-gray-400">
          <span>Top-Rated</span>
        </Link>
        <Link to="/movies/now_playing" className="text-2xl px-3 hover:text-gray-400">
          <span>In Cinemas</span>
        </Link>
        <Link to="/movies/upcoming" className="text-2xl px-3 hover:text-gray-400">
          <span>Upcoming</span>
        </Link>
        <Link to="/watchlist" className="text-2xl px-3 hover:text-gray-400">
          <span>Watchlist</span>
        </Link>
      </div>
      <div className="flex items-center space-x-3">
        <input
          onChange={handleSearch}
          value={search}
          type="text"
          placeholder="Search IMDb"
          className="h-[5vh] w-[15rem] bg-custom-dark outline-none px-3 rounded-xl text-l outline-1 outline-white"
        />
        <button className="bg-yellow-500 text-black font-bold px-4 py-2 rounded-2xl hover:bg-yellow-200 active:bg-yellow-900">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
    </div>
  );
};

export default Navbar;