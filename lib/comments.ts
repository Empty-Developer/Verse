import { supabase } from "@/lib/supabase";

export const fetchComments = async (post_id: number) => {
  const { data, error } = await supabase
    .from("comments")
    .select(
      `
      *,
      profile:profiles(
      username,
      avatar_url
      )
    `,
    )
    .eq("post_id", post_id)
    .order("created_at", {
      ascending: true,
    });

  if (error) {
    console.log("error comment: ", error);
  }

  return data;
};

export const createComment = async (
  post_id: number,
  user_id: string,
  text: string,
) => {
  const { data, error } = await supabase.from("comments")
    .insert({
      user_id,
      post_id,
      text: text,
    })
    .select(`
        *,
        profile:profiles(
          username,
          avatar_url
          )
        `)
    .single()

  if (error) {
    console.log("error create comment: ", error);
  }

  return data;
};
