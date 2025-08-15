import { StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import UzaNunuaLogo from "../assets/images/UZA-Nunua-Logo-2.png";
export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the DW recipe app!</Text>
      <Image
        source={UzaNunuaLogo}
        style={{
          width: 100,
          height: 100
        }}
      />
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
