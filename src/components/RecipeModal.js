import React from "react";
import FavoriteButton from "./FavoriteButton";
import "../styles/RecipeModal.css";

function RecipeModal({ recipe, isFavorite, onClose, onToggleFavorite }) {
  const getIngredients = () => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push({ ingredient, measure });
      }
    }
    return ingredients;
  };

  const ingredients = getIngredients();

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        <div className="modal-header">
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className="modal-image"
          />
          <div className="modal-header-overlay">
            <h2 className="modal-title">{recipe.strMeal}</h2>
            <div className="modal-meta">
              <span>{recipe.strCategory}</span>
              <span>•</span>
              <span>{recipe.strArea}</span>
            </div>
          </div>
          <FavoriteButton
            isFavorite={isFavorite}
            onClick={() => onToggleFavorite(recipe)}
          />
        </div>

        <div className="modal-body">
          <div className="modal-section">
            <h3>📝 Ingredients</h3>
            <ul className="ingredients-list">
              {ingredients.map((item, index) => (
                <li key={index}>
                  <span className="ingredient-measure">{item.measure}</span>
                  <span className="ingredient-name">{item.ingredient}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="modal-section">
            <h3>👨‍🍳 Instructions</h3>
            <div className="instructions">
              {recipe.strInstructions
                .split("\n")
                .map((step, index) => step.trim() && <p key={index}>{step}</p>)}
            </div>
          </div>

          {recipe.strYoutube && (
            <div className="modal-section">
              <a
                href={recipe.strYoutube}
                target="_blank"
                rel="noopener noreferrer"
                className="video-link"
              >
                🎥 Watch Video Tutorial
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RecipeModal;
