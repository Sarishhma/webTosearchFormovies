import axios from "axios";
import  { useEffect, useState } from "react";
import Allnotes from "./MyComponent/Allnotes";
import First from "./MyComponent/First";
import "./css/App.css";
import {  Route, BrowserRouter, Routes } from "react-router-dom";
import {  FavouriteProvider } from "./MyComponent/FavouriteContext";
import Favourite from "./MyComponent/Favourite";

function App() {
  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
  const [movies, setMovie] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [movieName, setMovieName] = useState('');

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = () => {
    setLoading(true);
    axios
      .get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`)
      .then((res) => {
        setMovie(res.data.results || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
        setLoading(false);
      });
  };

  // Loading State
  if (loading) {
    return (
      <div className="loading-container">
        {/* Netflix N Animation */}
        <div className="netflix-loader">
          <div className="netflix-letter"></div>
          <div className="netflix-letter"></div>
          <div className="netflix-letter"></div>
        </div>
        
        {/* Film Reel */}
        <div className="film-reel">🎬</div>
        
        {/* Title */}
        <h1 className="loading-title">NETFLIX</h1>
        
        {/* Progress Bar */}
        <div className="loading-progress">
          <div className="progress-bar"></div>
        </div>
        
        {/* Loading Text */}
        <p className="loading-text">Loading movies...</p>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="error-container">
        <div className="error-icon">⚠️</div>
        <h1 className="error-title">Something went wrong</h1>
        <p className="error-message">
          {error.includes('401') ? 'API key is invalid or missing.' : 
           error.includes('Network Error') ? 'Network connection failed.' : 
           'We couldn\'t load the movies. Please try again.'}
        </p>
        <button className="retry-button" onClick={fetchMovies}>
          Try Again
        </button>
      </div>
    );
  }

  const filtermovies = movies.filter((m) => 
    (m.title || '').toLowerCase().includes(movieName.toLowerCase())
  );

  return (
    <FavouriteProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <Allnotes 
              filtermovies={filtermovies} 
              movieName={movieName} 
              setMovieName={setMovieName}
            />
          }/>
          <Route path="/First/:id" element={
            <First 
              movies={movies} 
              setMovie={setMovie} 
              filtermovies={filtermovies} 
              movieName={movieName} 
              setMovieName={setMovieName}
            />
          }/>
          <Route path="/favourite" element={
            <Favourite 
              movies={movies} 
              setMovie={setMovie} 
              filtermovies={filtermovies} 
              movieName={movieName} 
              setMovieName={setMovieName}
            />
          }/>
        </Routes>
      </BrowserRouter>
    </FavouriteProvider>
  );
}

export default App;