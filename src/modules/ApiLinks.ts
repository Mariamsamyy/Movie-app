import axios from 'axios';

const BASE_URL = "https://api.themoviedb.org/3";
export const API_KEY = '329a3f62772d532265c6717d065b5820';

export const axiosTMDB = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const URLS = {
  trending: '/trending/movie/week',
  topRated: '/movie/top_rated',
  upcoming: '/movie/upcoming',
  popular: '/movie/popular',
  
};

export default axiosTMDB;
