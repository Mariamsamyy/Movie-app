import React, { useState, useEffect } from 'react';
import Cover from '../components/Cover';
import DisplayContainer from '../components/DisplayContainer';
import axiosTMDB, { URLS } from '../modules/ApiLinks';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../redux/favSlice';
import { RootState } from '../store/store';

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
    first_air_date?: string;
    name?: string;
}

const TopRated: React.FC = () => {
    const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const favorites = useSelector((state: RootState) => state.favorites.favorites);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchTopRatedMovies();
    }, []);

    const fetchTopRatedMovies = async () => {
        try {
            const response = await axiosTMDB.get(URLS.topRatedMovies);
            setTopRatedMovies(response.data.results);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching top rated movies", error);
            setError('Failed to fetch top rated movies. Please try again later.');
            setLoading(false);
        }
    };

    return (
        <>
            <Cover 
                title="Top Rated"
                description=""
                catchyPhrase="Discover the Best. Experience top-rated films that have captivated audiences worldwide."
                headerImage=""
                showSearch={true}
                showHeaderImage={true}
            />
            <DisplayContainer 
                movies={topRatedMovies}
                itemHeading="Top Rated Movies"
                loading={loading}
                error={error}
                toggleFavorite={(movie: Movie) => dispatch(toggleFavorite(movie))}
                favorites={favorites}
            />
        </>
    );
};

export default TopRated;
