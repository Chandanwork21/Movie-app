import React from 'react'
import MovieSearch from './components/MovieSearch'
import Favorites from './components/Favourites';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
    <Router>
      <Routes>
      <Route path="/" element={<MovieSearch />} />
     <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </Router>
    </>
  )
}

export default App

// https://www.omdbapi.com/?i=tt3896198&apikey=53782da0