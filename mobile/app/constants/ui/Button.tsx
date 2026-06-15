import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

interface ButtonProps {
  title: string;
  onPress: () => void;
  style?: {};
}

const Button = ({title, ...otherProps}: ButtonProps) => {

  return (
    <Pressable style={styles.button} {...otherProps}>
      <Text style={styles.text} {...otherProps}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 8,
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: "white",
  },
  text: {
    color: "black",
  },
});

export default Button;
