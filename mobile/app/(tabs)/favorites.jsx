import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { useClerk, useUser } from '@clerk/clerk-expo';
import { useEffect, useState } from 'react';
import { API_URL } from '../../constants/api';
import { favoritesStyles } from '../../assets/styles/favorites.styles';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';

const FavoritesScreen = () => {
  const { signOut } = useClerk();
  const { user } = useUser();
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadFavorites = async () => {
      if (!user) return;

      try {
        const response = await fetch(`${API_URL}/favorites/${user.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch favorite recipes");
        }
        const favorites = await response.json();
        //transform the data to match the recipe card components expected format
        const transformedFavorites = favorites.map((favorite) => ({
          ...favorite,
          id: favorite.recipeId,
        }));

        setFavoriteRecipes(transformedFavorites);
      } catch (error) {
        console.error("Error loading favorites:", error);
        Alert.alert("Error loading favorites:", error.message);
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, [user.id]);
  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
      Alert.alert("Error signing out:", error.message);
    }
  };

  if (loading) {
    return (
      <View>
        <Text>Loading favotites...</Text>
      </View>
    );
  }

  return (
    <View style={favoritesStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={favoritesStyles.header}>
          <TouchableOpacity style={favoritesStyles.logoutButton} onPress={handleSignOut}>
            <Ionicons name="log-out-outline" size={22} color={COLORS.text} />
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  )
}

export default FavoritesScreen;