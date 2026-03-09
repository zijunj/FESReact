import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import Nav from "../components/Nav";
import SearchBar from "../components/SearchBar";
import MovieList from "../components/MovieList";
import Loading from "../components/Loading";

const API_KEY = "a49cb7d7";
const MOVIE_LIMIT = 6;

function Movies() {
  const location = useLocation();

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("default");
  const [titleAnimating, setTitleAnimating] = useState(false);

  const searchTerm = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get("search");
  }, [location.search]);

  const apiSearchTerm = searchTerm || "batman";

  useEffect(() => {
    setTitleAnimating(true);

    const timeout = setTimeout(() => {
      setTitleAnimating(false);
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchTerm]);

  useEffect(() => {
    async function fetchMovies() {
      setLoading(true);

      try {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(apiSearchTerm)}`,
        );
        const data = await res.json();

        if (!data.Search) {
          setMovies([]);
          setLoading(false);
          return;
        }

        const uniqueSearchResults = data.Search.filter(
          (movie, index, self) =>
            index === self.findIndex((m) => m.imdbID === movie.imdbID),
        ).slice(0, MOVIE_LIMIT);

        const detailedMovies = await Promise.all(
          uniqueSearchResults.map(async (movie) => {
            const res = await fetch(
              `https://www.omdbapi.com/?apikey=${API_KEY}&i=${movie.imdbID}`,
            );
            const details = await res.json();

            return {
              ...movie,
              imdbRating: details.imdbRating,
            };
          }),
        );

        setMovies(detailedMovies);
      } catch (err) {
        console.error(err);
        setMovies([]);
      }

      setLoading(false);
    }

    fetchMovies();
  }, [searchTerm]);

  const sortedMovies = useMemo(() => {
    const sorted = [...movies];

    sorted.sort((a, b) => {
      const yearA = parseInt(a.Year) || 0;
      const yearB = parseInt(b.Year) || 0;

      const ratingA = parseFloat(a.imdbRating) || 0;
      const ratingB = parseFloat(b.imdbRating) || 0;

      if (sortOrder === "newest") return yearB - yearA;
      if (sortOrder === "oldest") return yearA - yearB;
      if (sortOrder === "RATING_HIGH") return ratingB - ratingA;
      if (sortOrder === "RATING_LOW") return ratingA - ratingB;

      return 0;
    });

    return sorted;
  }, [movies, sortOrder]);

  return (
    <>
      <section id="header">
        <div className="overlay"></div>
        <Nav />

        <div className="search">
          <h1 className="search-title">Browse the Movies</h1>
          <SearchBar />
        </div>
      </section>

      <section id="movies">
        <div className="container">
          <div className="movies__header">
            <h2 className={`results-title ${titleAnimating ? "animate" : ""}`}>
              {searchTerm
                ? `Search results for "${searchTerm}"`
                : "Search results:"}
            </h2>

            <select
              id="sort-select"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="default">Default</option>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="RATING_HIGH">Rating (High → Low)</option>
              <option value="RATING_LOW">Rating (Low → High)</option>
            </select>
          </div>

          {loading ? (
            <Loading />
          ) : sortedMovies.length > 0 ? (
            <MovieList movies={sortedMovies} />
          ) : (
            <div className="movies">
              <p className="no-results">No movies found.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Movies;
