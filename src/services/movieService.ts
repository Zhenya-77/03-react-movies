import axios from "axios";
import type { Movie } from "../types/movie";

export interface ArrMovies {
  results: Movie[];
}

async function fetchMovies(movie: string): Promise<Movie[]> {
  const res = await axios.get<ArrMovies>(
    `https://api.themoviedb.org/3/search/movie`,
    {
      params: { query: movie },
      headers: { Authorization: `Bearer ${import.meta.env.VITE_API_KEY}` },
    }
  );

  return res.data.results;
}

export default fetchMovies;
