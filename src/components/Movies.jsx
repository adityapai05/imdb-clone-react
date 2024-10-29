import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import axios from "axios";
import Pagination from "./Pagination";
import { useParams } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

function Movies({loading=false}) {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { type } = useParams();

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
      setIsLoading(true); // Set loading when changing page
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage(page + 1);
      setIsLoading(true); // Set loading when changing page
    }
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${
            type ? type : "popular"
          }?api_key=3aec63790d50f3b9fc2efb4c15a8cf99&language=en-US&page=${page}`
        );
        setMovies(response.data.results.slice(0, 18));
        setTotalPages(response.data.total_pages);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [page, type]);

const getFormattedTitle = (type) => {
        const titles = {
          'popular': 'Popular',
          'upcoming': 'Upcoming',
          'now_playing': 'In Cinemas',
          'top_rated': 'Top Rated'
        };
        
        return titles[type] || type;
      };
  
  return (
    <div className="p-5">
      <div className="flex flex-row">
        <h2 className="font-bold text-3xl w-full flex items m-3 p-4 pl-0 pt-0">
          <span className="text-yellow-500 mr-2 text-3xl">|</span>
          {getFormattedTitle(type)}
        </h2>
      </div>

      <div className="flex flex-row flex-wrap justify-around gap-5">
        {loading
          ? [...Array(18)].map((_, i) => (
              <div key={i} className="animate-pulse ">
                <div className="bg-gray-800 h-[50vh] w-[195px] rounded-lg mx-4"></div>
              </div>
            ))
          : movies.map((movieObj) => (
              <MovieCard
                key={movieObj.id}
                movieObj={movieObj}
                poster_path={movieObj.poster_path}
                name={movieObj.original_title}
              />
            ))}
      </div>
        <Pagination
          page={page}
          handleNext={handleNext}
          handlePrev={handlePrev}
          totalPages={totalPages}
        />
    </div>
  );
}

export default Movies;
