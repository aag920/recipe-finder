import React from "react";
import FavoriteButton from "./FavoriteButton";
import "../styles/RecipeCard.css";

function RecipeCard({
  recipe,
  isFavorite,
  onToggleFavorite,
  onViewDetails,
  token,
}) {
  return (
    <div className="recipe-card" onClick={() => onViewDetails(recipe)}>
      <div className="recipe-image-container">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="recipe-image"
        />
        {token && (
          <FavoriteButton
            isFavorite={isFavorite}
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(recipe);
            }}
          />
        )}
      </div>

      <div className="recipe-info">
        <h3 className="recipe-title">{recipe.strMeal}</h3>
        <div className="recipe-meta">
          <span className="recipe-category">{recipe.strCategory}</span>
          <span className="recipe-area">{recipe.strArea}</span>
        </div>
        {recipe.strTags && (
          <div className="recipe-tags">
            {recipe.strTags
              .split(",")
              .slice(0, 2)
              .map((tag, index) => (
                <span key={index} className="recipe-tag">
                  {tag.trim()}
                </span>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default RecipeCard;
