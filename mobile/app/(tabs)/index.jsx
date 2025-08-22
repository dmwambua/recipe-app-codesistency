import { View, Text } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { MealAPI, mealAPI } from "../../services/mealAPI";

const HomeScreen = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [featuredRecipe, setFeaturedRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      setLoading(true);
      const [apiCategories, randomMeals, randomMeal] = await Promise.all([
        MealAPI.getCategories(),
        MealAPI.getRandomMeals(12),
        MealAPI.getRandomMeal(),
      ]);
      const transformedCategories = apiCategories.map((cat, index) => ({
        id: index + 1,
        name: cat.strCategory,
        image: cat.strCategoryThumb,
        description: cat.strCategoryDescription,

      }));
      setCategories(transformedCategories);
      const transformedMeals = randomMeals.map((meal) => MealAPI.transformMealData(meal).filter((meal) => meal != null));
      setRecipes(transformedMeals);

      const transformedFeatured = randomMeal.map((meal) => MealAPI.transformMealData(meal).filter((meal) => meal != null));
      setFeaturedRecipe(transformedFeatured);

    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadCategoryData = async (category) => {
    try {
      const meals = await MealAPI.filterByCategory(category);
      const transformedMeals = meals.map((meal) => MealAPI.transformMealData(meal).filter((meal) => meal != null));
      setRecipes(transformedMeals);
    } catch (error) {
      console.error("Error loading category data:", error);
      setRecipes([]);
    }
  };

const handleCategorySelect = async (category) => {
  setSelectedCategory(category);
  await loadCategoryData(category);
};

  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  );
};
export default HomeScreen;
