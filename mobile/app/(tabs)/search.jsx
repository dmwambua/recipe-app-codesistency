import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { useEffect, useState } from 'react';
import { MealAPI } from '../../services/mealAPI';
import { useDebounce } from '../../hooks/useDebounce';
import { searchStyles } from '../../assets/styles/search.styles';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // Debounce the search query using the custom debounce hook
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const performSearch = async (query) => {
    // If the search query is empty, fetch random recipes
    if (!query.trim()) {
      //trim checks for empty strings by removing whitespace from both ends
      const randomRecipes = await MealAPI.getRandomMeals(12);
      setRecipes(randomRecipes);
      return randomRecipes.map(meal => MealAPI.transformMealData(meal))
        .filter(meal => meal !== null)
    }
    // Search by name first, then by ingredients if no results
    const nameResults = await MealAPI.searchMealsByName(query);
    let results = nameResults;

    if (results.length === 0) {
      const ingredientResults = await MealAPI.filterByIngredients(query);
      results = ingredientResults;
    }

    return results
      .slice(0, 12) // Limit to first 12 results
      .map(meal => MealAPI.transformMealData(meal))
      .filter(meal => meal !== null);
  };

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const results = await performSearch('');
        setRecipes(results);
      }
      catch (error) {
        console.log("Error loading initial data:", error);
      } finally {
        setInitialLoading(false);
      }
    };
    loadInitialData();
  }, []);
  useEffect(() => {
    if (initialLoading) return; // Skip if still loading initial data
    const handleSearch = async () => {
      setLoading(true);
      try {
        const results = await performSearch(debouncedSearchQuery);
        setRecipes(results);
      } catch (error) {
        console.log("Error performing search:", error);
      } finally {
        setLoading(false);
      }
    };
    handleSearch();
  },
    [debouncedSearchQuery, initialLoading]);
  if (initialLoading) return <Text>Loading...</Text>;
  return (
    <View style={searchStyles.container}>
      <View style={searchStyles.searchSection}>
        <View style={searchStyles.searchContainer}>
          <Ionicons
            name="search"
            size={20}
            color={COLORS.textLight}
            style={searchStyles.searchIcon}
          />
          <TextInput
            style={searchStyles.searchInput}
            placeholder="Search recipes, ingredients..."
            placeholderTextColor={COLORS.textLight}
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search" // Show "search" on the keyboard
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')} style={searchStyles.clearButton}>
              <Ionicons
                name="close-circle"
                size={20}
                color={COLORS.textLight}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={searchStyles.resultsSection}>
        <View style={searchStyles.resultsSection}>
          <View style={searchStyles.resultsHeader}>
            <Text style={searchStyles.resultsTitle}>{searchQuery ? `Results for "${searchQuery}"` : "Popular Recipes"}</Text>
            <Text style={searchStyles.resultsCount}>{recipes.length} found.</Text>
          </View>
        </View>
        {loading ? (
          <View>

          </View style={searchStyles.loadingContainer}>
        <Text >Loading...</Text>
        ) : ()}
      </View>

    </View>

  )
}

export default SearchScreen;