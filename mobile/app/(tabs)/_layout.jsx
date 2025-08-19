import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Stack, Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons";
const TabsLayout = () => {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) return <Redirect href={"/(auth)/sign-in"} />;

  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Recipes",
          tabBarIcon: ({ color, size }) =>
            <Ionicons name="restaurant" size={size} color={color} />
        }}
      />
    </Tabs>
  );
};
export default TabsLayout;
