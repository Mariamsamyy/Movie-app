import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axiosTMDB from '../modules/ApiLinks';
import { CircularProgress } from '@mui/material'; 

const SearchResults = () => {
  const { state } = useLocation();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (state?.query) {
      fetchResults(state.query);
    }
  }, [state?.query]);

  const fetchResults = async (query) => {
    setLoading(true);
    try {
      const response = await axiosTMDB.get(`/search/movie`, {
        params: {
          api_key: '329a3f62772d532265c6717d065b5820',
          query: query
        }
      });
      setResults(response.data.results);
      setError(''); 
    } catch (err) {
      setError('Failed to fetch results. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen"><CircularProgress /></div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-6">
      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {results.map(movie => (
            <div key={movie.id} className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold">{movie.title}</h3>
                <p className="text-sm text-gray-600 overflow-ellipsis overflow-hidden">{movie.overview}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">No results found.</p>
      )}
    </div>
  );
};

export default SearchResults;
