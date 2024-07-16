import React, { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
    first_air_date?: string;
    name?: string;
}

const FavoritesPage = () => {
    const [favorites, setFavorites] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadFavorites = () => {
            try {
                const storedFavorites = localStorage.getItem('favoritesMovies');
                if (storedFavorites) {
                    setFavorites(JSON.parse(storedFavorites));
                } else {
                    setFavorites([]);
                }
            } catch (error) {
                console.error('Error parsing favorites from localStorage:', error);
                setFavorites([]);
            }
            setLoading(false);
        };

        loadFavorites();

        const handleStorageChange = () => {
            loadFavorites();
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <CircularProgress />
            </div>
        );
    }
    if (favorites.length === 0) {
        return (
            <div className="text-center">
                No favorites added yet.
            </div>
        );
    }
    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold text-center">Your Favorites</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {favorites.map((movie, index) => (
                    <div key={index} className="bg-white shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
                        <Link to={`/movie/${movie.id}`}>
                            <img
                                className="w-full h-39 object-cover rounded-t-lg"
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title || movie.name}
                            />
                            <div className="p-2">
                                <h3 className="text-lg font-bold">{movie.title || movie.name}</h3>
                                <p className="text-sm text-gray-500">{new Date(movie.release_date).toLocaleDateString()}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FavoritesPage;

