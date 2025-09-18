import React from 'react'
import "../css/App.css";
import { Link } from 'react-router-dom';


export default function Allnotes({filtermovies,setMovieName,movieName}) {
  return (
<>
    <h1>Now Playing Movies 🎬</h1>
   
    <div className="search">
       <input type="text" placeholder="enter the movie name" value={movieName} onChange={(e)=>setMovieName(e.target.value)}/>
    </div>
    <div>
          <div className="movies-container">
             
      {filtermovies.map((m) => (
        <Link className="movie-card" to={`/First/${m.id} `} key={m.id} >
        <div >
          <img
            src={
              m.poster_path
                ? `https://image.tmdb.org/t/p/w500${m.poster_path}`
                : "https://via.placeholder.com/300x450?text=No+Poster"
            }
            alt={m.title}
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/300x450?text=Poster+Missing";
            }}
          />
          <div className="movie-title">{m.title}</div>
          ⭐ <strong>{m.vote_average ?? "N/A"}</strong> / 10
        </div>
        </Link>
      ))}
       
      
    </div>
   
    </div>
   

  
</>
  )
}
