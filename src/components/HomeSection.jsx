import React from "react";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";

function HomeSection({ title, movies, viewAllLink, loading = false }) {
  return (
    <div className="mb-12">
      <div className="flex items-center mb-4">
        <Link to={viewAllLink} className="">
          <h2 className="text-2xl font-bold text-white m-2">
            <span className="text-yellow-500 mr-2 text-3xl">|</span>
            {title}{" "}
            <i className="fa-solid fa-arrow-right hover:text-yellow-500 hover:scale-110 duration-200"></i>
          </h2>
        </Link>
      </div>
      <div className="flex flex-row flex-wrap justify-around gap-5">
        {loading
          ? [...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse w-[195px] sm:w-[275px] lg:w-[275px]">
                <div className="bg-gray-800 h-[50vh] rounded-lg mx-4"></div>
              </div>
            ))
          : movies.slice(0, 6).map((movieObj) => (
              <MovieCard
                key={movieObj.id}
                movieObj={movieObj}
                poster_path={movieObj.poster_path}
                name={movieObj.original_title}
              />
            ))}
      </div>
    </div>
  );
}

export default HomeSection;
