import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="(auth)/sign-in" />
        <Stack.Screen name="(auth)/registration" />
        <Stack.Screen name="(protected)/(tabs)" />
      </Stack>
    </GestureHandlerRootView>
  );
}