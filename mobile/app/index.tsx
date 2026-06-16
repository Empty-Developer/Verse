import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Input from "./constants/ui/Input";


export default function Index() {
  const log = () => {
    console.log("completed");
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        start={{x: 0.20, y: 0.40}} end={{x: 1, y: 1}}
        locations={[0,0.5,0.7]}
        colors={["rgba(255,1,67,1)", "rgba(224,86,120,1)", "rgba(210,129,146,1)", "rgba(196,165,168,1)", "transparent" ]}
        style={styles.background}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 1200
  },
});
