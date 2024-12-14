import Layout from '@/components/layout';
import MovieCard from '@/components/movie-card';
import { MovieService } from '@/services/movie-service';
import { Movie } from '@/types/movie';
import { GetServerSideProps } from 'next';

interface HomeProps {
  movies: Movie[];
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const movieService = new MovieService();
  const movies = await movieService.getPopularMovies();
  return { props: { movies } };
};

export default function Home({ movies }: HomeProps) {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Popular Movies</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
          />
        ))}
      </div>
    </Layout>
  );
}
