import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "./components/ui/Button";

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    checkOnboarding();
  }, []);

  const checkOnboarding = async () => {
    const value = await AsyncStorage.getItem("onboarding");

    setCompleted(value === "true");
    setLoading(false);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }

  if (!completed) {
    return <Redirect href="/onboarding" />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <Button
        title="Hello"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  // background: {
  //   position: "absolute",
  //   left: 0,
  //   right: 0,
  //   top: 0,
  //   height: 1200
  // },
});
