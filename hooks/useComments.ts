import { useCommentStore } from "@/stores/useCommentStore"

export const useComments = () => {
  const {
    comments,
    loading,
    addComment,
    openComments,
    closeComments
  } = useCommentStore()

  return {
    comments,
    loading,
    addComment,
    openComments,
    closeComments
  }
}