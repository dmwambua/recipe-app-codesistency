import { Slot } from "expo-router";
import { ClerkProvider } from '@clerk/clerk-expo'
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import { SafeAreaView } from 'react-native-safe-area-context';
import SafeScreen from '../components/SafeScreen';
import { COLORS } from "../constants/colors";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ClerkProvider tokenCache={tokenCache}>
        <SafeScreen style={{ flex: 1, backgroundColor: COLORS.background }}>
          <Slot />
        </SafeScreen>
      </ClerkProvider>
    </GestureHandlerRootView>
  );
}
