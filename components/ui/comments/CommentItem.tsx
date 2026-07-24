import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useCommentStore } from "@/stores/useCommentStore";
import Button from "../Button";
import { Comment } from "@/types/comment";

type Props = {
  comment: Comment;
};

export default function CommentItem({ comment }: Props) {
  return (
    <View>
      <View>
        {comment.profile.avatar_url ? (
          <Image
            source={{ uri: comment.profile.avatar_url }}
          />
        ) : (
          <Image
            source={require("@/assets/images/user.png")}
          />
        )}
        <Text>{comment.profile.username}</Text>
      </View>

      <Text>{comment.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
