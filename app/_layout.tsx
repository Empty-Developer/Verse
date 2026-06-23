import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="(auth)/sign-in" />
      <Stack.Screen name="(auth)/registration" />
      <Stack.Screen name="(protected)/(tabs)" />
    </Stack>
  );
}