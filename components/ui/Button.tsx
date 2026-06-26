import { Pressable, PressableProps, StyleSheet, Text, TextStyle, ViewStyle } from "react-native";
import React from "react";

interface ButtonProps extends PressableProps {
  title: string;
  textStyle?: TextStyle;
  style?: ViewStyle | ViewStyle[]; // take style in screen for
}


const Button = ({title, style, textStyle, disabled, ...props}: ButtonProps) => {
  return (
    <Pressable
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
      {...props}
    >
      <Text style={[styles.text, textStyle]}>
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#000000ff",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontWeight: "600",
  },
  pressed: {
    opacity: 0.8,
  },
  disabled: {
    opacity: 0.4,
  },
});

export default Button;
