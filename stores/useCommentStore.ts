import { createComment, fetchComments } from "@/lib/comments";
import { Comment } from "@/types/comment";
import { create } from "zustand";
import { useAuthStore } from "./useAuthStore";

type CommentStore = {
  comments: Comment[];
  loading: boolean;
  selectedPostId: number | null;
  loadComments: (post_id: number) => Promise<void>;
  addComment: (text: string) => Promise<void>;
  openComments: (post_id: number) => Promise<void>;
  closeComments: () => void;
};

export const useCommentStore = create<CommentStore>((set, get) => ({
  comments: [],
  loading: false,
  selectedPostId: null,
  /**
   * @description this function work it
   * user open post, store understand where post open
   * and store loading comments
   * @param post_id
   */
  openComments: async (post_id) => {
    set({
      selectedPostId: post_id,
    });
    await get().loadComments(post_id);
  },

  loadComments: async (post_id) => {
    set({ loading: true });

    const comments = await fetchComments(post_id);

    set({
      comments: comments ?? [],
      loading: false,
    });
  },

  addComment: async (text) => {
    const post_id = get().selectedPostId
    const user = useAuthStore.getState().user

    if (!user || !post_id) {
      console.log('error post or user not found')
      return
    }

    const comment = await createComment(
      post_id,
      user.id,
      text
    )

    set(state => ({
      comments: [
        ...state.comments,
        comment
      ]
    }))
  },

  closeComments: () => {
    set({
      selectedPostId:null,
      comments:[]
    })
  },
}));
