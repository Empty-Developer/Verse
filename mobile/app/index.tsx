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

  /*
    TODO:
    1 - create liner gradient for circle onboarding
    2 - append a new fonts
    3 - think about the colors for onboarding
    ------------
    4 - create a new screen witch choice themes
  */

  const checkOnboarding = async () => {
    const value = await AsyncStorage.getItem("onboarding");

    setCompleted(value === "true");
    setLoading(false);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  if (!completed) {
    return <Redirect href="/onboarding" />;
  }
  return (
    <SafeAreaView style={styles.container}>
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
