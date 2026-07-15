import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Link } from "expo-router";
import { Heart, Plus } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "@/components/ui/Button";
import LottieView from "lottie-react-native";
import { router } from "expo-router";
import { getPosts, getCoverUrl } from "@/lib/posts";
import { Post } from "@/types/post";
import PostImage from "@/components/ui/ImagePost";
import { supabase } from "@/lib/supabase";

export default function Main() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  const handlerBanner = () => {
    router.push("/(protected)/(tabs)/library");
  };

  const loadProfile = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from("profiles")
        .select("avatar_url, background_url")
        .eq("id", user.id)
        .single();

      if (error) throw error;

      if (data) {
        setProfileImage(data.avatar_url ?? null);
      }
    } catch (error) {
      console.error("Load profile error:", error);
    }
  };

  const [username, setUsername] = useState("");
  const takeUserName = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      setUsername(user.user_metadata.username);
    }
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
    loadProfile();
    takeUserName()
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
              <View style={styles.postHeader}>
                {profileImage ? (
                  <Image
                    source={{ uri: profileImage }}
                    style={styles.profileImage}
                  />
                ) : (
                  <View style={styles.placeholderImage}>
                    <Image
                      style={styles.image}
                      source={require("@/assets/images/user.png")}
                    />
                  </View>
                )}
                <View style={styles.titleContainer}>
                  <Text style={styles.nameText}>{username}</Text>
                  <Text style={styles.title}>{item.title}</Text>
                </View>
              </View>
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
    fontWeight: "400",
    flexShrink: 1,
    flexWrap: "wrap",
  },
  cover: {
    width: "100%",
    height: 230,
    borderRadius: 18,
    resizeMode: "cover",
  },
  image: {
    width: 60,
    height: 60,
  },
  placeholderImage: {
    width: 60,
    height: 60,
    borderRadius: 100,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 100,
  },
  postHeader: {
    flexDirection: "row",
    marginBottom: 16,
  },
  titleContainer: {
    flex: 1,
    marginLeft: 12,
    minWidth: 0,
  },
  nameText: {
    fontSize: 18,
    fontWeight: "600",
    flexShrink: 1,
  }
});
