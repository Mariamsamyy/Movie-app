import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
    first_air_date?: string;
    name?: string;
}

interface FavoritesState {
    favorites: Movie[];
}

const initialState: FavoritesState = {
    favorites: JSON.parse(localStorage.getItem('favoritesMovies') || '[]'),
};

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        toggleFavorite: (state, action: PayloadAction<Movie>) => {
            const movie = action.payload;
            const isFavorite = state.favorites.some(fav => fav.id === movie.id);
            state.favorites = isFavorite
                ? state.favorites.filter(fav => fav.id !== movie.id)
                : [...state.favorites, movie];
            localStorage.setItem('favoritesMovies', JSON.stringify(state.favorites));
        },
        loadFavorites: (state) => {
            state.favorites = JSON.parse(localStorage.getItem('favoritesMovies') || '[]');
        },
    },
});

export const { toggleFavorite, loadFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
