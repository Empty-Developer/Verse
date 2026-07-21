import {
  Alert,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Link } from "expo-router";
import { Forward, Heart, MessageSquare, Plus } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "@/components/ui/Button";
import LottieView from "lottie-react-native";
import { router } from "expo-router";
import { getPosts } from "@/lib/posts";
import { Post } from "@/types/post";
import PostImage from "@/components/ui/ImagePost";
import { supabase } from "@/lib/supabase";
import * as ImagePicker from "expo-image-picker";
import { usePost } from "@/hooks/usePosts";
import { usePostStore } from "@/stores/usePostStore";

export default function Main() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const posts = usePostStore((state) => state.posts);
  const setPosts = usePostStore((state) => state.setPosts);
  // post editor or how create post
  const [showPreview, setShowPreview] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [description, setDescription] = useState<string>(""); // supa - title
  // like
  const like = false;
  const likes = [];
  const { createPost } = usePost();

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
    async function loadPosts() {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (error) {
        console.log(error);
      }
    }

    loadPosts();
    loadProfile();
    takeUserName();
  }, []);

  /**
   * @description fetches the authenticated
   * user profile from the `posts`
   * table and synchronizes the img-post
   * with the local react state
   * @returns {Promise<void>}
   */
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      console.log("Permission denied");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (result.canceled || !result.assets[0]) return;

    const imageUri = result.assets[0].uri;

    setPreviewImage(imageUri);
    setShowPreview(true);
    setDescription("");

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      // const publicUrl = await uploadCover(user.id, imageUri);
      const publicUrl = imageUri;

      await supabase
        .from("posts")
        .insert({
          user_id: user.id,
          cover: publicUrl,
          title: "",
        })
        .select()
        .single();
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * @description fetches the authenticated
   * user profile from the `posts`
   * table and synchronizes the img-post
   * with the local react state
   * but now this depends on the photo he took
   * @returns {Promise<void>}
   */
  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission denied");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (result.canceled || !result.assets[0]) return;

    const imageUri = result.assets[0].uri;

    setPreviewImage(imageUri);
    setShowPreview(true);
    setDescription("");

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      // const publicUrl = await uploadCover(user.id, imageUri);
      const publicUrl = imageUri;

      await supabase
        .from("posts")
        .insert({
          user_id: user.id,
          cover: publicUrl,
          title: "",
        })
        .select()
        .single();
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * @description this function call ui layout
   * where user can select Camera, Photo Library, Cancel
   */
  const showImagePicker = () => {
    Alert.alert("Select Post Image", "Choose an option", [
      { text: "Camera", onPress: takePhoto },
      { text: "Photo Library", onPress: pickImage },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const handlerPost = async () => {
    if (!previewImage) {
      return;
    }
    try {
      await createPost(previewImage, description);
      setPreviewImage(null);
      setDescription("");
      setShowPreview(false);
    } catch (error) {
      console.log("error create post: ", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={showImagePicker}>
          <Plus style={{ pointerEvents: "none" }} />
        </TouchableOpacity>
        <Text style={styles.mainText}>Verse</Text>
        <TouchableOpacity>
          <Heart style={{ pointerEvents: "none" }} />
        </TouchableOpacity>
      </View>
      {/* post */}
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
              <PostImage uri={item.cover} />

              {/* like, comment, share */}
              <View style={styles.footer}>
                {/* likes */}
                <View style={styles.footerButton}>
                  <TouchableOpacity>
                    <Heart size={24} color={like? "#ff0000ff" : "#000"} fill={like? "#ff0000ff" : "#fff"}/>
                  </TouchableOpacity>
                  <Text style={styles.count}>
                    {
                      likes?.length
                    }
                  </Text>
                </View>
                {/* comments */}
                <View style={styles.footerButton}>
                  <TouchableOpacity>
                    <MessageSquare />
                  </TouchableOpacity>
                  <Text style={styles.count}>
                    {
                      0
                    }
                  </Text>
                </View>
                {/* share */}
                <View style={styles.footerButton}>
                  <TouchableOpacity>
                    <Forward />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
      </View>
      <Modal visible={showPreview} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Preview Your Post</Text>
            {previewImage && (
              <Image
                style={styles.previewImage}
                source={{ uri: previewImage }}
              />
            )}
            <TextInput
              style={styles.descriptionInput}
              placeholder="Add a description..."
              placeholderTextColor={"#999"}
              value={description}
              onChangeText={setDescription}
              multiline
              maxLength={500}
              textAlignVertical="top"
            />
            <View style={styles.modalButtons}>
              <Button
                style={[styles.modalButton, styles.cancelButton]}
                textStyle={styles.cancelButtonText}
                title="Cancel"
                onPress={() => {
                  setShowPreview(false);
                  setPreviewImage(null);
                  setDescription("");
                }}
              />
              <Button
                title="Post"
                style={[styles.modalButton, styles.postButton]}
                textStyle={styles.postButtonText}
                onPress={handlerPost}
              />
            </View>
          </View>
        </View>
      </Modal>
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
    marginTop: 12,
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
  },
  // modal
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 24,
    width: "100%",
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 600,
    marginBottom: 16,
    textAlign: "center",
    fontFamily: "SF Compact Rounded",
  },
  previewImage: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 12,
    marginBottom: 16,
  },
  descriptionInput: {
    width: "100%",
    minHeight: 80,
    maxHeight: 120,
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    color: "#000",
  },
  modalButtons: {
    flexDirection: "row",
    gap: 12,
  },
  modalButton: {
    flex: 1,
    padding: 16,
    borderRadius: 18,
    alignItems: "center",
  },
  postButton: {
    backgroundColor: "#000",
  },
  postButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: 600,
  },
  cancelButtonText: {
    color: "black",
    fontSize: 16,
    fontWeight: 600,
  },
  cancelButton: {
    backgroundColor: "#f5f5f5",
  },
  // like, comment and share
  footer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 25,
    marginTop: 15
  },
  footerButton: {
    marginLeft: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  count: {
    fontSize: 14
  },
});
