import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { MovieService } from '@/services/movie-service';
import { MovieDetail, Genre } from '@/types/movie';
import Link from 'next/link';
import Layout from '@/components/layout';
import { AppError } from '@/types/error';

interface MovieDetailProps extends Partial<MovieDetail> {
  error?: string;
}

export const getServerSideProps: GetServerSideProps<MovieDetailProps> = async (context) => {
  const { id } = context.params || {};
  const movieId = Array.isArray(id) ? id[0] : id;

  if (!movieId) {
    return { props: { error: 'No movie ID provided' } };
  }

  const movieService = new MovieService();
  try {
    const movie = await movieService.getMovieById(movieId);
    return { props: { ...movie } };
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong while fetching movie details.';
    if (error instanceof AppError) {
      errorMessage = error.message;
    }
    return { props: { error: errorMessage } };
  }
};

export default function MovieDetailPage(props: MovieDetailProps) {
  const { error, title, overview, backdrop_path, release_date, runtime, genres } = props;

  return (
    <Layout>
      {error && (
        <div className="text-red-600 mb-4">
          <p>{error}</p>
        </div>
      )}

      {!error && (
        <div className="max-w-4xl mx-auto p-4">
          <div className="relative w-full h-64 md:h-96 mb-4">
            {backdrop_path && (
              <Image
                src={`https://image.tmdb.org/t/p/w1280${backdrop_path}`}
                alt={title || ''}
                fill
                className="object-cover rounded"
                placeholder="blur"
                blurDataURL="/placeholder-blur.png"
              />
            )}
          </div>
          {title && <h1 className="text-3xl font-bold mb-2">{title}</h1>}
          {release_date && (
            <p className="text-gray-700 mb-2">
              <strong>Release Date:</strong> {release_date}
            </p>
          )}
          {typeof runtime === 'number' && (
            <p className="text-gray-700 mb-2">
              <strong>Runtime:</strong> {runtime} min
            </p>
          )}
          {genres && genres.length > 0 && (
            <p className="text-gray-700 mb-2">
              <strong>Genres:</strong> {genres.map((g: Genre) => g.name).join(', ')}
            </p>
          )}
          {overview && (
            <p className="text-gray-800 mb-4">{overview}</p>
          )}
          <Link
            href="/"
            className="inline-block mt-4 text-indigo-600 hover:underline"
          >
            ← Back to Popular Movies
          </Link>
        </div>
      )}
    </Layout>
  );
}
