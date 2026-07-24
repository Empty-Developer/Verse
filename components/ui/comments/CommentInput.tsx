import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import Button from "../Button";
import Input from "../Input";
import { useCommentStore } from "@/stores/useCommentStore";

export default function CommentInput() {
  const [text, setText] = useState("");
  const addComment = useCommentStore((state) => state.addComment);
  const selectedPostId = useCommentStore((state) => state.selectedPostId);

  const handleSend = async () => {
    if (!text.trim()) return;
    if (!selectedPostId) return;

    await addComment(text);
    setText("");
  };
  return (
    <View style={styles.container}>
      <Input
        placeholder="Write a comment..."
        value={text}
        onChangeText={setText}
        style={{
          borderRadius: 20,
          marginHorizontal: 0
        }}
      />
      <Button title="Send" onPress={handleSend} style={{
        marginBottom: 50,
        borderRadius: 20
      }}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#fff",
  },
});
