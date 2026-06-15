import { StyleSheet, Text, View } from "react-native";
import Button from "./constants/ui/Button";

export default function Index() {
  const log = () => {
    console.log("completed");
  };

  return (
    <View style={styles.container}>
      <Button onPress={log} title="Hello" style={styles.button} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#333",
    padding: 4,
    color: "#fff",
    borderRadius: 8,
    fontSize: 20,
    fontWeight: 700
  },
});
