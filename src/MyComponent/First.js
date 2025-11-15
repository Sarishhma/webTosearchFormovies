import React, { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../css/First.css'
import { FavouriteContext } from './FavouriteContext'

export default function First({ movies }) {
  const { id } = useParams();
  const { addFavourite } = useContext(FavouriteContext)
  const movie = movies.find((m) => m.id === parseInt(id))
  const navigate = useNavigate()
  
    const handleCancle = () => {
    
    navigate('/')
  }

  const handleadd = () => {
    addFavourite(movie)
    navigate('/Favourite')
  }

  if (!movie) {
    return <p>Movie not found</p>
  }

  return (
    <div className="first-movie-detail">
      <button onClick={handleCancle}className="fristbutton">×</button>
      
      <div className="first-movie-card">
        <img
          className="first-movie-poster"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/300x450/1a1a1a/ffffff?text=No+Poster"
          }}
        />
        <div className="first-movie-info">
          <h2 className="first-movie-title">{movie.title}</h2>
          <p className="first-movie-overview">{movie.overview}</p>
          <p className="first-movie-date">
            <strong>Release date:</strong> {movie.release_date}
          </p>
          <button onClick={handleadd}>Add to watch</button>
        </div>
      </div>
    </div>
  )
}