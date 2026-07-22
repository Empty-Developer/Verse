import { supabase } from "@/lib/supabase";
import { Post } from "@/types/post";

export async function getPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from("posts")
    .select(`
      *,
      postsLikes(*)
    `);

  if (error) throw error;

  return data as Post[];
}
/**
 * @description this function bring id post, id user
 * and start added new data in table postLike where
 * user see like in post
 * @param {post_id: number}
 * @param {user_id: string}
 * @returns {data like}
 */
export const createPostLike = async ({
  post_id,
  user_id
}: {
  post_id: number;
  user_id: string;
}) => {
  try {
    const { error } = await supabase
      .from("postsLikes")
      .insert({
        post_id,
        user_id
      })
      .select()
      .single();

    if (error) {
      console.log("error: ", error);
      return;
    }
  } catch (error) {
    console.log("createPostLike Error: ", error);
    return;
  }
};

export const removePostLike = async (post_id: number, user_id: string) => {
  try {
    const { error } = await supabase
      .from("postsLikes")
      .delete()
      .eq("post_id", post_id)
      .eq("user_id", user_id)

    if (error) {
      console.log("remove error: ", error);
      return;
    }
  } catch (error) {
    console.log("removePostLike Error: ", error);
    return;
  }
};
