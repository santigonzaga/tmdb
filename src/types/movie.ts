export interface Movie {
  id: number;
  title: string;
  poster_path?: string;
  overview: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface MovieDetail extends Movie {
  release_date: string;
  runtime: number;
  genres: Genre[];
  backdrop_path?: string;
}

// Response structures:
export interface MovieResponse {
  results: Movie[];
}

