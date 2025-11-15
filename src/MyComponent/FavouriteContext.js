import { createContext, useState, useEffect } from "react";

export const FavouriteContext = createContext();

export function FavouriteProvider({ children }) {
  const [favourite, setFavourite] = useState(()=> {
    const saved = JSON.parse(localStorage.getItem("favourite")) ;
        return saved|| []});

  const addFavourite = (movie) => {
    setFavourite(prev => {
      if (prev.some(fav => fav.id === movie.id)) return prev;
      return [...prev, movie]; // store full movie object
    });
  };

  const removeFavourite = (id) => {
    setFavourite(prev => prev.filter(fav => fav.id !== id));
  };

  // Save to localStorage whenever favourites change
  useEffect(() => {
    localStorage.setItem("favourite", JSON.stringify(favourite));
  }, [favourite]);

  return (
    <FavouriteContext.Provider value={{ favourite, addFavourite, removeFavourite }}>
      {children}
    </FavouriteContext.Provider>
  );
}
