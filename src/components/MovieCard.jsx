import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  const poster =
    movie.Poster !== "N/A"
      ? movie.Poster
      : "https://via.placeholder.com/300x450?text=No+Image";

  return (
    <div className="movie">
      <Link to={`/movies/${movie.imdbID}`} className="movie__link">
        <div className="movie__card">
          <figure className="movie__img--wrapper">
            <img src={poster} alt={movie.Title} className="movie__img" />
          </figure>

          <div className="movie__body">
            <h3 className="movie__title">{movie.Title}</h3>

            <div className="movie__info">
              <span>{movie.Year}</span>
              <span className="movie__rating">
                ⭐ {movie.imdbRating || "N/A"}
              </span>{" "}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default MovieCard;
