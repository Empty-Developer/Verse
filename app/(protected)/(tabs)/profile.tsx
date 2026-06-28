import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { uploadProfileBackground, uploadProfileImage } from "@/lib/storage";
import { supabase } from "@/lib/supabase";

export default function SettingsScreen() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null)

  /**
   * @description this feature is located in the
   * user folder and allows the user to upload a
   * profile picture
   * @returns {string}
   */
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      console.log("error");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      // settings
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (result.canceled || !result.assets[0]) return;

    const imageUri = result.assets[0].uri;

    setProfileImage(imageUri);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      // upload in storage
      const publicUrl = await uploadProfileImage(user.id, imageUri);

      await supabase
        .from("profiles")
        .update({
          avatar_url: publicUrl,
        })
        .eq("id", user.id);

      console.log("Avatar uploaded:", publicUrl);
    } catch (error) {
      console.error(error);
    }
  };

  const pickImageBackground = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      console.log("error");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      // settings
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });

    if (result.canceled || !result.assets[0]) return;

    const imageUri = result.assets[0].uri;

    setBackgroundImage(imageUri);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      // upload in storage
      const publicUrl = await uploadProfileBackground(user.id, imageUri);

      await supabase
        .from("profiles")
        .update({
          background_url: publicUrl,
        })
        .eq("id", user.id);

      console.log("Background uploaded:", publicUrl);
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * @description this function sends a
   * request to the user table and
   * retrieves only the avatar
   * photo from there
   * @returns {string}
   */
  const loadProfileImage = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        /*
          make a query to
          the table
        */
        .from("profiles")
        .select("avatar_url")
        .eq("id", user.id)
        .single();

      if (error) throw error;

      if (data?.avatar_url) {
        setProfileImage(data.avatar_url);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const loadProfileBackground = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        /*
          make a query to
          the table
        */
        .from("profiles")
        .select("background_url")
        .eq("id", user.id)
        .single();

      if (error) throw error;

      if (data?.background_url) {
        setBackgroundImage(data.background_url);
      }
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    loadProfileImage();
    loadProfileBackground()
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.background}
        onPress={pickImageBackground}
      >
        {backgroundImage ? (
          <>
            <Image
              source={{ uri: backgroundImage }}
              style={styles.backgroundImage}
            />

            <View style={styles.overlay} />
          </>
        ) : (
          <View style={styles.backgroundPlaceholder} />
        )}
      </TouchableOpacity>
      {/* profile image */}
      <View style={styles.form}>
        <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
          {profileImage ? (
            <Image
              source={{ uri: profileImage }} // take image from picker-expo
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
          <View style={styles.editBadge}>
            <Text style={styles.editText}>Edit</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: 160,
    height: 160,
  },
  form: {
    width: "100%",
    alignItems: "center",
  },
  imageContainer: {
    marginBottom: 32,
    marginTop: -80,
    position: "relative",
  },
  placeholderImage: {
    width: 150,
    height: 150,
    position: "relative",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#afafafff",
    borderStyle: "dashed",
  },
  editBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#171717ff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  editText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  profileImage: {
    width: 160,
    height: 160,
    borderRadius: 100,
  },
  background: {
    width: "100%",
    height: 220,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: "hidden",
    backgroundColor: "#c2c2c2",
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
  },
  backgroundPlaceholder: {
    flex: 1,
    backgroundColor: "#c2c2c2",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.40)",
  },
});
