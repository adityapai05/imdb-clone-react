import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import axios from "axios";
import Pagination from "./Pagination";
import { useParams } from "react-router-dom";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { type } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
      setIsLoading(true);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage(page + 1);
      setIsLoading(true);
    }
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const url = `https://api.themoviedb.org/3/movie/${
          type || "popular"
        }?api_key=3aec63790d50f3b9fc2efb4c15a8cf99&page=${page}`;
        
        const response = await axios.get(url);
        // Limit the number of movies to 20 for consistent layout
        setMovies(response.data.results.slice(0, 18));
        setTotalPages(response.data.total_pages);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [type, page]);

  const getFormattedTitle = (type) => {
    const titles = {
      popular: "Popular",
      upcoming: "Upcoming",
      now_playing: "In Cinemas",
      top_rated: "Top Rated",
    };
    return titles[type] || type;
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-row mb-6">
        <h2 className="font-bold text-xl sm:text-2xl lg:text-3xl w-full flex items-center">
          <span className="text-yellow-500 mr-2 text-2xl sm:text-3xl">|</span>
          {getFormattedTitle(type)}
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 lg:gap-8">
        {isLoading
          ? [...Array(18)].map((_, i) => (
              <div key={i} className="animate-pulse w-full p-2">
                <div className="bg-gray-800 aspect-[2/3] rounded-lg shadow-lg"></div>
              </div>
            ))
          : movies.map((movieObj) => (
              <div key={movieObj.id} className="w-full p-2 transition-transform duration-300 hover:scale-105">
                <MovieCard
                  movieObj={movieObj}
                  poster_path={movieObj.poster_path}
                  name={movieObj.original_title || movieObj.title}
                />
              </div>
            ))}
      </div>

      <div className="mt-12 mb-6">
        {movies.length > 0 && (
          <Pagination
            page={page}
            handleNext={handleNext}
            handlePrev={handlePrev}
            totalPages={totalPages}
          />
        )}
      </div>
    </div>
  );
}

export default Movies;