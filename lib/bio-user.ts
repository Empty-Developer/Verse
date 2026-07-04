import { supabase } from "./supabase";

export async function getUserBio() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return "";

  const { data, error } = await supabase
    .from("profiles")
    .select("bio")
    .eq("id", user.id)
    .single();

  if (error) throw error;

  return data?.bio ?? "";
}

export async function updateUserBio(bio: string) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const { error } = await supabase
    .from("profiles")
    .update({ bio })
    .eq("id", user.id);

  if (error) throw error;
}