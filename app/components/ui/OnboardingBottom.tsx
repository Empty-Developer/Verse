import {
  FlatList,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React from "react";
import { AnimatedRef, SharedValue } from "react-native-reanimated";
import { OnboardingData } from "@/service/options/OnboardingService";
import { ChevronRight } from "lucide-react-native";

interface ButtonProps {
  sliderLength: number;
  flatListIndex: SharedValue<number>;
  flatListRef: AnimatedRef<FlatList<OnboardingData>>;
  x: SharedValue<number>;
};

export default function OnboardingBottom({sliderLength, flatListIndex, flatListRef, x}: ButtonProps) {
  const handlerPressNext = () => {
    /*
      press the button will go
      the next index, but if is already at
      the last index
      the arrow will change to text and if pressed
      it will go the next screen
    */
    if(flatListIndex.value < sliderLength - 1) {
      flatListRef.current?.scrollToIndex({index: flatListIndex.value + 1})
    } else {
      console.log('navigate to nest screen')
    }
  }
  return (
    <Pressable style={styles.container} onPress={handlerPressNext}>
      <ChevronRight size={30} color={"white"} style={styles.arrow}/>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  arrow: {
    position: "absolute",
    pointerEvents: 'none',
  },
  container: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    width: 60,
    height: 60,
  },
});
