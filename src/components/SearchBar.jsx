import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function SearchBar({ variant = "", useLocalLoading = false }) {
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const initialSearch = params.get("search") || "";

  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setSearchTerm(initialSearch);
  }, [initialSearch]);

  function handleSearch() {
    if (!searchTerm.trim() || isLoading) return;

    if (useLocalLoading) {
      setIsLoading(true);
    }

    setTimeout(() => {
      navigate(`/movies?search=${encodeURIComponent(searchTerm)}`);
    }, 600);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      handleSearch();
    }
  }

  return (
    <div className={`search-bar ${variant}`}>
      <input
        type="text"
        placeholder="Search by title"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        onKeyDown={handleKeyDown}
      />

      <button onClick={handleSearch} disabled={isLoading} aria-label="Search">
        {isLoading ? (
          <span className="search-spinner">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </span>
        ) : (
          <svg
            viewBox="0 0 640 640"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="currentColor"
              d="M480 272C480 317.9 465.1 360.3 440 394.7L566.6 521.4C579.1 533.9 579.1 554.2 566.6 566.7C554.1 579.2 533.8 579.2 521.3 566.7L394.7 440C360.3 465.1 317.9 480 272 480C157.1 480 64 386.9 64 272C64 157.1 157.1 64 272 64C386.9 64 480 157.1 480 272zM272 416C351.5 416 416 351.5 416 272C416 192.5 351.5 128 272 128C192.5 128 128 192.5 128 272C128 351.5 192.5 416 272 416z"
            />
          </svg>
        )}
      </button>
    </div>
  );
}

export default SearchBar;
