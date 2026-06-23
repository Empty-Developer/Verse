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

  if (completed === null) return null;

  return (
    <Redirect
      href={completed ? "/sign-in" : "/onboarding"}
    />
  );
}