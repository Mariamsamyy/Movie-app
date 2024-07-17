import React, { useEffect } from 'react';
import Cover from '../components/Cover';
import DisplayContainer from '../components/DisplayContainer';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { fetchMoviesByCategory } from '../redux/movieSlice';
import { toggleFavorite } from '../redux/favSlice';

const TopRated: React.FC = () => {
  const { topRated, loading, error } = useSelector((state: RootState) => state.movies);
  const favorites = useSelector((state: RootState) => state.favorites.favorites);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchMoviesByCategory({ category: 'topRated' }));
  }, [dispatch]);

  return (
    <>

      <DisplayContainer 
        movies={topRated}
        itemHeading="Top Rated Movies"
        loading={loading}
        error={error || ''}
        toggleFavorite={(movie) => dispatch(toggleFavorite(movie))}
        favorites={favorites}
      />
    </>
  );
};

export default TopRated;
