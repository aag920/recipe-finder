import React from "react";

function FavoriteButton({ isFavorite, onClick }) {
  return (
    <button
      className={`favorite-btn ${isFavorite ? "is-favorite" : ""}`}
      onClick={onClick}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      {isFavorite ? "❤️" : "🤍"}
    </button>
  );
}

export default FavoriteButton;
