import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import TopRated from './pages/TopRated';
import MovieDetail from './pages/movieDetails';
import FavoritesPage from './pages/favPage';

function App() {


  return (
    <React.Fragment>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/movie/top_rated" element={<TopRated/>}/>
        <Route path="/movie/:movieId" element={<MovieDetail/>} />
        <Route path="/fav" element={<FavoritesPage/>} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
