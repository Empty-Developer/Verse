/**
 * @description this hook will be is going
 * have everything from keeping track of 
 * the posts that is should display to
 * uploading and delete a post 
 */

import { uploadPostImage } from "@/lib/storage"
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/stores/useAuthStore"

export const usePost = () => {
  const user = useAuthStore((state) => state.user);

  const createPost = async (imageUri: string, title: string)  => {
    if (!user) {
      console.log('user not auth')
      return;
    }

    try {
      const postImageUrl = await uploadPostImage(user.id, imageUri)

      /**
       * @description this function calculates 
       * the time required for the post to remain 
       * up for 24 hours
       * @returns {number[]}
       */
      const now = new Date()
      const expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000)

      // check error
      const {error} = await supabase
      .from('posts')
      .insert({
        user_id: user.id,
        cover: postImageUrl,
        title: title || null,
        expires_at: expiresAt.toISOString(),
        is_active: true
      })
      .select()
      .single()

      if (error) {
        console.log("error create post: ", error)
        throw error
      }
    } catch (error) {
      console.log("error in createPost: ", error)
      throw error
    }
  }

  return {
    createPost
  }
}