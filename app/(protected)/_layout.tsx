import { useAuthStore } from "@/stores/useAuthStore";
import { Redirect, Stack } from "expo-router";

export default function ProtectedLayout() {
  // check if user signin in app
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  if (!isAuthenticated) {
    return <Redirect href={'/(auth)/sign-in'}/>
  }
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)"/>
    </Stack>
  )
}