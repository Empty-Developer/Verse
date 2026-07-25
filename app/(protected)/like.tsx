import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Post } from "@/types/post";
import { supabase } from "@/lib/supabase";
import { getLikePosts } from "@/lib/posts";
import { SafeAreaView } from "react-native-safe-area-context";
import PostImage from "@/components/ui/ImagePost";
import { CornerUpLeft } from "lucide-react-native";
import { router } from "expo-router";

export default function Like() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) return;

        const liked = await getLikePosts(user.id);

        setPosts(liked);
      } catch (error) {
        console.log("load liked posts error:", error);
      }
    }

    load();
  }, []);

  const handlerBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handlerBack}>
          <CornerUpLeft size={26} style={{ pointerEvents: "none" }} />
        </TouchableOpacity>
        <Text style={styles.mainText}>Likes</Text>
        <View style={{ width: 26 }} />
      </View>
      {posts.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>You don't like any posts yet</Text>
        </View>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingBottom: 40,
          }}
          renderItem={({ item }) => (
            <View style={styles.card}>
              {/* post header */}
              <View style={styles.postHeader}>
                {item.profile?.avatar_url ? (
                  <Image
                    source={{
                      uri: item.profile.avatar_url,
                    }}
                    style={styles.profileImage}
                  />
                ) : (
                  <View style={styles.placeholderImage}>
                    <Image
                      source={require("@/assets/images/user.png")}
                      style={styles.image}
                    />
                  </View>
                )}
                <View style={styles.titleContainer}>
                  <Text style={styles.nameText}>{item.profile?.username}</Text>

                  <Text style={styles.title}>{item.title}</Text>
                </View>
              </View>
              <PostImage uri={item.cover} />
            </View>
          )}
        />
      )}
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
  card: {
    marginBottom: 24,
    marginTop: 12,
  },
  postHeader: {
    flexDirection: "row",
    marginBottom: 16,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 100,
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
  titleContainer: {
    flex: 1,
    marginLeft: 12,
    minWidth: 0,
  },
  nameText: {
    fontSize: 18,
    fontWeight: "600",
  },
  title: {
    fontSize: 18,
    fontWeight: "400",
  },
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    color: "#777",
  },
});
