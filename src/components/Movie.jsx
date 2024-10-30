import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Movie = () => {
  const [currentMovieDetail, setMovie] = useState();
  const { id } = useParams();

  useEffect(() => {
    getData();
    window.scrollTo(0, document.body.scrollHeight);
  }, []);

  const getData = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => setMovie(data));
  };

  return (
    <div className="w-full min-h-screen bg-black flex flex-col items-center">
      {/* Banner Section */}
      <div className="w-full h-[400px] sm:h-[600px] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
        <img
          className="w-full h-full object-cover opacity-50"
          src={`https://image.tmdb.org/t/p/original${
            currentMovieDetail?.backdrop_path || ""
          }`}
          alt="backdrop"
        />
      </div>

      {/* Content Section */}
      <div className="w-11/12 md:w-4/5 flex flex-col lg:flex-row gap-8 relative -mt-24 lg:-mt-32 z-20">
        {/* Poster Image */}
        <div className="flex-shrink-0 mx-auto lg:mx-0">
          <img
            className="w-[200px] sm:w-[300px] rounded-lg shadow-xl"
            src={`https://image.tmdb.org/t/p/original${
              currentMovieDetail?.poster_path || ""
            }`}
            alt="poster"
          />
        </div>

        {/* Movie Details */}
        <div className="text-white flex flex-col gap-4 flex-1 mb-10">
          <h1 className="font-bold text-3xl sm:text-4xl text-center lg:text-left">
            {currentMovieDetail?.original_title || ""}
          </h1>

          <p className="text-gray-300 text-center lg:text-left text-lg italic">
            {currentMovieDetail?.tagline || ""}
          </p>

          <div className="flex justify-center lg:justify-start items-center gap-2 text-sm">
            <span>{currentMovieDetail?.vote_average || ""}</span>
            <i className="fas fa-star text-yellow-400" />
            <span className="text-gray-400 ml-2">
              ({currentMovieDetail?.vote_count || 0} votes)
            </span>
          </div>

          <div className="text-gray-300 text-center lg:text-left">
            <div>
              Runtime:{" "}
              {currentMovieDetail ? `${currentMovieDetail.runtime} mins` : ""}
            </div>
            <div>
              {currentMovieDetail
                ? `Release date: ${currentMovieDetail.release_date}`
                : ""}
            </div>
            <div className="mt-5 flex flex-wrap justify-center lg:justify-start gap-2">
              {currentMovieDetail?.genres?.map((genre) => (
                <span
                  key={genre.id}
                  className="px-3 py-1 border border-white rounded-full"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          </div>

          {/* Synopsis and Links */}
          <div className="flex flex-col gap-6">
            {/* Synopsis */}
            <div>
              <div className="text-2xl mb-2 font-semibold text-center lg:text-left">
                Synopsis
              </div>
              <p className="text-center lg:text-left">
                {currentMovieDetail?.overview || "No synopsis available."}
              </p>
            </div>

            {/* Useful Links */}
            <div className="flex justify-center lg:justify-start gap-4 mt-2">
              {currentMovieDetail?.homepage && (
                <a
                  href={currentMovieDetail.homepage}
                  target="_blank"
                  rel="noreferrer"
                  className="no-underline"
                >
                  <span className="flex justify-center items-center px-8 py-2 rounded-full cursor-pointer w-[150px] text-black font-bold bg-red-600">
                    Homepage
                    <i className="fas fa-external-link-alt ml-2"></i>
                  </span>
                </a>
              )}
              {currentMovieDetail?.imdb_id && (
                <a
                  href={`https://www.imdb.com/title/${currentMovieDetail.imdb_id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="no-underline"
                >
                  <span className="flex justify-center items-center px-6 py-2 rounded-full cursor-pointer w-[150px] text-black font-bold bg-[#f3ce13]">
                    IMDb
                    <i className="fas fa-external-link-alt ml-2"></i>
                  </span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movie;
