import React, { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../css/First.css'
import { FavouriteContext } from './FavouriteContext'
export default function First({ movies }) {
  const { id } = useParams();
  const {addFavourite} =useContext(FavouriteContext)
  const movie = movies.find((m) => m.id === parseInt(id))
const navigate =useNavigate()
const handleadd =()=>{
  addFavourite(movie)
  navigate('/Favourite')
}
  if (!movie) {
    return <p>Movie not found</p>
  }

  return (
    <div className="movie-detail">
      <div className="movie-card">
        <img
          className="movie-poster"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="movie-info">
          <h2 className="movie-title">{movie.title}</h2>
          <p className="movie-overview">{movie.overview}</p>
          <p className="movie-date">
            <strong>Release date:</strong> {movie.release_date}
          </p>
          <button onClick={()=>handleadd()}>❤️Add to watch </button>

      
        </div>
      </div>
    </div>
  )
}
