import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function EmptyComments() {
  return (
    <View style={styles.container}>
      <Text>No comments yet</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
