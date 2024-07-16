import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosTMDB, { URLS } from '../modules/ApiLinks';
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

interface ApiResponse {
  results: Movie[];
}

interface MoviesState {
  trending: Movie[];
  topRated: Movie[];
  upcoming: Movie[];
  popular: Movie[];
  loading: boolean;
  error: string | null;
}

const initialState: MoviesState = {
  trending: [],
  topRated: [],
  upcoming: [],
  popular: [],
  loading: false,
  error: null,
};

export const fetchMoviesByCategory = createAsyncThunk<Movie[], { category: keyof typeof URLS }, { state: RootState }>(
  'movies/fetchByCategory',
  async ({ category }, { rejectWithValue }) => {
    try {
      const url = URLS[category];
      const response = await axiosTMDB.get<ApiResponse>(url);
      if (response.status !== 200) {
        throw new Error(`Server responded with status ${response.status}`);
      }
      return response.data.results;
    } catch (error: any) {
      console.error('Error fetching movies:', error);
      return rejectWithValue('Failed to fetch movies');
    }
  }
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMoviesByCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMoviesByCategory.fulfilled, (state, action) => {
        const { category } = action.meta.arg;
        state[category] = action.payload; 
        state.loading = false;
      })
      .addCase(fetchMoviesByCategory.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to fetch movies';
        state.loading = false;
      });
  }
});

export const { reducer } = moviesSlice;
export default reducer;
