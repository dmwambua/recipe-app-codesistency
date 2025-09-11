import { View, Text, Alert, ScrollView } from 'react-native'
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-expo';
import { API_URL } from '../../constants/api';
import { MealAPI } from '../../api/MealAPI';
import LoadingSpinner from '../../components/LoadingSpinner';
import { recipeDetailStyles } from '../../assets/styles/recipeDetail.styles';
import { Image } from 'expo-image';

const RecipeDetailScreen = () => {
  const { id: recipeId } = useLocalSearchParams();
  const { loading, setLoading } = useState(true);
  const { isSaved, setIsSaved } = useState(false);
  const { isSaving, setIsSaving } = useState(false);
  const { recipe, setRecipe } = useState(null);
  const { user } = useUser();
  const userId = user ? user.id : null;
  useEffect(() => {
    const checkIfSaved = async () => {
      try {
        const response = await fetch(`${API_URL}/favorites/${userId}`);
        const favorites = await response.json();
        const isRecipeSaved = favorites.some(fav => fav.recipeId === parseInt(recipeId));
        setIsSaved(isRecipeSaved);
      } catch (error) {
        console.error('Error checking if recipe is saved:', error);
      }
    };
    const loadRecipeDetail = async () => {
      try {
        const mealData = await MealAPI.geMealById(recipeId);
        if (mealData) {
          const transformedRecipe = MealAPI.transformMealData(mealData);
          const recipeWithVideo = {
            ...transformedRecipe,
            youtubeUrl: mealData.strYoutube || null,
          };
          setRecipe(recipeWithVideo);
        }
      } catch (error) {
        console.error('Error loading recipe details:', error);
      } finally {
        setLoading(false);
      }
    };
      checkIfSaved();
      loadRecipeDetail();

    }, [recipeId, userId]);
  const getYoutubeEmbedUrl = (url) => {
    const videoId = url?.split('v=')[1];
    return `https://www.youtube.com/embed/${videoId}`;
  };
  const handleToggleSave = async () => {
    setIsSaving(true);
    try {
      if (isSaved) {
        //remove from favorites 
        const response = await fetch(`${API_URL}/favorites/${userId}/${recipeId}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to remove from favorites');
        setIsSaved(false);
      } else {
        //add to favorites
        const response = await fetch(`${API_URL}/favorites`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId,
            recipeId: parseInt(recipeId),
            title: recipe.title,
            image: recipe.image,
            cookTime: recipe.cookTime,
            servings: recipe.servings,
          }),
        });
        if (!response.ok) throw new Error('Failed to add to favorites');
        setIsSaved(true);
      }
    } catch (error) {
      console.error('Error updating favorite status:', error);
      Alert.alert('Error', `Something went wrong. Please try again`);
    } finally {
      setIsSaving(false);
    }
  };
      if (loading) {
        return <LoadingSpinner message="Loading recipe details..." />;
      }
if (!recipe) {
    return (
      <View style={recipeDetailStyles.container}>
        <Text>No recipe found.</Text>
      </View>
    );
    }
  return (
      <View style={recipeDetailStyles.container}>
        <ScrollView>
          {/* HEADER SECTION */}
          <View style={recipeDetailStyles.headerContainer}>
            <View style={recipeDetailStyles.imageContainer}>
              <Image
                source={{ uri: recipe.image }}
                style={recipeDetailStyles.image}
                contentFit="cover" />
            </View>

          </View>
        </ScrollView>
      </View>
    );
  };

  export default RecipeDetailScreen;