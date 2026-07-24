import { StyleSheet, useWindowDimensions, View } from "react-native";
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from "react";
import Animated, {
  runOnJS,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import BackDrop from "./BackDrop";
import { ScrollViewProps } from "react-native";

type Props = React.PropsWithChildren<
  ScrollViewProps & {
    snapTo: string;
    backgroundColor: string;
    backDropColor: string;
  }
>;

export interface BottomSheetMethod {
  expand: () => void;
  close: () => void;
}

const BottomSheet = forwardRef<BottomSheetMethod, Props>(
  (
    { snapTo, backgroundColor, backDropColor, children, ...props }: Props,
    ref,
  ) => {
    const inset = useSafeAreaInsets();
    const { height } = useWindowDimensions();
    const percentage = parseFloat(snapTo.replace("%", "")) / 100;
    const closeHeight = height;
    const openHeight = height - height * percentage;
    const topAnimation = useSharedValue(closeHeight);
    const context = useSharedValue(0);
    const scrollBegin = useSharedValue(0);
    const scrollY = useSharedValue(0);
    const [enableScroll, setEnableScroll] = useState(true);

    /**
     * @description this function made open
     * window with animation by size 'openHeight'
     */
    const expand = useCallback(() => {
      "worklet";
      topAnimation.value = withTiming(openHeight);
    }, [topAnimation, openHeight]);

    const close = useCallback(() => {
      "worklet";
      topAnimation.value = withTiming(closeHeight);
    }, [topAnimation, closeHeight]);

    /**
     * @description
     */
    useImperativeHandle(
      ref,
      () => ({
        expand,
        close,
      }),
      [expand, close],
    );

    /**
     * @description this function made
     * so that window(bottomSheet) with
     * animation made jump up
     */
    const animationStyle = useAnimatedStyle(() => {
      const top = topAnimation.value;
      return {
        top,
      };
    });

    const pan = Gesture.Pan()
      .onBegin(() => {
        context.value = topAnimation.value;
      })
      .onUpdate((event) => {
        if (event.translationY < 0) {
          topAnimation.value = withSpring(openHeight, {
            damping: 100,
            stiffness: 400,
          });
        } else {
          topAnimation.value = withSpring(context.value + event.translationY, {
            damping: 100,
            stiffness: 400,
          });
        }
      })
      .onEnd(() => {
        if (topAnimation.value > openHeight + 50) {
          topAnimation.value = withSpring(closeHeight, {
            damping: 100,
            stiffness: 400,
          });
        } else {
          topAnimation.value = withSpring(openHeight, {
            damping: 100,
            stiffness: 400,
          });
        }
      });

    const onScroll = useAnimatedScrollHandler({
      onBeginDrag: (event) => {
        scrollBegin.value = event.contentOffset.y;
      },
      onScroll: (event) => {
        scrollY.value = event.contentOffset.y;
      },
    });

    const panScroll = Gesture.Pan()
      .onBegin(() => {
        context.value = topAnimation.value;
      })
      .onUpdate((event) => {
        if (event.translationY < 0) {
          topAnimation.value = withSpring(openHeight, {
            damping: 100,
            stiffness: 400,
          });
        } else if (event.translationY > 0 && scrollY.value === 0) {
          runOnJS(setEnableScroll)(false);
          topAnimation.value = withSpring(
            Math.max(
              context.value + event.translationY - scrollBegin.value,
              openHeight,
            ),
            {
              damping: 100,
              stiffness: 400,
            },
          );
        }
      })
      .onEnd(() => {
        runOnJS(setEnableScroll)(true);
        if (topAnimation.value > openHeight + 50) {
          topAnimation.value = withSpring(closeHeight, {
            damping: 100,
            stiffness: 400,
          });
        } else {
          topAnimation.value = withSpring(openHeight, {
            damping: 100,
            stiffness: 400,
          });
        }
      });

    const scrollViewGesture = Gesture.Native();

    return (
      <>
        <BackDrop
          topAnimation={topAnimation}
          backDropColor={backDropColor}
          closeHeight={closeHeight}
          openHeight={openHeight}
          close={close}
        />
        <GestureDetector gesture={pan}>
          <Animated.View style={{ flex: 1 }}
            style={[
              styles.container,
              animationStyle,
              {
                backgroundColor: backgroundColor,
                paddingBottom: inset.bottom,
              },
            ]}
          >
            <View style={styles.lineContainer}>
              <View style={styles.line} />
            </View>
            <GestureDetector
              gesture={Gesture.Simultaneous(scrollViewGesture, panScroll)}
            >
              <View
                {...props}
                style={{ flex: 1 }}
              >
                {children}
              </View>
            </GestureDetector>
          </Animated.View>
        </GestureDetector>
      </>
    );
  },
);
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  lineContainer: {
    marginVertical: 15,
    alignItems: "center",
  },
  line: {
    width: 50,
    height: 4,
    backgroundColor: "black",
    borderRadius: 20,
  },
});

export default BottomSheet;
