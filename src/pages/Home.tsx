import React, { useState, useEffect } from 'react';
import Cover from '../components/Cover';
import DisplayContainer from '../components/DisplayContainer';
import axiosTMDB, { API_KEY, URLS } from "../modules/ApiLinks";
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite, loadFavorites } from '../redux/favSlice';
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

const Home: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [trending, settrending] = useState<Movie[]>([]);
    const [popular, setPopularMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const favorites = useSelector((state: RootState) => state.favorites.favorites);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadFavorites());
        fetchMovies(`${URLS.upcoming}`, setMovies);
        fetchMovies(`${URLS.trending}`, settrending);
        fetchMovies(`${URLS.popular}`, setPopularMovies);
    }, [dispatch]);

    const fetchMovies = async (apiEndpoint: string, setState: React.Dispatch<React.SetStateAction<Movie[]>>) => {
        setLoading(true);
        try {
            const response = await axiosTMDB.get(apiEndpoint);
            setState(response.data.results);
        } catch (error) {
            console.error("Error fetching movies", error);
            setError('Failed to fetch movies. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Cover
                title={"Welcome"}
                description={"Free Movies to Watch, Anytime Anywhere."}
                catchyPhrase="The search is over! Let Plex help you find the perfect movie to watch tonight for free"
                headerImage={""}
                showSearch={true}
                showHeaderImage={true}
            />
            <DisplayContainer
                movies={trending}
                itemHeading={"Trending Movies"}
                loading={loading}
                error={error}
                toggleFavorite={(movie: Movie) => dispatch(toggleFavorite(movie))}
                favorites={favorites}
            />
            <DisplayContainer
                movies={popular}
                itemHeading={"Popular"}
                loading={loading}
                error={error}
                toggleFavorite={(movie: Movie) => dispatch(toggleFavorite(movie))}
                favorites={favorites}
            />
        </div>
    );
}

export default Home;
