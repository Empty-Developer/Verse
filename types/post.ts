export interface Post {
  id: number;
  title: string;
  file: string;
  user_id: string;
  cover: string;

  postsLikes: PostLike[];
}

interface PostLike {
  id: number;
  post_id: number;
  user_id: string;
}