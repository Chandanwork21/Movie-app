import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import MovieCard from "./MovieCard";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_MOVIE_APP_API;  //OMDB api

const MovieSearch = () => {
  const [searchTerm, setSearchTerm] = useState(""); // sets the Search term when entered or change
  const [movies, setMovies] = useState([]);  // sets movies that are searched
  const [page, setPage] = useState(1); // Tracks the current page
  const [hasMore, setHasMore] = useState(true); // Controls infinite scroll

  // Fetch movies from API using async-await 
  const fetchMovies = async (title, pageNum = 1) => {
    try {
      const response = await fetch(`${API_URL}&s=${title || "latest"}&page=${pageNum}`);
      const data = await response.json();
  // extracting all movies from the api response
      if (data.Response === "True") {
        const detailedMovies = await Promise.all(
          data.Search.map(async (movie) => {
            const detailsResponse = await fetch(`${API_URL}&i=${movie.imdbID}`);
            return await detailsResponse.json();
          })
        );

        setMovies((prevMovies) => (pageNum === 1 ? detailedMovies : [...prevMovies, ...detailedMovies]));
        setHasMore(data.Search.length > 0); // Stop fetching if no more results
      } else {
        if (pageNum === 1) setMovies([]);
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      setHasMore(false);
    }
  };

  // Load default movies on first render
  useEffect(() => {
    fetchMovies(); 
  }, []);

  // Load more movies when user scrolls - Infinite scroll
  const fetchMoreMovies = () => {
    setPage((prevPage) => prevPage + 1);
    fetchMovies(searchTerm, page + 1);
  };

  return (
    <>
    <div className="bg-gray-900 min-h-screen text-white">
      <header className="bg-gray-800 p-4 shadow-md">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold cursor-pointer"><Link to="/">BigCinema🎬</Link></h1>
            <p className="text-gray-400 text-lg italic text-center mt-2 mb-4 underline decoration-gray">Where Every Frame Tells a Story!</p>
          </div>
          <div>
        <Link className="mx-3 hover:underline" to="/">Home</Link>
        <Link className="mx-3 hover:underline" to="/favorites">Favorites</Link>
          </div>

          {/* Search Bar 
          with input and search button */}
          <div className="flex items-center space-x-2 bg-gray-700 p-2 rounded-lg sm:mt-4">
            <input
              className="bg-gray-800 p-2 text-white outline-none"
              type="text"
              placeholder="Search movies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setMovies([]);
                  setPage(1);
                  fetchMovies(searchTerm, 1);
                }
              }}
            />
            <button
              className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700 cursor-pointer"
              onClick={() => {
                setMovies([]);
                setPage(1);
                fetchMovies(searchTerm, 1);
              }}
            >
              {/* font awesome search icon */}
              <i className="fas fa-search"></i> {}
            </button>
          </div>
        </div>
      </header>

      {/* Infinite Scroll for Movies - loads the movies when user scrolls 
      spinner.jsx has been imported for the loading gif.*/}
      <InfiniteScroll
        dataLength={movies.length}
        next={fetchMoreMovies}
        hasMore={hasMore}
        loader={
          <div className="flex justify-center items-center my-4">
            <Spinner />
          </div>
        }
        className="container mx-auto px-4 mt-6"
      >
        {movies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </div>
        ) : (
          // <p> displays the message when no movies found
          <p className="text-center text-gray-400 mt-10">No movies found.</p>
        )}
      </InfiniteScroll>
    </div>
    </>
  );
};

export default MovieSearch;
