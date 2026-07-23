import { StyleSheet, TouchableWithoutFeedback } from "react-native";
import React from "react";
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

type Props = {
  topAnimation: SharedValue<number>;
  openHeight: number;
  closeHeight: number;
  bacDropColor: string;
  close: () => void;
};
/**
 * @description this component close and open
 * animation bottom sheet
 * @param  {topAnimation: SharedValue<number>} - animation close window
 * @param  {openHeight: number}
 * @param  {closeHeight: number}
 * @param  {bacDropColor: string} 
 * @param  {close: void} - this trigger if user wont close window
 * 
 * @returns {opacity}
 * @returns {display}
 */
const BackDrop = ({
  topAnimation,
  openHeight,
  closeHeight,
  bacDropColor,
  close,
}: Props) => {
  const backDropAnimation = useAnimatedStyle(() => {
    const opacity = interpolate(
      topAnimation.value,
      [closeHeight, openHeight],
      [0, 0.5],
    );
    const display = opacity === 0 ? "none" : "flex";
    return {
      opacity,
      display,
    };
  });
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        close();
      }}
    >
      <Animated.View
        style={[
          styles.backDrop,
          backDropAnimation,
          { backgroundColor: bacDropColor },
        ]}
      />
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  backDrop: {
    ...StyleSheet.absoluteFillObject,
    display: "none",
  },
});

export default BackDrop;
