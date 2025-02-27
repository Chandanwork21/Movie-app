import React from "react";
import { useState , useEffect } from "react";


const MovieCard = ({ movie }) => {
  const [isFavorite, setIsFavorite] = useState(false);

    // Check if the movie is already in favorites
    useEffect(() => {
      const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
      setIsFavorite(savedFavorites.some((fav) => fav.imdbID === movie.imdbID));
    }, [movie.imdbID]);

      // Function to handle favorite toggle
  const toggleFavorite = () => {
    let savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (isFavorite) {
      savedFavorites = savedFavorites.filter((fav) => fav.imdbID !== movie.imdbID);
    } else {
      savedFavorites.push(movie);
    }

    localStorage.setItem("favorites", JSON.stringify(savedFavorites));
    setIsFavorite(!isFavorite);
  };
  return (
    <>
    <div className="my-3">
      <div className="max-w-sm bg-gray-800 bg-opacity-50 border border-gray-700 rounded-lg shadow-md p-4">
        {/* Movie image - extracts from the omdb api
        if there is no image available  of movie then there will be a default image for that movie */}
        <img className="rounded-t-lg w-full h-60 object-cover"
          src={movie?.Poster !== "N/A" ? movie.Poster : "https://as1.ftcdn.net/v2/jpg/06/00/44/08/1000_F_600440859_o8SW2nWacRHSo7uTagUO9ESVM8KbZqOi.jpg"}
          alt={movie?.Title}
        />

        {/* Movie Details  extracts from the api*/}
        <div className="p-4">
          <h5 className="mb-2 text-xl font-bold tracking-tight text-white">
            {movie?.Title} ({movie?.Year})
          </h5>
          <p className="mb-3 font-normal text-gray-300">
          <b className="bg-gray underline">Movie Cast:  </b>{movie?.Actors && movie.Actors !== "N/A" ? movie.Actors  : "Actors not available."}
          </p>

          {/* Read More Button 
          this button will take us to the imdb website*/}
          <a
            href={`https://www.imdb.com/title/${movie?.imdbID}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            More about Movie
          </a>
          <button 
        className={`inline-flex items-center cursor-pointer px-3 py-2 my-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 " 
                  ${isFavorite ? "bg-red-500" : "bg-blue-500"}`}
        onClick={toggleFavorite}
      >
        {isFavorite ? "Remove from Favorites" : "Save to Favorites"}<i className="fa-solid fa-heart px-2"></i>
      </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default MovieCard;
