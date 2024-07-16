import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import axiosTMDB from '../modules/ApiLinks';

interface MovieDetails {
  id: number;
  poster_path: string;
  title: string;
  vote_average: number;
  original_language: string;
  overview: string;
}

const MovieDetail: React.FC = () => {
  const [details, setDetails] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const { movieId } = useParams<{ movieId: string }>();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      const apiEndpoint = `/movie/${movieId}`; 
      try {
        const response = await axiosTMDB.get(apiEndpoint, {
          params: { append_to_response: 'videos,images' }
        });
        setDetails(response.data);
        checkFavorite(response.data.id);
      } catch (error) {
        console.error("Failed to fetch movie details", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  const toggleFavorite = () => {
    setIsFavorite(current => !current);
    updateFavorites(details);
  };

  const updateFavorites = (movieDetails: MovieDetails | null) => {
    if (movieDetails) {
      const favorites: MovieDetails[] = JSON.parse(localStorage.getItem('favoritesMovies') || '[]');
      if (isFavorite) {
        const filteredFavorites = favorites.filter(movie => movie.id !== movieDetails.id);
        localStorage.setItem('favoritesMovies', JSON.stringify(filteredFavorites));
      } else {
        localStorage.setItem('favoritesMovies', JSON.stringify([...favorites, movieDetails]));
      }
    }
  };

  const checkFavorite = (id: number) => {
    const favorites: MovieDetails[] = JSON.parse(localStorage.getItem('favoritesMovies') || '[]');
    setIsFavorite(favorites.some(movie => movie.id === id));
  };

  if (loading) return <div className="flex justify-center items-center h-screen"><CircularProgress /></div>;

  if (!details) return <div className="text-center">Movie not found.</div>;

  return (
    <div className="container mx-auto mt-5 px-4" style={{ backgroundColor: '#121212' }}>
      <div className="flex flex-col md:flex-row mt-2 rounded-lg overflow-hidden" style={{ boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <div className="md:w-1/3 bg-black">
          <img
            className="w-full h-full object-cover"
            src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
            alt={details.title}
          />
        </div>
        <div className="md:w-2/3 p-4 text-white">
          <h1 className="text-3xl font-bold">{details.title}</h1>
          <div className="flex justify-between items-center my-2">
            <span className="text-lg">Rating: {details.vote_average} / 10</span>
            <span className="text-sm">Language: {details.original_language.toUpperCase()}</span>
          </div>
          <hr className="my-4" style={{ borderColor: '#333' }} />
          <h5 className="text-xl font-semibold"></h5>
          <p>{details.overview}</p>
          <button 
            onClick={toggleFavorite}
            className={`mt-4 flex items-center ${isFavorite ? 'text-red-600' : 'text-gray-600'}`}>
            {isFavorite ? <AiFillHeart size="24" /> : <AiOutlineHeart size="24" />}
            <span className="ml-2 text-white">{isFavorite ? 'Remove from Watchlist' : 'Add to Watchlist'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
