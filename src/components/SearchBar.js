import React, { useState } from "react";
import "../styles/SearchBar.css";

function SearchBar({
  onSearch,
  favoritesCount,
  showFavorites,
  onToggleFavorites,
  token,
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className="search-bar-container">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for recipes..."
          className="search-input"
        />
        <button type="submit" className="search-button">
          🔍 Search
        </button>
      </form>

      {token && (
        <button
          onClick={onToggleFavorites}
          className={`favorites-button ${showFavorites ? "active" : ""}`}
        >
          ❤️ Favorites ({favoritesCount})
        </button>
      )}
    </div>
  );
}

export default SearchBar;
