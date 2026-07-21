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
 * @param {postId: number}
 * @param {userId: string}
 * @returns {data like}
 */
export const createPostLike = async ({
  postId,
  userId
}: {
  postId: number;
  userId: string;
}) => {
  try {
    const { error } = await supabase
      .from("postsLikes")
      .insert({
        postId,
        userId
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

export const removePostLike = async (postId: number, userId: string) => {
  try {
    const { error } = await supabase
      .from("postsLikes")
      .delete()
      .eq("postId", postId)
      .eq("userId", userId)

    if (error) {
      console.log("remove error: ", error);
      return;
    }
  } catch (error) {
    console.log("removePostLike Error: ", error);
    return;
  }
};
