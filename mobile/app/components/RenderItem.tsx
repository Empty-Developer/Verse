import { OnboardingData } from "@/service/options/OnboardingService";
import LottieView from "lottie-react-native";
import React from "react";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedStyle } from "react-native-reanimated";

type Props = {
  item: OnboardingData;
  index: number;
  x: SharedValue<number>
};

export default function RenderItem({ item, index, x }: Props) {
  const { width: SCREEN_WIDTH } = useWindowDimensions();

  // animate the lottie components
  const lottieAnimationStyle = useAnimatedStyle(() => {
    const translateYAnimation = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [200,0,-200],
      Extrapolation.CLAMP,
    )
    return {
      transform: [{translateY: translateYAnimation}]
    }
  })

  // animate the scale of the circle
  const circleAnimation = useAnimatedStyle(() => {
    /*
      (index - 1) * SCREEN_WIDTH:
      this is the reference point to the left
      of the current element`s position
      it is used to associate lower x.value
      with smaller scales
    */
    const scale = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [1,4,4],
      Extrapolation.CLAMP,
    )
    return {
      transform: [{scale: scale}],
    }
  })
  return (
    <View style={[styles.itemContainer, {width: SCREEN_WIDTH}]}>
      <View style={styles.circleContainer}>
        <Animated.View
          style={[{
            width: SCREEN_WIDTH,
            height: SCREEN_WIDTH,
            backgroundColor: item.backgroundColor,
            borderRadius: SCREEN_WIDTH / 2
          }, circleAnimation]}
        />
      </View>
      <Animated.View style={lottieAnimationStyle}>
        <LottieView
          source={item.animation}
          style={{ width: SCREEN_WIDTH * 0.9, height: SCREEN_WIDTH * 0.9 }}
          autoPlay
          loop
        />
      </Animated.View>
      <Text style={[styles.itemText, {color: item.textColor}]}>
        {item.text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 120,
  },
  itemText: {
    textAlign: 'left',
    fontSize: 44,
    fontWeight: 'bold',
    marginBottom: 10,
    marginHorizontal: 20,
  },
  circleContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'flex-end',
  }
})
