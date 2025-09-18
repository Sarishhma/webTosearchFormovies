import React, { useContext, useEffect } from 'react'
import { FavouriteContext } from './FavouriteContext'
import { Link } from 'react-router-dom';

export default function Favourite() {
  const { favourite, removeFavourite } = useContext(FavouriteContext);

  if (favourite.length === 0) {
    return <h1>No favourite yet ❤️</h1>;
  }
 

  return (
    <div>
      <h1>⭐ My Favourite Movies</h1>
      <div className="movies-container">
        {favourite.map((m) => (
          <Link to={`/First/${m.id}`} key={m.id}>
            <div className="movie-card">
              <img
                src={
                  m.poster_path
                    ? `https://image.tmdb.org/t/p/w500${m.poster_path}`
                    : "https://via.placeholder.com/300x450?text=No+Poster"
                }
                alt={m.title}
              />
              <div className="movie-title">{m.title}</div>
              <button onClick={() => removeFavourite(m.id)}>❌ Remove</button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
