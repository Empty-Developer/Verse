import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={false}>
        <Stack.Screen name="create-account" />
        <Stack.Screen name="sign-in" />
      </Stack.Protected>
      <Stack.Protected guard={true}>
        <Stack.Screen name="onboarding" />
      </Stack.Protected>
      <Stack.Protected guard={false}>
        <Stack.Screen name="(tabs)" />
      </Stack.Protected>
    </Stack>
  );
}