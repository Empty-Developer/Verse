import { FlatList, Pressable, StyleSheet } from "react-native";
import React, { useCallback } from "react";
import Animated, {
  AnimatedRef,
  SharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { OnboardingData } from "@/service/options/OnboardingService";
import { ChevronRight } from "lucide-react-native";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ButtonProps {
  sliderLength: number;
  flatListIndex: SharedValue<number>;
  flatListRef: AnimatedRef<FlatList<OnboardingData>>;
  // x: SharedValue<number>;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function OnboardingBottom({
  sliderLength,
  flatListIndex,
  flatListRef,
  // x,
}: ButtonProps) {
  const AnimatedChevron = Animated.createAnimatedComponent(ChevronRight);
  /**
   * @description this function create for animation
   * button — if screen made step on last screen
   * made: animation icon go right and visible text
   */
  const rnBtnStyle = useAnimatedStyle(() => {
    return {
      width:
        flatListIndex.value === sliderLength - 1
          ? withSpring(140)
          : withSpring(60),
      height: 60,
    };
  }, [flatListIndex, sliderLength]);

  const rnTextStyle = useAnimatedStyle(() => {
    return {
      opacity:
        flatListIndex.value === sliderLength - 1
          ? withTiming(1)
          : withTiming(0),
      transform: [
        {
          translateX:
            flatListIndex.value === sliderLength - 1
              ? withTiming(0)
              : withTiming(100),
        },
      ],
    };
  }, [flatListIndex, sliderLength]);

  const iconAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity:
        flatListIndex.value === sliderLength - 1
          ? withTiming(0)
          : withTiming(1),
      transform: [
        {
          translateX:
            flatListIndex.value === sliderLength - 1
              ? withTiming(100)
              : withTiming(0),
        },
      ],
    };
  }, [flatListIndex, sliderLength]);

  // const handlerPressNext = () => {
  //   if (flatListIndex.value < sliderLength - 1) {
  //     flatListRef.current?.scrollToIndex({ index: flatListIndex.value + 1 });
  //   } else {
  //     console.log("navigate to nest screen");
  //   }
  // };
  const onPress = useCallback(async () => {
    /**
     * @description this function go the next index
     * but if is already at the last index
     * the arrow will change to text and if
     * pressed it will go the next screen
     * @returns {number}
     */
    if (flatListIndex.value === sliderLength - 1) {
      await AsyncStorage.setItem("onboarding", "true");

      router.replace("/sign-in");
      return;
    } else {
      flatListRef?.current?.scrollToIndex({
        index: flatListIndex.value + 1,
      });
    }
  }, [sliderLength]);

  return (
    <AnimatedPressable style={[styles.container, rnBtnStyle]} onPress={onPress}>
      <Animated.Text style={[styles.textStyle, rnTextStyle]}>Get Started</Animated.Text>
      <Animated.View style={[styles.iconStyle, iconAnimatedStyle]}>
        <ChevronRight size={40} color="white" />
      </Animated.View>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 100,
    backgroundColor: '#00000034',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  textStyle: {
    color: 'white',
    position: 'absolute',
    fontWeight: '600',
    fontSize: 20,
    fontFamily: "SF Compact Rounded"
  },
  iconStyle: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    pointerEvents: "none",
  },
});
