import fetchMovies from "../../services/movieService";
import SearchBar from "../SearchBar/SearchBar";
import { Toaster } from 'react-hot-toast';
import { useState } from "react";
import toast from 'react-hot-toast';
import type { Movie } from "../../types/movie";
import MovieGrid from "../MovieGrid/MovieGrid"
import MovieModal from "../MovieModal/MovieModal"
import Loader from "../Loader/Loader"
import ErrorMessage from "../ErrorMessage/ErrorMessage"

function App() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)
  const [isLoader, setIsLoader] = useState(false)
  const [isError, setIsError] = useState(false)

  const handleSelect = (movie: Movie) => {
    setSelectedMovie(movie)
  }

  const handleCloseModal = () => {
    setSelectedMovie(null)
  }

  const handleSearch = async (newMovie: string) => {
    try {
      setMovies([])
      setIsLoader(true)
      setIsError(false)
      const arrMovie = await fetchMovies(newMovie)
      if (!arrMovie.length) {
        setMovies([])
        toast.error("No movies found for your request.")
        return
      }
      setMovies(arrMovie)
      
    }
    catch {
      setIsError(true)
    } finally {
setIsLoader(false)
    }
  }
  return <>
    <SearchBar onSubmit={handleSearch} />
    <Toaster position="top-center" />
    {isLoader && <Loader />}
    {isError && <ErrorMessage/>}
    {movies.length > 0 && <MovieGrid movies={movies} onSelect={handleSelect} />}
    {selectedMovie && <MovieModal movie={selectedMovie} onClose={handleCloseModal}/>}
  </>
}

export default App
