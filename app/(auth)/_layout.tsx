import { useAuthStore } from "@/stores/useAuthStore";
import { Redirect, Stack } from "expo-router";

export default function AuthLayout() {

    const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
    if (isAuthenticated) {
      return <Redirect href={'/(protected)/(tabs)'}/>
    }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="sign-in"/>
      <Stack.Screen name="registration"/>
    </Stack>
  )
}