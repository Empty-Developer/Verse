import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen name="sign-in"/>
      <Stack.Screen name="registration"/>
    </Stack>
  )
}