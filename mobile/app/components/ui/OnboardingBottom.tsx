import {
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React from "react";
import { AnimatedRef, SharedValue } from "react-native-reanimated";
import { OnboardingData } from "@/service/options/OnboardingService";
import { ChevronRight } from "lucide-react-native";

type Props = {
  sliderLength: number;
  flatlistIndex: SharedValue<number>;
  flatlistRef: AnimatedRef<FlatList<OnboardingData>>;
  x: SharedValue<number>;
};

export default function OnboardingBottom() {
  return (
    <TouchableWithoutFeedback>
      <View style={styles.container}>
        <ChevronRight
          size={36}
          color={'white'}
          style={styles.arrow}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  arrow: {
    position: 'absolute'
  },
  container: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    width: 60,
    height: 60,
  }
});
