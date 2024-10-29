import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";

function MovieCard({ movieObj, poster_path, name }) {
  const myContext = useContext(AppContext);

  function isInList(movieObj) {
    for (let i = 0; i < myContext.watchlist.length; i++) {
      if (myContext.watchlist[i].id === movieObj.id) {
        return true;
      }
    }
    return false;
  }

  return ( <>
      <div className="h-[50vh] w-[195px] bg-custom-dark flex flex-col items-center rounded-xl">
    <div  className="relative h-[35vh] w-[185px] mt-2 bg-center bg-cover rounded-xl hover:scale-105 duration-300 hover:cursor-pointer">
        <Link to={`/movie/${movieObj.id}`}
          className="absolute rounded-xl bottom-0 w-full h-[290px] p-4 flex flex-col justify-end bg-gradient-to-t from-black to-transparent opacity-0 hover:opacity-100 transition-opacity duration-200"
          >
          <div className="text-sm mb-1">
            {movieObj ? movieObj.release_date.slice(0,4) : ""}
            <span className="card__rating float-right">
              {movieObj ? movieObj.vote_average.toFixed(1) : ""}
              <i className="fas fa-star pl-1" />
            </span>
          </div>
          <div className="italic text-sm mb-1">
            {movieObj ? movieObj.overview.slice(0, 118) + "..." : ""}
          </div>
        </Link>
        <div
          className="h-full w-full bg-cover rounded-xl"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${poster_path})`,
          }}
          ></div>
      </div>
      <span className="text-lg font-bold mt-2 text-center">{name}</span>
      <span className="text-sm mt-2 text-center">
        {movieObj.vote_average.toFixed(1)}&#11088;
      </span>

      {isInList(movieObj) ? (
        <span
        onClick={() => myContext.removeFromList(movieObj)}
          className="font-bold m-2 p-2 bg-button-grey text-red-600 rounded-3xl px-9 hover:cursor-pointer hover:bg-button-hover"
          >
          <i className="fa-solid fa-xmark"></i> Watchlist
        </span>
      ) : (
        <span
        onClick={() => myContext.addToList(movieObj)}
        className="font-bold m-2 p-2 bg-button-grey text-button-blue rounded-3xl px-9 hover:cursor-pointer hover:bg-button-hover"
        >
          <i className="fa-solid fa-plus"></i> Watchlist
        </span>
      )}
      </div>
      </>
  );
}

export default MovieCard;