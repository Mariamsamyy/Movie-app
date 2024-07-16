import React, { useState } from 'react';
import { CircularProgress } from '@mui/material';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { Link } from 'react-router-dom';

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
    first_air_date?: string;
    name?: string;
}

interface DisplayContainerProps {
    movies: Movie[];
    itemHeading: string;
    loading: boolean;
    error: string;
    toggleFavorite: (movie: Movie) => void;
    favorites: Movie[];
    initialItemsToShow?: number;
}

const DisplayContainer: React.FC<DisplayContainerProps> = ({
    movies,
    itemHeading,
    loading,
    error,
    toggleFavorite,
    favorites,
    initialItemsToShow = 8,
}) => {
    const [itemsToShow, setItemsToShow] = useState(initialItemsToShow);

    const loadMore = () => {
        setItemsToShow(prevItems => prevItems + 4);
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen"><CircularProgress /></div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container mx-auto px-4 py-6">
            <h2 className="text-3xl font-bold text-center mt-6 mb-4 text-white">{itemHeading}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {movies.slice(0, itemsToShow).map(movie => (
                    <div key={movie.id} className="bg-white shadow-xl overflow-hidden transform transition duration-300 hover:scale-110 rounded-lg">
                        <Link to={`/movie/${movie.id}`}>
                            <img
                                className="w-full h-50 object-cover rounded-t-lg"
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title || movie.name}
                            />
                        </Link>
                        <div className="p-4 flex justify-between items-center">
                            <div>
                            <h3 className="text-lg font-bold text-dark">{movie.title}</h3>
                            <p className="text-sm text-gray-500">{new Date(movie.release_date).toLocaleDateString()}</p>
                            </div>
                            <button onClick={() => toggleFavorite(movie)}>
                                {favorites.some(fav => fav.id === movie.id) ? <AiFillHeart color="red" size="24" /> : <AiOutlineHeart size="24" />}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {itemsToShow < movies.length && (
                <div className="flex justify-center mt-4">
                    <button
                        className="bg-[#E5A00D] text-white font-semibold text-lg px-10 py-3 rounded-full shadow-lg transition duration-300 ease-in-out hover:bg-[#000080] hover:shadow-xl active:scale-95 transform hover:-translate-y-1"
                        onClick={loadMore}
                    >
                        Load More
                    </button>
                </div>
            )}
        </div>
    );
};

export default DisplayContainer;
