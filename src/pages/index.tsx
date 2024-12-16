import Layout from '@/components/layout';
import MovieCard from '@/components/movie-card';
import { MovieService } from '@/services/movie-service';
import { AppError } from '@/types/error';
import { Movie } from '@/types/movie';
import { GetServerSideProps } from 'next';

interface HomeProps {
  movies?: Movie[];
  error?: string;
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const movieService = new MovieService();
  try {
    const movies = await movieService.getPopularMovies();
    return { props: { movies } };
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong while fetching popular movies.';
    if (error instanceof AppError) {
      errorMessage = error.message;
    }
    return { props: { error: errorMessage } };
  }
};

export default function Home({ movies, error }: HomeProps) {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Popular Movies</h1>
      {error && (
        <div className="text-red-600 mb-4">
          <p>{error}</p>
        </div>
      )}
      {!error && movies && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
            />
          ))}
        </div>
      )}
    </Layout>
  );
}