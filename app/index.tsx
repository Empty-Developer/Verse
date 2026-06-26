import { useAuthStore } from "@/stores/useAuthStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";

export default function Index() {
  const [completed, setCompleted] = useState<boolean | null>(null);

  useEffect(() => {
    AsyncStorage.getItem("onboarding").then((value) => {
      setCompleted(value === "true");
    });
  }, []);

  const isAuthenticated = useAuthStore(state => state.isAuthenticated)
  if (completed === null) return null;
  if (!completed) {
    return <Redirect href="/onboarding" />
  }
  if (isAuthenticated) {
    return <Redirect href="/(protected)/(tabs)" />
  }

  return (
    <Redirect href="/(auth)/sign-in" />
  );
}