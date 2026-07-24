import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Comment } from "@/types/comment";

type Props = {
  comment: Comment;
};

export default function CommentItem({ comment }: Props) {
  return (
    <View style={styles.container}>
      {comment.profile.avatar_url ? (
        <Image source={{ uri: comment.profile.avatar_url }}
          style={styles.avatar}
        />
      ) : (
        <Image source={require("@/assets/images/user.png")}
          style={styles.avatar}
        />
      )}

      <View style={styles.content}>
        <Text style={styles.username}>{comment.profile.username}</Text>
        <Text style={styles.text}>{comment.text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: "flex-start",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  username: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
    marginBottom: 3,
  },

  text: {
    fontSize: 16,
    color: "#444343ff",
    lineHeight: 22,
  },
});
