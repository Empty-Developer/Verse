import {
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { uploadProfileBackground, uploadProfileImage } from "@/lib/storage";
import { supabase } from "@/lib/supabase";
import { PencilLine } from "lucide-react-native";
import { getUserBio, updateUserBio } from "@/lib/bio-user";

export default function UserScreen() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [bio, setBio] = useState("");
  const [editingBio, setEditingBio] = useState(false);

  /**
   * @description opens the device gallery, lets
   * the user select an image,
   * uploads it to supabase storage, updates
   * the corresponding profile field,
   * and refreshes the local image state
   * @param {Aspect} aspect - image crop ratio used by the image picker
   * @param {Function} upload - function responsible for uploading the selected image to storage
   * @param {"avatar_url" | "background_url"} column - profile column to update in the database
   * @param {React.Dispatch<React.SetStateAction<string | null>>} setImage - react state setter used to update the displayed image
   * @returns {Promise<void>}
   */
  const updateImage = async ({
    aspect,
    upload,
    column,
    setImage,
  }: {
    aspect: [number, number];
    upload: (userId: string, uri: string) => Promise<string>;
    column: "avatar_url" | "background_url";
    setImage: React.Dispatch<React.SetStateAction<string | null>>;
  }) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      console.log("Permission denied");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect,
      quality: 0.8,
    });

    if (result.canceled || !result.assets[0]) return;

    const imageUri = result.assets[0].uri;
    setImage(imageUri);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const publicUrl = await upload(user.id, imageUri);

      await supabase
        .from("profiles")
        .update({
          [column]: publicUrl,
        })
        .eq("id", user.id);

      setImage(publicUrl);

      console.log(`${column} uploaded`);
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * @description fetches the authenticated
   * user profile from the `profiles`
   * table and synchronizes the avatar
   * and background images
   * with the local react state
   * @returns {Promise<void>}
   */
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
        setBackgroundImage(data.background_url ?? null);
      }
    } catch (error) {
      console.error("Load profile error:", error);
    }
  };

  // function take user name from supabase
  const [username, setUsername] = useState("");
  const takeUserName = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      setUsername(user.user_metadata.username);
    }
  };

  // function for upload bio user
  const loadBio = async () => {
    try {
      const text = await getUserBio();
      setBio(text);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadProfile();
    takeUserName();
    loadBio();
  }, []);

  return (
    <View style={styles.container}>
      {/* background image */}
      <TouchableOpacity
        style={styles.background}
        onPress={() =>
          updateImage({
            aspect: [16, 9],
            upload: uploadProfileBackground,
            column: "background_url",
            setImage: setBackgroundImage,
          })
        }
      >
        {backgroundImage ? (
          <>
            <Image
              source={{ uri: backgroundImage }}
              style={styles.backgroundImage}
              resizeMode="cover"
            />

            <View style={styles.overlay} />
          </>
        ) : (
          <View style={styles.backgroundPlaceholder} />
        )}
      </TouchableOpacity>
      {/* profile image */}
      <View style={styles.form}>
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={() =>
            updateImage({
              aspect: [1, 1],
              upload: uploadProfileImage,
              column: "avatar_url",
              setImage: setProfileImage,
            })
          }
        >
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
            <PencilLine color={"white"} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        {/* user name */}
        <Text style={styles.userName}>{username}</Text>
        {/* user bio */}
        {editingBio ? (
          <TextInput
            style={styles.bioInput}
            multiline
            value={bio}
            onChangeText={setBio}
            placeholder="Write something about yourself..."
            onBlur={async () => {
              Keyboard.dismiss();
              await updateUserBio(bio);
              setEditingBio(false);
            }}
            autoFocus
          />
        ) : (
          <TouchableOpacity onPress={() => setEditingBio(true)}>
            <Text style={styles.bio}>{bio || "Tap to add bio"}</Text>
          </TouchableOpacity>
        )}
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
    backgroundColor: "#212020ff",
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 50,
  },
  profileImage: {
    width: 160,
    height: 160,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: "#ffffffff",
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
  userName: {
    textAlign: "center",
    fontWeight: 600,
    fontSize: 34,
  },
  bio: {
    marginTop: 12,
    textAlign: "center",
    color: "#666",
    paddingHorizontal: 30,
    fontSize: 16,
    fontStyle: "italic",
  },
  bioInput: {
    marginTop: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    marginHorizontal: 30,
    minHeight: 80,
    textAlignVertical: "top",
  },
});
