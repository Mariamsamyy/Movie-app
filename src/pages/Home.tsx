import React, { useEffect, useState } from 'react';
import Cover from '../components/Cover';
import DisplayContainer from '../components/DisplayContainer';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { fetchMoviesByCategory, clearSearchResults } from '../redux/movieSlice';
import { toggleFavorite } from '../redux/favSlice';

const Home: React.FC = () => {
  const { trending, popular, searchResults, loading, error } = useSelector((state: RootState) => state.movies);
  const favorites = useSelector((state: RootState) => state.favorites.favorites);
  const dispatch = useDispatch<AppDispatch>();

  const [showSearchResults, setShowSearchResults] = useState(false);

  useEffect(() => {
    if (!showSearchResults) {
      dispatch(fetchMoviesByCategory({ category: 'trending' }));
      dispatch(fetchMoviesByCategory({ category: 'popular' }));
    }
  }, [dispatch, showSearchResults]);

  const handleClearSearch = () => {
    dispatch(clearSearchResults());
    setShowSearchResults(false);
  };

  return (
    <div>
      <Cover
        title="Welcome"
        description="Free Movies to Watch, Anytime Anywhere."
        catchyPhrase="The search is over! Let Plex help you find the perfect movie to watch tonight for free"
        showSearch={true}
        headerImage=""
        showHeaderImage={true}
        onSearch={() => setShowSearchResults(true)}
        onClearSearch={handleClearSearch}
      />
      
      {showSearchResults && searchResults && searchResults.length ? (
        <DisplayContainer
          movies={searchResults}
          itemHeading="Search Results"
          loading={loading}
          error={error || ''}
          toggleFavorite={(movie) => dispatch(toggleFavorite(movie))}
          favorites={favorites}
        />
      ) : (
        <>
          <DisplayContainer
            movies={trending}
            itemHeading="Trending Movies"
            loading={loading}
            error={error || ''}
            toggleFavorite={(movie) => dispatch(toggleFavorite(movie))}
            favorites={favorites}
          />
          <DisplayContainer
            movies={popular}
            itemHeading="Popular Movies"
            loading={loading}
            error={error || ''}
            toggleFavorite={(movie) => dispatch(toggleFavorite(movie))}
            favorites={favorites}
          />
        </>
      )}
    </div>
  );
};

export default Home;
