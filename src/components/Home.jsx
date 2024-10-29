import React, { useState, useEffect } from "react";
import axios from "axios";
import HomeSection from "./HomeSection";
import Banner from "./Banner";

function Home({loading, setLoading}) {
  const [movies, setMovies] = useState({
    popular: [],
    topRated: [],
    nowPlaying: [],
    upcoming: [],
  });
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const apiKey = "7948c3103c31e273d7ae80fdc4ed998b";
        const baseURL = "https://api.themoviedb.org/3";

        const [popular, topRated, nowPlaying, upcoming] = await Promise.all([
          axios.get(
            `${baseURL}/movie/popular?language=en-US&api_key=${apiKey}`
          ),
          axios.get(
            `${baseURL}/movie/top_rated?language=en-US&api_key=${apiKey}`
          ),
          axios.get(
            `${baseURL}/movie/now_playing?language=en-US&api_key=${apiKey}`
          ),
          axios.get(
            `${baseURL}/movie/upcoming?language=en-US&api_key=${apiKey}`
          ),
        ]);
        setMovies({
          popular: popular.data.results,
          topRated: topRated.data.results,
          nowPlaying: nowPlaying.data.results,
          upcoming: upcoming.data.results,
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);
  return (
    <div>
      <Banner popularMovies={movies.topRated}/>
      <div className="h-[5rem] flex items-center">
        <span className="text-yellow-500 font-bold text-4xl w-full flex items m-3">
          What to Watch
        </span>
      </div>
      <HomeSection
        title="Popular Movies"
        movies={movies.popular}
        viewAllLink="/movies/popular"
        loading={loading}
      />

      <HomeSection
        title="Top Rated"
        movies={movies.topRated}
        viewAllLink="/movies/top-rated"
        loading={loading}
      />

      <HomeSection
        title="In Cinemas"
        movies={movies.nowPlaying}
        viewAllLink="/movies/incinemas"
        loading={loading}
      />

      <HomeSection
        title="Upcoming"
        movies={movies.upcoming}
        viewAllLink="/movies/upcoming"
        loading={loading}
      />
    </div>
  );
}

export default Home;
