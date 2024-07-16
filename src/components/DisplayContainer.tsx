import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import axiosTMDB from '../modules/ApiLinks';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { toggleFavorite, loadFavorites } from '../redux/favSlice';

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
    itemHeading,
}) => {
    const [showItems, setShowItems] = useState<Movie[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const favorites = useSelector((state: RootState) => state.favorites.favorites);
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        fetchMovies();
    }, [currentPage]);

    useEffect(() => {
        dispatch(loadFavorites());
    }, [dispatch]);

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
                                    className="w-full h-45 object-cover rounded-t-lg"
                                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                                    alt={item.title || item.name}
                                />
                            </Link>
                            <div className="p-4 flex justify-between items-center">
                                <div>
                                    <h3 className="text-lg font-bold">{tvShowOn ? item.name : item.title}</h3>
                                    <p className="text-sm text-gray-500">{new Date(item.release_date).toLocaleDateString()}</p>
                                </div>
                                <button onClick={() => dispatch(toggleFavorite(item))}>
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
                        className="bg-[#00004B] text-white font-semibold text-lg px-10 py-3 rounded-full shadow-lg transition duration-300 ease-in-out hover:bg-[#000080] hover:shadow-xl active:scale-95 transform hover:-translate-y-1"
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
