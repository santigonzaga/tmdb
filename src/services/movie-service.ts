import { AppError } from '@/types/error';
import axios from '../lib/axios';
import { Movie, MovieDetail, MovieResponse } from '../types/movie';
import { config } from '../utils/config';
import { AxiosError } from 'axios';

export class MovieService {
  async getPopularMovies(): Promise<Movie[]> {
    const url = `/movie/popular?api_key=${config.tmdbApiKey}`;
    try {
      const { data } = await axios.get<MovieResponse>(url);
      return data.results;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const message = error.response?.data?.status_message || 'Failed to fetch popular movies.';
        const statusCode = error.response?.status ?? 500;
        throw new AppError(message, statusCode);
      }
      throw new AppError('Unexpected error occurred while fetching popular movies.', 500);
    }
  }

  async getMovieById(id: string): Promise<MovieDetail> {
    const url = `/movie/${id}?api_key=${config.tmdbApiKey}`;
    try {
      const { data } = await axios.get<MovieDetail>(url);
      return data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const message = error.response?.data?.status_message || 'Failed to fetch movie details.';
        const statusCode = error.response?.status ?? 500;
        throw new AppError(message, statusCode);
      }
      throw new AppError('Unexpected error occurred while fetching movie details.', 500);
    }
  }
}