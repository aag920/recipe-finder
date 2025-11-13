const API_BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export async function searchRecipes(query) {
  try {
    const response = await fetch(`${API_BASE_URL}/search.php?s=${query}`);
    const data = await response.json();
    return data.meals;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw error;
  }
}

export async function getRecipeById(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/lookup.php?i=${id}`);
    const data = await response.json();
    return data.meals ? data.meals[0] : null;
  } catch (error) {
    console.error("Error fetching recipe details:", error);
    throw error;
  }
}

export async function getRandomRecipe() {
  try {
    const response = await fetch(`${API_BASE_URL}/random.php`);
    const data = await response.json();
    return data.meals ? data.meals[0] : null;
  } catch (error) {
    console.error("Error fetching random recipe:", error);
    throw error;
  }
}
