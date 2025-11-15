import React from 'react'
import "../css/Allnotes.css";
import { Link, useNavigate } from 'react-router-dom';

export default function Allnotes({filtermovies,setMovieName,movieName,movie}) {
  const navigate = useNavigate()
  const handleadd = () => {
    navigate('/Favourite')
  }
   
  return (
<>
    <h1 className="allnotes-title">Now Playing Movies 🎬</h1>
      <button className="allnotes-watchlist-btn" onClick={handleadd}>❤️ </button>

    <div className="allnotes-search">
       <input 
         type="text" 
         placeholder="Enter the movie name" 
         value={movieName} 
         onChange={(e) => setMovieName(e.target.value)}
       />
    </div>
    
    <div className="allnotes-container">
      <div className="allnotes-movies-grid">
        {filtermovies.map((m) => (
          <Link className="allnotes-movie-card" to={`/First/${m.id}`} key={m.id}>
            <div className="allnotes-card-content">
              <img
                src={
                  m.poster_path
                    ? `https://image.tmdb.org/t/p/w500${m.poster_path}`
                    : "https://via.placeholder.com/300x450/1a237e/ffffff?text=No+Poster"
                }
                alt={m.title}
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/300x450/1a237e/ffffff?text=Poster+Missing";
                }}
              />
              <div className="allnotes-movie-title">{m.title}</div>
              <div className="allnotes-rating">⭐ <strong>{m.vote_average ?? "N/A"}</strong> / 10</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
</>
  )
}