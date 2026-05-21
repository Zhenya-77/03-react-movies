import axios from "axios";
import type { Movie } from "../types/movie";

export interface arrMovies {
    results: Movie[]
}

async function fetchMovies(movie: string) {
    const res = await axios.get<arrMovies>(`https://api.themoviedb.org/3/search/movie`,
        {params: {query: movie},
  headers: {Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,}})
 
    return res.data.results
}

export default fetchMovies