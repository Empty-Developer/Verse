import { FlatList, StyleSheet, Text, View, ViewToken } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import RenderItem from "@/components/RenderItem";
import slider, { OnboardingData } from "@/service/options/OnboardingService";
import Pagination from "@/components/ui/Pagination";
import OnboardingBottom from "@/components/ui/OnboardingButton";

export default function Onboarding() {
  const finishOnboarding = async () => {
    await AsyncStorage.setItem("onboarding", "true");

    router.replace("/");
  };

  const flatListRef = useAnimatedRef<FlatList<OnboardingData>>();
  /**
   * @description create a sharesValue x
   * for the data scroll
   */
  const x = useSharedValue(0);

  const flatListIndex = useSharedValue(0);

  /**
   * @description this function take index screens
   * and output screen correct
   * @param {props} viewableItems - screens
   * @returns {number}
   */
  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    if (viewableItems[0].index !== null) {
      flatListIndex.value = viewableItems[0].index;
    }
  };

  /**
   * @description this function made move in
   * next screen
   */
  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });

  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={flatListRef}
        data={slider}
        renderItem={({ item, index }) => {
          return <RenderItem item={item} index={index} x={x} />;
        }}
        // keyExtractor={item => item.id}
        onScroll={onScroll}
        scrollEventThrottle={16}
        horizontal={true}
        bounces={false}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
       /**
        * @description onViewableitemsChanged called
          when the viewability of rows changes
          as defined by the viewabilityConfig prop
        */
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
         /**
          * @description that
            an item must be physically viewable
            before the viewability callback will
            be fired
            @param {minimumViewTime} - minimumViewTime is minimum amount
            of time (in milliseconds)
          */
          minimumViewTime: 300,
          viewAreaCoveragePercentThreshold: 10,
        }}
      />
      <View style={styles.bottomContainer}>
        {/* pass data and x to pagination */}
        <Pagination slider={slider} x={x} />
        <OnboardingBottom
          flatListRef={flatListRef}
          flatListIndex={flatListIndex}
          sliderLength={slider.length}
          // x={x}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    marginHorizontal: 30,
    paddingVertical: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
