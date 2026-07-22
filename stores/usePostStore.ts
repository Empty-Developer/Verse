import { create } from "zustand";
import { Post } from "@/types/post";
import { createPostLike, removePostLike } from "@/lib/posts";

type PostStore = {
  posts: Post[];
  loading: boolean;
  setPosts: (posts: Post[]) => void;
  addPost: (posts: Post) => void;
  removePosts: (id: number) => void;
  clearPosts: () => void;
  toggleLike: (post_id: number, user_id: string) => Promise<void>;
};

/**
 * @description this feature will automatically
 * display the post multiple times on the
 * home screen after it is published
 */
export const usePostStore = create<PostStore>((set, get) => ({
  posts: [],
  loading: false,
  setPosts: (posts) => set({ posts }),

  addPost: (post) =>
    set((state) => ({
      posts: [post, ...state.posts],
    })),

  removePosts: (id) =>
    set((state) => ({
      posts: state.posts.filter((p) => p.id !== id),
    })),

  clearPosts: () => set({ posts: [] }),

  /**
   * @description function take id post and id user
   * take state zustand, search post with need id
   * if search true - input data post with like
   * check if user pressed like or not if like have
   * update ui with zustand
   */
  toggleLike: async (post_id, user_id) => {
    const state = get();
    const post = state.posts.find((p) => p.id === post_id);

    if (!post) return;

    const liked = post.postsLikes.some((like) => like.user_id === user_id);

    if (liked) {
      await removePostLike(post_id, user_id);

      set((state) => ({
        posts: state.posts.map((post) => {
          if (post.id !== post_id) return post;

          return {
            ...post,

            postsLikes: post.postsLikes.filter(
              (like) => like.user_id !== user_id,
            ),
          };
        }),
      }));
    } else {
      await createPostLike({
        post_id,
        user_id,
      });

      set((state) => ({
        posts: state.posts.map((post) => {
          if (post.id !== post_id) return post;

          return {
            ...post,

            postsLikes: [
              ...post.postsLikes,

              {
                id: Date.now(),

                post_id,

                user_id,
              },
            ],
          };
        }),
      }));
    }
  },
}));
