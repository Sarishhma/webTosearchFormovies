import axios from "axios";
import react, { useEffect, useState } from "react";
import Allnotes  from "./MyComponent/Allnotes";
import First from "./MyComponent/First";
import "./css/App.css";
import { Link, Route, BrowserRouter, Routes } from "react-router-dom";
import { FavouriteContext, FavouriteProvider } from "./MyComponent/FavouriteContext";
import Favourite from "./MyComponent/Favourite";


function App() {
  const API_KEY = "c89132f55a0cd0059318b019e12dae6d";
  const [movies, setMovie] = useState([]);
  const [loading,setloading]=useState(true)
  const[error,seterror]=useState('')
  const[movieName,setMovieName] = useState('')

  useEffect(() => {
    fetchmovies()
  }, [])
 


  const fetchmovies = () => {
   axios
   .get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`)
   .then((res)=>{setMovie(res.data.results||[])
    setloading(false)
   })
   
    .catch((error)=>{
      console.error(error)
      seterror(error)
      setloading(false)
    })
 

}
if(loading){
return(
    <div>
    <h1>Loading...</h1>
  </div>
)
}
if(error){
 return(
   <div><h1>{error.message}</h1></div>
 )
 
}
const filtermovies = movies.filter((m)=>(m.title||movieName||'').toLowerCase().includes(movieName.toLowerCase()));
return (
  <>
  
   <FavouriteProvider>
<BrowserRouter>
  <Routes>
    <Route path="/" element={ <Allnotes filtermovies={filtermovies} movieName={movieName} setMovieName={setMovieName}/> }/>
     <Route path="/First/:id" element={ <First movies={movies} setMovie={setMovie} filtermovies={filtermovies} movieName={movieName} setMovieName={setMovieName}/> }/>
      <Route path="/favourite" element={ <Favourite movies={movies} setMovie={setMovie} filtermovies={filtermovies} movieName={movieName} setMovieName={setMovieName}/> }/>

  </Routes>
</BrowserRouter>
</FavouriteProvider>


   
 
    </>
)
}
export default App;