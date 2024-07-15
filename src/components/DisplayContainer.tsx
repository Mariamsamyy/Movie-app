import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import axiosTMDB from '../modules/ApiLinks';

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
    first_air_date?: string;
    name?: string;
}

interface DataProps {
    apiEndpoint: string;
    numberOfMovies: number;
    tvShowOn: boolean;
    moviesOn: boolean;
    itemHeading: string;
}

const DisplayContainer: React.FC<DataProps> = ({
    apiEndpoint,
    numberOfMovies,
    tvShowOn,
    moviesOn,
    itemHeading,
}) => {
    const [showItems, setShowItems] = useState<Movie[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [favorites, setFavorites] = useState<Movie[]>(() => {
        const saved = localStorage.getItem('favoritesMovies');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        fetchMovies();
    }, [currentPage]);

    const fetchMovies = async () => {
        setLoading(true);
        try {
            const response = await axiosTMDB.get(apiEndpoint, {
                params: { page: currentPage, limit: numberOfMovies },
            });
            const newMovies: Movie[] = response.data.results;
            setShowItems(prev => {
                const updatedMovies = newMovies.filter(newMovie =>
                    !prev.some(existingMovie => existingMovie.id === newMovie.id));
                return [...prev, ...updatedMovies];
            });
        } catch (error) {
            console.error("Error fetching movies", error);
        } finally {
            setLoading(false);
        }
    };

    const loadMoreMovies = () => {
        setCurrentPage(prev => prev + 1);
    };

    const toggleFavorite = (movie: Movie) => {
        setFavorites(prev => {
            const isFavorite = prev.some(fav => fav.id === movie.id);
            const updatedFavorites = isFavorite
                ? prev.filter(fav => fav.id !== movie.id)
                : [...prev, movie];
            localStorage.setItem('favoritesMovies', JSON.stringify(updatedFavorites));
            return updatedFavorites;
        });
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <h2 className="text-3xl font-bold text-center mt-6 mb-4">{itemHeading}</h2>
            {loading && currentPage === 1 ? (
                <div className="flex justify-center items-center h-screen">
                    <CircularProgress />
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {showItems.map(item => (
                        <div key={item.id} className="bg-white shadow-xl overflow-hidden transform transition duration-300 hover:scale-110 rounded-lg">
                            <Link to={`/movie/${item.id}`}>
                                <img
                                    className="w-full object-cover rounded-t-lg"
                                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                                    alt={item.title || item.name}
                                />
                            </Link>
                            <div className="p-4 flex justify-between items-center">
                                <div>
                                    <h3 className="text-lg font-bold">{tvShowOn ? item.name : item.title}</h3>
                                    <p className="text-sm text-gray-500">{new Date(item.release_date).toLocaleDateString()}</p>
                                </div>
                                <button onClick={() => toggleFavorite(item)}>
                                    {favorites.some(fav => fav.id === item.id) ? <AiFillHeart color="red" size="24" /> : <AiOutlineHeart size="24" />}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {!loading && (
                <div className="text-center mt-8">
                    <button
                        className="bg-blue-500 text-white px-8 py-2 rounded hover:bg-blue-600"
                        onClick={loadMoreMovies}
                    >
                        Load More
                    </button>
                </div>
            )}
        </div>
    );
};

export default DisplayContainer;
