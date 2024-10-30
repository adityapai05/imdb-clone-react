import React, { useContext, useEffect, useState } from "react";
import genreids from "../utilities/genre";
import languageMap from "../utilities/languages";
import { AppContext } from "../context/AppContext";

function WatchList() {
  const { watchlist, setWatchList, removeFromList } = useContext(AppContext);

  const [search, setSearch] = useState("");
  const [genreList, setGenreList] = useState(["All Genres"]);
  const [currGenre, setCurrGenre] = useState("All Genres");

  let handleSearch = (e) => {
    setSearch(e.target.value);
  };

  let handleFilter = (genre) => {
    setCurrGenre(genre);
  };

  let ascendingSort = () => {
    let sortedList = [...watchlist].sort((a, b) => a.vote_average - b.vote_average);
    setWatchList(sortedList);
  };

  let descendingSort = () => {
    let sortedList = [...watchlist].sort((a, b) => b.vote_average - a.vote_average);
    setWatchList(sortedList);
  };

  useEffect(() => {
    let temp = new Set();
    watchlist.forEach((movie) => {
      movie.genre_ids.forEach((id) => temp.add(genreids[id]));
    });
    setGenreList(["All Genres", ...Array.from(temp)]);
  }, [watchlist]);

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Search Input */}
      <div className="flex justify-center my-4">
        <input
          onChange={handleSearch}
          value={search}
          type="text"
          placeholder="Search in Watchlist"
          className="h-12 w-full sm:w-96 bg-gray-800 text-white outline-none px-4 rounded-lg text-lg m-2"
        />
      </div>

      {/* Genre Filters */}
      <div className="flex justify-center flex-wrap mb-4">
        <i className="fi fi-br-bars-filter text-3xl mb-2"></i>
        {genreList.map((genre) => (
          <div
            key={genre}
            onClick={() => handleFilter(genre)}
            className={`h-10 w-32 flex items-center justify-center rounded-xl text-black font-bold m-2 cursor-pointer transition-transform transform hover:scale-105 ${
              currGenre === genre ? "bg-yellow-500" : "bg-yellow-100"
            }`}
          >
            {genre}
          </div>
        ))}
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto border rounded-lg shadow-md">
        <table className="w-full text-center text-gray-500">
          <thead className="bg-gray-700 text-white">
            <tr>
              <th className="w-32 sm:w-40 py-3">Poster</th>
              <th className="py-3">Name</th>
              <th className="hidden md:table-cell py-3">Language</th>
              <th className="py-3">Rating</th>
              <th className="hidden lg:table-cell py-3">Genres</th>
              <th className="py-3"></th>
            </tr>
          </thead>
          <tbody>
            {watchlist
              .filter((movie) => currGenre === "All Genres" || movie.genre_ids.some((id) => genreids[id] === currGenre))
              .filter((movie) => movie.title.toLowerCase().includes(search.toLowerCase()))
              .map((movie) => (
                <tr key={movie.id} className="border-b border-gray-700">
                  <td className="px-2 py-4">
                    <img
                      className="h-32 w-24 rounded-lg object-cover"
                      src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                      alt={movie.title}
                    />
                  </td>
                  <td className="px-2 sm:px-4">{movie.title}</td>
                  <td className="hidden md:table-cell">{languageMap[movie.original_language] || movie.original_language}</td>
                  <td>{movie.vote_average.toFixed(1)}/10 ⭐</td>
                  <td className="hidden lg:table-cell">{movie.genre_ids.map((id) => genreids[id]).join(", ")}</td>
                  <td
                    onClick={() => removeFromList(movie)}
                    className="text-red-500 cursor-pointer hover:text-red-800"
                  >
                    Delete
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default WatchList;
