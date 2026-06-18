import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export default function Onboarding() {
  const finishOnboarding = async () => {
    await AsyncStorage.setItem("onboarding", "true");

    router.replace("/");
  };

  return (
    <View style={styles.container}>
      <Text style={{
        color: "#333"
      }}>Hello</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})