import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { Heart, Plus } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "@/components/ui/Button";
import LottieView from "lottie-react-native";

export default function Main() {
  return (
    <SafeAreaView style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        <Link href={"/(protected)/create-post"}>
          <Plus />
        </Link>
        <Text style={styles.mainText}>Verse</Text>
        <Link href={"/(protected)/like"}>
          <Heart />
        </Link>
      </View>
      {/* banner */}
      <View style={styles.banner}>
        <View style={{ flex: 1 }}>
          <Text style={styles.textBanner}>Get inspired by your idols</Text>

          <Button title="Start" style={styles.buttonBanner} />
        </View>

        <LottieView
          source={require("@/assets/animated/superhero.json")}
          autoPlay
          loop
          style={styles.animation}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 26,
    paddingVertical: 12,
  },
  mainText: {
    fontWeight: "600",
    fontSize: 32,
    fontFamily: "SF Compact Rounded",
  },
  banner: {
    marginTop: 5,
    backgroundColor: "#eac3f4ff",
    borderRadius: 20,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 20
  },
  bannerImageComponents: {
    position: "absolute",
    bottom: 0,
    right: 4,
    width: 28,
    height: 28,
  },
  imageBackgroundBanner: {
    width: "100%",
    height: "100%",
  },
  textBanner: {
    width: 180,
    fontSize: 24,
    color: "#000000ff",
    fontWeight: "700",
  },
  buttonBanner: {
    marginTop: 12,
    alignSelf: "flex-start",
    borderRadius: 20,
    paddingHorizontal: 50
  },
  animation: {
    width: 160,
    height: 160,
  },
});
