import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  first_air_date?: string;
  name?: string;
}
const initialState = {
  movies: [] as Movie[],
  page: 1,
  status: 'idle', 
  error: null as string | null
};

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async (page: number, { getState }) => {
  const response = await axios.get(`https://example.com/api/movies?page=${page}`);
  return response.data as Movie[];
});

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movies = state.movies.concat(action.payload);
        state.page += 1;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch movies';
      });
  }
});

export default moviesSlice.reducer;
