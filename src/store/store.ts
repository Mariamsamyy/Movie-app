import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from '../redux/movieSlice';
import favoritesReducer from '../redux/favSlice'; 

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    favorites: favoritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
