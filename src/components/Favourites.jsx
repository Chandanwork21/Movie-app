import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom"; // Import Link

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  return (
    <>
    <div className="bg-gray-900 min-h-screen text-white">
    <div className="container mx-auto text-white">
      <h1 className="text-3xl font-bold text-center my-4">Your Favorites</h1>

      {/* Back to Home Link */}
      <div className="text-center mb-4">
        <Link to="/" className="text-blue-500 hover:underline text-lg">
          ←  Home
        </Link>
      </div>

      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400">No favorite movies yet.</p>
      )}
    </div>
    </div>
    </>
  );
};

export default Favorites;
