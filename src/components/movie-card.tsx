import Image from 'next/image';
import Link from 'next/link';
import { Movie } from '@/types/movie';

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const { title, overview, poster_path, id } = movie;
  const posterSrc = poster_path
    ? `https://image.tmdb.org/t/p/w200${poster_path}`
    : '/placeholder-image.png';

  return (
    <Link href={`/${id}`}>
      <div className="bg-white rounded shadow p-4 flex space-x-4 hover:bg-gray-50 transition cursor-pointer">
        <div className="relative flex-shrink-0 w-[100px] h-[150px] md:w-[133px] md:h-[200px]">
          <Image
            src={posterSrc}
            alt={title}
            fill
            sizes="(max-width: 768px) 100px, (max-width: 1200px) 133px, 133px"
            className="object-cover rounded"
            placeholder="blur"
            blurDataURL="/placeholder-blur.png"
          />
        </div>
        <div className="flex-1">
          <h2 className="font-bold text-xl mb-2">{title}</h2>
          <p className="text-gray-700 line-clamp-4">{overview}</p>
        </div>
      </div>
    </Link>
  );
}
