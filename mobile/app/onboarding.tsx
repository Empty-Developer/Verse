import { FlatList, StyleSheet, Text, View, ViewToken } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import RenderItem from "@/app/components/RenderItem";
import slider, { OnboardingData } from "@/service/options/OnboardingService";
import Pagination from "@/app/components/pagination/Pagination";

export default function Onboarding() {
  const finishOnboarding = async () => {
    await AsyncStorage.setItem("onboarding", "true");

    router.replace("/");
  };

  const flatListRef = useAnimatedRef<FlatList<OnboardingData>>();
  /*
    create a sharedValue named x
    for the data scroll
  */
  const x = useSharedValue(0);

  const flatListIndex = useSharedValue(0);

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    if (viewableItems[0].index !== null) {
      flatListIndex.value = viewableItems[0].index;
    }
  };

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });

  return (
    <View style={styles.container}>
      <Animated.FlatList
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
        /*
          onViewableitemsChanged called
          when the viewability of rows changes
          as defined by the viewabilityConfig prop
        */
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          /*
            minimumViewTime is minimum amount
            of time (in milliseconds) that
            an item must be physically viewable
            before the viewability callback will
            be fired
          */
          minimumViewTime: 300,
          viewAreaCoveragePercentThreshold: 10,
        }}
      />
      <View style={styles.bottomContainer}>
        {/* pass data and x to pagination */}
        <Pagination slider={slider} x={x}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    marginHorizontal: 30,
    paddingVertical: 30,
  }
});
