import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function SearchBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const initialSearch = params.get("search") || "";

  const [searchTerm, setSearchTerm] = useState(initialSearch);

  function handleSearch() {
    if (!searchTerm.trim()) return;
    navigate(`/movies?search=${encodeURIComponent(searchTerm)}`);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleSearch();
    }
  }

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by title"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <button onClick={handleSearch}>🔍</button>
    </div>
  );
}

export default SearchBar;
