import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import RecipeCard from "./components/RecipeCard";
import RecipeModal from "./components/RecipeModal";
import { searchRecipes } from "./services/api";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const savedFavorites = localStorage.getItem("favoriteRecipes");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const handleSearch = async (searchTerm) => {
    if (!searchTerm.trim()) {
      setError("Please enter a search term");
      return;
    }

    setLoading(true);
    setError("");
    setShowFavorites(false);

    try {
      const results = await searchRecipes(searchTerm);
      if (results && results.length > 0) {
        setRecipes(results);
      } else {
        setRecipes([]);
        setError("No recipes found. Try a different search term!");
      }
    } catch (err) {
      setError("Failed to fetch recipes. Please try again.");
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (recipe) => {
    let updatedFavorites;
    const isFavorite = favorites.some((fav) => fav.idMeal === recipe.idMeal);

    if (isFavorite) {
      updatedFavorites = favorites.filter(
        (fav) => fav.idMeal !== recipe.idMeal
      );
    } else {
      updatedFavorites = [...favorites, recipe];
    }

    setFavorites(updatedFavorites);
    localStorage.setItem("favoriteRecipes", JSON.stringify(updatedFavorites));
  };

  const isFavorite = (recipeId) => {
    return favorites.some((fav) => fav.idMeal === recipeId);
  };

  const displayRecipes = showFavorites ? favorites : recipes;

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>Recipe Finder</h1>
          <p>Discover delicious recipes from around the world!</p>
        </div>
      </header>

      <main className="app-main">
        <SearchBar
          onSearch={handleSearch}
          favoritesCount={favorites.length}
          showFavorites={showFavorites}
          onToggleFavorites={() => setShowFavorites(!showFavorites)}
        />

        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Searching for recipes...</p>
          </div>
        )}

        {error && <div className="error-message">{error}</div>}

        {!loading && showFavorites && favorites.length === 0 && (
          <div className="empty-state">
            <p>No favorite recipes yet.</p>
          </div>
        )}

        <div className="recipes-grid">
          {displayRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.idMeal}
              recipe={recipe}
              isFavorite={isFavorite(recipe.idMeal)}
              onToggleFavorite={toggleFavorite}
              onViewDetails={setSelectedRecipe}
            />
          ))}
        </div>
      </main>

      {selectedRecipe && (
        <RecipeModal
          recipe={selectedRecipe}
          isFavorite={isFavorite(selectedRecipe.idMeal)}
          onClose={() => setSelectedRecipe(null)}
          onToggleFavorite={toggleFavorite}
        />
      )}
    </div>
  );
}

export default App;
