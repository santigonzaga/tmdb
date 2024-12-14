import axios from '../lib/axios';
import { Movie, MovieResponse } from '../types/movie';
import { config } from '../utils/config';

export class MovieService {
  async getPopularMovies(): Promise<Movie[]> {
    const url = `/movie/popular?api_key=${config.tmdbApiKey}`;
    const { data } = await axios.get<MovieResponse>(url);
    return data.results;
  }
}