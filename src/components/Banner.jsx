import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";

function Banner({ popularMovies }) {
  return (
    <div className="relative">
      {popularMovies && popularMovies.length > 0 && (
        <Carousel
          showThumbs={false}
          autoPlay={true}
          transitionTime={200}
          infiniteLoop={true}
          showStatus={false}
        >
          {popularMovies.map((movie) => (
            <Link
              key={movie.id}
              className="text-white no-underline relative block"
              to={`/movie/${movie.id}`}
            >
              {/* Image Wrapper */}
              <div className="relative h-[300px] md:h-[500px] lg:h-[600px] overflow-hidden">
                <img
                  src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                  alt={movie.original_title}
                  className="w-full h-full object-cover"
                />
                {/* Text Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent p-6 md:p-12 lg:p-20 flex flex-col justify-end items-end text-right">
                  <h2 className="text-lg md:text-2xl lg:text-4xl font-black mb-2">
                    {movie.original_title || ""}
                  </h2>
                  <div className="text-sm md:text-xl mb-3 flex items-center">
                    {movie.release_date.slice(0, 4)}
                    <span className="ml-3">
                      {movie.vote_average.toFixed(1)} <i className="fas fa-star" />
                    </span>
                  </div>
                  <p className="italic text-xs md:text-sm lg:text-base mb-2 w-full md:w-2/3 lg:w-1/2">
                    {movie.overview || ""}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </Carousel>
      )}
    </div>
  );
}

export default Banner;
