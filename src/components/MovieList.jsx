import MovieCard from "./MovieCard";

function MovieList({ movies }) {
  return (
    <div className="movies">
      {movies.map((movie) => (
        <MovieCard movie={movie} key={movie.imdbID} />
      ))}
    </div>
  );
}

export default MovieList;
