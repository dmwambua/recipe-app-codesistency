import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import UzaNunuaLogo from "../assets/images/UZA-Nunua-Logo-2.png";
import { Link } from "expo-router";
export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the DW recipe app!</Text>

      <TouchableOpacity>
        <Text>Get Started</Text>
      </TouchableOpacity>

      <Link href="/about">Visit your favorites</Link>

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  text: { color: "blue", fontSize: 20, fontWeight: "bold" }
});
