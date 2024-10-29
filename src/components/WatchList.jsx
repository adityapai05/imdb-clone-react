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
    let sortedList = [...watchlist].sort((movieA, movieB) => {
      return movieA.vote_average - movieB.vote_average;
    });
    setWatchList(sortedList);
  };

  let descendingSort = () => {
    let sortedList = [...watchlist].sort((movieA, movieB) => {
      return movieB.vote_average - movieA.vote_average;
    });
    setWatchList(sortedList);
  };

  useEffect(() => {
    let temp = new Set();
    watchlist.forEach((movieObj) => {
      movieObj.genre_ids.forEach((id) => {
        temp.add(genreids[id]); // Add all genres based on genre_ids
      });
    });
    setGenreList(["All Genres", ...Array.from(temp)]);
  }, [watchlist]);

  return (
    <>
      <div className="flex justify-center my-4 ">
        <input
          onChange={handleSearch}
          value={search}
          type="text"
          placeholder="Search in Watchlist"
          className="h-[3rem] w-[20rem] bg-custom-dark outline-none px-3 rounded-xl text-xl outline-1 outline-white m-4"
        />
      </div>
      <div className="flex justify-center flex-wrap m-4">
        <i className="fi fi-br-bars-filter text-4xl"></i>
        {genreList.map((genre) => {
          return (
            <div
              key={genre} // Added a key for each genre
              onClick={() => handleFilter(genre)}
              className={
                currGenre === genre
                  ? "flex justify-center items-center h-[3rem] w-[7rem] bg-yellow-500 mx-2 rounded-3xl text-black font-bold gap-4 hover:cursor-pointer hover:scale-110 duration-200"
                  : "flex justify-center items-center mx-2 h-[3rem] w-[7rem] bg-yellow-100 rounded-3xl text-black font-bold hover:cursor-pointer hover:scale-110 duration-200"
              }
            >
              {genre}
            </div>
          );
        })}
      </div>

      <div className="border border-gray-200 m-8 rounded-lg overflow-hidden text-xl">
        <table className="w-full table-fixed text-gray-500 text-center bg-custom-dark/80">
          <thead className="border-b-2">
            <tr>
              <th className="w-[160px] py-2">Poster</th>
              <th className="w-[60%] py-2">Name</th>
              <th className="w-[10%] py-2">Language</th>
              <th className="w-[12%] py-2 px-1 justify-center">
                <i onClick={ascendingSort} className="fa-solid fa-up-long px-2 hover:text-button-hover"></i>
                Rating
                <i onClick={descendingSort} className="fa-solid fa-down-long px-2 hover:text-button-hover"></i>
              </th>
              <th className="w-[10%] py-2">Genres</th>
              <th className="w-[10%] py-2"></th>
            </tr>
          </thead>
          <tbody>
            {watchlist
              .filter((movieObj) => {
                if (currGenre === "All Genres") {
                  return true;
                } else {
                  return movieObj.genre_ids.some((id) => genreids[id] === currGenre);
                }
              })
              .filter((movieObj) => {
                return movieObj.title.toLowerCase().includes(search.toLowerCase());
              })
              .map((movieObj) => {
                const genres = movieObj.genre_ids.map((id) => genreids[id]).join(", ");
                return (
                  <tr key={movieObj.id} className="border-b-2">
                    <td className="flex items-center px-6 py-4">
                      <img
                        className="h-[20vh] w-[175px] rounded-lg"
                        src={`https://image.tmdb.org/t/p/original/${movieObj.poster_path}`}
                        alt={movieObj.title}
                      />
                    </td>
                    <td>
                      <div className="mx-10">{movieObj.title}</div>
                    </td>
                    <td>{languageMap[movieObj.original_language] || movieObj.original_language}</td>
                    <td>{movieObj.vote_average.toFixed(1)}/10 &#11088;</td>
                    <td>{genres}</td> {/* Display all genres */}
                    <td
                      onClick={() => removeFromList(movieObj)}
                      className="text-red-500 hover:cursor-pointer hover:text-red-800 active:text-blue-500"
                    >
                      Delete
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default WatchList;
