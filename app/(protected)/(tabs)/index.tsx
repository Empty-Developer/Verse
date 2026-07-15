import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Link, Redirect } from "expo-router";
import { Heart, Plus } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "@/components/ui/Button";
import LottieView from "lottie-react-native";
import { router } from "expo-router";
import { getPosts, getCoverUrl } from "@/lib/posts";
import { Post } from "@/types/post";
import PostImage from "@/components/ui/ImagePost";

export default function Main() {
  const [posts, setPosts] = useState<Post[]>([]);

  const handlerBanner = () => {
    router.push("/(protected)/(tabs)/library");
  };

  useEffect(() => {
    async function load() {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (error) {
        console.log(error);
      }
    }

    load();
  }, []);

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
      <View style={{ paddingHorizontal: 20 }}>
        <FlatList
          data={posts}
          contentContainerStyle={styles.list}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            // banner
            <View style={styles.banner}>
              <View style={{ flex: 1 }}>
                <Text style={styles.textBanner}>Check out our library</Text>

                <Button
                  title="Let's go"
                  style={styles.buttonBanner}
                  textStyle={styles.textButtonBanner}
                  onPress={handlerBanner}
                />
              </View>

              <LottieView
                source={require("@/assets/animated/superhero.json")}
                autoPlay
                loop
                style={styles.animation}
              />
            </View>
          }
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.title}>{item.title}</Text>
              <PostImage uri={getCoverUrl(item.cover)} />
            </View>
          )}
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
    backgroundColor: "#eac3f4ff",
    borderRadius: 20,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 24,
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
    paddingHorizontal: 50,
  },
  animation: {
    width: 160,
    height: 160,
  },
  textButtonBanner: {
    fontFamily: "SF Compact Rounded",
    fontSize: 17,
  },

  list: {
    paddingHorizontal: 5,
    paddingBottom: 40,
  },

  row: {
    justifyContent: "space-between",
    marginBottom: 26,
  },

  card: {
    marginBottom: 24,
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    paddingHorizontal: 4,
  },

  cover: {
    width: "100%",
    height: 230,
    borderRadius: 18,
    resizeMode: "cover",
  },
});
