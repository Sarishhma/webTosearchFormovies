import React, { useContext } from 'react';
import { FavouriteContext } from './FavouriteContext';
import { Link, useNavigate } from 'react-router-dom';
import "../css/App.css";
export default function Favourite() {
  const { favourite, removeFavourite } = useContext(FavouriteContext);
  const navigate = useNavigate();

  const handleBack = () => navigate("/");

  // Debug: Check what's in favourite array
  console.log('Favourite movies:', favourite);

  if (favourite.length === 0) {
    return (
      <div className="empty-favourites">
        <h1>No favourites yet ❤️</h1>
        <button onClick={handleBack} className="back-btn">⬅ Go Back</button>
      </div>
    );
  }

  return (
    <div className="favourite-page">
      <h1>⭐ My Favourite Movies</h1>

      <button onClick={handleBack} className="back-btn">
        ⬅ Back to Dashboard
      </button>

      <div className="movies-container">
        {favourite.map((movie) => (
          <div className="movie-card" key={movie.id}>
            <Link to={`/First/${movie.id}`}>
              <img
                src={
                  movie.poster_path 
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "https://via.placeholder.com/300x450/1a1a1a/ffffff?text=No+Poster"
                }
                alt={movie.title}
                onError={(e) => {
                  console.log(`Image failed to load for: ${movie.title}`, movie.poster_path);
                  e.target.src = "https://via.placeholder.com/300x450/1a1a1a/ffffff?text=No+Poster";
                }}
                onLoad={(e) => {
                  console.log(`Image loaded successfully for: ${movie.title}`);
                }}
              />
            </Link>

            <div className="movie-title">{movie.title}</div>

            <button
              className="remove-btn"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                removeFavourite(movie.id);
              }}
            >
              ❌ Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}