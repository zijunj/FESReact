import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Nav from "../components/Nav";

function MovieInfo() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMovie() {
      setLoading(true);

      try {
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=a49cb7d7&i=${id}&plot=full`,
        );
        const data = await response.json();

        if (data.Response === "True") {
          setMovie(data);
        } else {
          setMovie(null);
        }
      } catch (error) {
        setMovie(null);
      }

      setLoading(false);
    }

    fetchMovie();
  }, [id]);

  if (loading) {
    return (
      <>
        <Nav />
        <section className="movie-info">
          <div className="container">
            <p>Loading...</p>
          </div>
        </section>
      </>
    );
  }

  if (!movie) {
    return (
      <>
        <Nav variant="home" />
        <section className="movie-info">
          <div className="container">
            <Link to="/movies" className="back__link">
              ← Back to movies
            </Link>
            <p>Movie not found.</p>
          </div>
        </section>
      </>
    );
  }

  const poster =
    movie.Poster !== "N/A"
      ? movie.Poster
      : "https://via.placeholder.com/300x450?text=No+Image";

  return (
    <>
      <Nav variant="home" />
      <section className="movie-info">
        <div className="container">
          <Link to="/movies" className="back__link">
            ← Back to movies
          </Link>

          <div className="movie-info__row">
            <div className="movie-info__img--wrapper">
              <img src={poster} alt={movie.Title} className="movie-info__img" />
            </div>

            <div className="movie-info__content">
              <h1 className="movie-info__title">{movie.Title}</h1>
              <p className="movie-info__meta">
                {movie.Year} • {movie.Runtime} • {movie.Genre}
              </p>
              <p className="movie-info__rating">IMDb: {movie.imdbRating}</p>
              <p className="movie-info__plot">{movie.Plot}</p>
              <p>
                <strong>Director:</strong> {movie.Director}
              </p>
              <p>
                <strong>Actors:</strong> {movie.Actors}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default MovieInfo;
