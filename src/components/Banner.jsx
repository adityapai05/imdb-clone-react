import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import {Link} from "react-router-dom";

function Banner({popularMovies}) {
  return (
    <div>
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
              className="text-white no-underline"
              to={`/movie/${movie.id}`}
            >
              <div className="h-[600px]">
                <img
                  src={`https://image.tmdb.org/t/p/original${movie && movie.backdrop_path}`}
                  alt={movie.original_title}
                  className="mx-auto block w-full"
                />
              </div>
              <div className="absolute bottom-0 w-full h-[70%] flex flex-col justify-end items-start p-20 bg-gradient-to-t from-black to-transparent opacity-100 hover:opacity-100 transition-opacity duration-300">
                <div className="text-4xl font-black mb-1">{movie ? movie.original_title : ""}</div>
                <div className="text-2xl mb-4">
                  {movie ? movie.release_date.slice(0,4) : ""}
                  <span className="ml-3">
                    {movie ? movie.vote_average.toFixed(1) : ""}{" "}
                     <i className="fas fa-star" />{" "}
                  </span>
                </div>
                <div className="italic text-sm mb-1 w-1/2 text-left">{movie ? movie.overview : ""}</div>
              </div>
            </Link>
          ))}
        </Carousel>
      )}
    </div>
  )
}

export default Banner