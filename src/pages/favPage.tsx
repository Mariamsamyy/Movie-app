import React, { useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { toggleFavorite, loadFavorites } from '../redux/favSlice';

const FavoritesPage = () => {
    const favorites = useSelector((state: RootState) => state.favorites.favorites);
    const dispatch: AppDispatch = useDispatch();
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        dispatch(loadFavorites());
        setLoading(false);
    }, [dispatch]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <CircularProgress />
            </div>
        );
    }

    if (favorites.length === 0) {
        return (
            <div className="text-center text-white">
                No favorites added yet.
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold text-center">Your Favorites</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {favorites.map((movie, index) => (
                    <div key={index} className="bg-white shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 rounded-lg">
                        <Link to={`/movie/${movie.id}`}>
                            <img
                                className="w-full h-86 object-cover rounded-t-lg"
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title || movie.name}
                            />
                        </Link>
                        <div className="p-2 flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-bold">{movie.title || movie.name}</h3>
                                <p className="text-sm text-gray-500">{new Date(movie.release_date).toLocaleDateString()}</p>
                            </div>
                            <button onClick={() => dispatch(toggleFavorite(movie))}>
                                {favorites.some(fav => fav.id === movie.id) ? (
                                    <AiFillHeart color="red" size="24" />
                                ) : (
                                    <AiOutlineHeart size="24" />
                                )}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FavoritesPage;
