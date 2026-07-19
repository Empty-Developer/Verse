import { create } from "zustand";
import { Post } from "@/types/post";

type PostStore = {
  posts: Post[];
  loading: boolean;
  setPosts: (posts: Post[]) => void;
  addPost: (posts: Post) => void;
  removePosts: (id: number) => void;
  clearPosts: () => void;
}

/**
 * @description this feature will automatically
 * display the post multiple times on the 
 * home screen after it is published
 */
export const usePostStore = create<PostStore>((set) => ({
  posts: [],
  loading: false,
  setPosts: (posts) => set({posts}),

  addPost: (post) => 
    set((state) => ({
      posts: [post, ...state.posts],
    })),
  
  removePosts: (id) =>
    set((state) => ({
      posts: state.posts.filter((p) => p.id !== id),
    })),

  clearPosts: () => set({ posts: [] }),
}))